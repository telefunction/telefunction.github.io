import type { GithubData, GithubOrg, GithubRepo } from '#shared/types/github'

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const PINNED_LIMIT = 6
const REPO_LIMIT = 100

/**
 * GraphQL is the only API surface exposing an org's real pinned repos
 * (`pinnedItems`, via `ProfileOwner`) — REST has no equivalent. The
 * `repositories` connection covers the full public repo list (star total +
 * "nothing pinned" fallback) in the same request.
 */
const QUERY = /* GraphQL */ `
  query OrgProfile($login: String!, $pinnedLimit: Int!, $repoLimit: Int!) {
    organization(login: $login) {
      login
      name
      description
      avatarUrl
      url
      websiteUrl
      location
      createdAt
      pinnedItems(first: $pinnedLimit, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            ...RepoFields
          }
        }
      }
      repositories(
        first: $repoLimit
        privacy: PUBLIC
        isFork: false
        isArchived: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          ...RepoFields
        }
      }
    }
  }

  fragment RepoFields on Repository {
    name
    description
    url
    homepageUrl
    primaryLanguage {
      name
    }
    stargazerCount
    forkCount
    pushedAt
    updatedAt
    repositoryTopics(first: 6) {
      nodes {
        topic {
          name
        }
      }
    }
  }
`

interface GraphqlRepo {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  primaryLanguage: { name: string } | null
  stargazerCount: number
  forkCount: number
  pushedAt: string
  updatedAt: string
  repositoryTopics: { nodes: { topic: { name: string } }[] }
}

interface GraphqlOrganization {
  login: string
  name: string | null
  description: string | null
  avatarUrl: string
  url: string
  websiteUrl: string | null
  location: string | null
  createdAt: string
  pinnedItems: { nodes: GraphqlRepo[] }
  repositories: { totalCount: number; nodes: GraphqlRepo[] }
}

interface GraphqlResponse {
  data?: { organization: GraphqlOrganization | null }
  errors?: { message: string }[]
}

function normalizeRepo(repo: GraphqlRepo): GithubRepo {
  return {
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.url,
    homepageUrl: repo.homepageUrl,
    language: repo.primaryLanguage?.name ?? null,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    updatedAt: repo.updatedAt,
    pushedAt: repo.pushedAt,
    topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
  }
}

function errorStatus(error: unknown): number | undefined {
  return (
    (error as { statusCode?: number; response?: { status?: number } })?.statusCode ??
    (error as { response?: { status?: number } })?.response?.status
  )
}

export default defineEventHandler(async (): Promise<GithubData> => {
  const config = useRuntimeConfig()
  const login = config.public.orgUsername
  const token = config.githubToken

  if (!login || !token) {
    throw createError({ statusCode: 500, statusMessage: 'missing-config' })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  let graphqlResult: GraphqlResponse

  try {
    graphqlResult = await $fetch<GraphqlResponse>(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: {
        query: QUERY,
        variables: { login, pinnedLimit: PINNED_LIMIT, repoLimit: REPO_LIMIT },
      },
    })
  } catch (error) {
    const status = errorStatus(error)
    throw createError({
      statusCode: status ?? 502,
      statusMessage: status === 403 || status === 429 ? 'rate-limited' : 'upstream-error',
    })
  }

  const organization = graphqlResult.data?.organization
  if (graphqlResult.errors?.length || !organization) {
    throw createError({ statusCode: 502, statusMessage: 'upstream-error' })
  }

  const allRepos = organization.repositories.nodes.map(normalizeRepo)
  const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazerCount, 0)

  const pinnedRepos: GithubRepo[] =
    organization.pinnedItems.nodes.length > 0
      ? organization.pinnedItems.nodes.map(normalizeRepo)
      : [...allRepos].sort((a, b) => b.stargazerCount - a.stargazerCount).slice(0, PINNED_LIMIT)

  const org: GithubOrg = {
    login: organization.login,
    name: organization.name,
    description: organization.description,
    avatarUrl: organization.avatarUrl,
    htmlUrl: organization.url,
    websiteUrl: organization.websiteUrl,
    location: organization.location,
    createdAt: organization.createdAt,
    publicRepos: organization.repositories.totalCount,
  }

  return {
    org,
    pinnedRepos,
    repos: allRepos,
    totalStars,
    generatedAt: new Date().toISOString(),
  }
})
