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
 * Mutates already-obtained refs rather than calling useState() again after
 * the `await` — Nuxt's instance context (needed by useState) doesn't survive
 * an await inside a plain async function, only ones the SFC compiler
 * instruments directly in a component's own <script setup>.
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
 * Triggers (and awaits) the build-time GitHub data fetch exactly once —
 * call this only from app.vue, which every other component renders under.
 * Deliberately not `useAsyncData`: calling that with the same key from
 * several components each risks independently re-triggering its own
 * fetch/error state instead of sharing one result.
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
