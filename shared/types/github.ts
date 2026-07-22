/** Produced by `server/api/github.get.ts`, consumed by both server and app code — hence `shared/`. */
export interface GithubOrg {
  login: string
  name: string | null
  description: string | null
  avatarUrl: string
  htmlUrl: string
  websiteUrl: string | null
  location: string | null
  createdAt: string
  publicRepos: number
}

export interface GithubRepo {
  name: string
  description: string | null
  htmlUrl: string
  homepageUrl: string | null
  language: string | null
  stargazerCount: number
  forkCount: number
  updatedAt: string
  pushedAt: string
  topics: string[]
}

export interface GithubData {
  org: GithubOrg
  pinnedRepos: GithubRepo[]
  totalStars: number
  generatedAt: string
}
