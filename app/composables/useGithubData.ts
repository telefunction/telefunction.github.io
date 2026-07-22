import type { GithubData } from '#shared/types/github'

interface GithubDataError {
  statusMessage: string
}

const DATA_KEY = 'github-data'
const ERROR_KEY = 'github-data-error'
const PENDING_KEY = 'github-data-pending'

function dataState() {
  return useState<GithubData | null>(DATA_KEY, () => null)
}

function errorState() {
  return useState<GithubDataError | null>(ERROR_KEY, () => null)
}

function pendingState() {
  return useState(PENDING_KEY, () => false)
}

/**
 * Takes already-obtained refs instead of calling useState() again after an
 * `await` — Nuxt's instance context doesn't survive that outside a
 * component's own <script setup>.
 */
async function fetchGithubData(
  data: ReturnType<typeof dataState>,
  error: ReturnType<typeof errorState>,
  pending: ReturnType<typeof pendingState>,
) {
  pending.value = true
  try {
    data.value = await $fetch<GithubData>('/api/github')
    error.value = null
  } catch (err) {
    error.value = {
      statusMessage: (err as { statusMessage?: string })?.statusMessage ?? 'upstream-error',
    }
  } finally {
    pending.value = false
  }
}

/**
 * Triggers (and awaits) the GitHub data fetch exactly once — call only from
 * app.vue. Not `useAsyncData`: calling that from several components each
 * risks re-triggering its own fetch instead of sharing one result.
 */
export async function useGithubData() {
  const data = dataState()
  const error = errorState()
  const pending = pendingState()
  if (data.value === null && error.value === null) {
    await fetchGithubData(data, error, pending)
  }
  const errorMessage = computed(() => error.value?.statusMessage ?? null)
  return { data, pending, errorMessage, refresh: () => fetchGithubData(data, error, pending) }
}

/** Reads the already-fetched shared state — safe to call from anywhere. */
export function useGithubDataState() {
  const data = dataState()
  const error = errorState()
  const pending = pendingState()
  const errorMessage = computed(() => error.value?.statusMessage ?? null)
  return { data, pending, errorMessage, refresh: () => fetchGithubData(data, error, pending) }
}
