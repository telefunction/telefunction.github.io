const CHECK_INTERVAL_MS = 60_000

/**
 * Live health check — deliberately separate from `useGithubData`'s
 * build-time payload. Polls GitHub's public, unauthenticated org endpoint
 * client-side every 60s; a 200 means the API (and by extension the org
 * page) is reachable right now.
 */
export function useGithubStatus(login: string) {
  const isOnline = ref<boolean | null>(null)

  async function check() {
    try {
      const response = await fetch(`https://api.github.com/orgs/${login}`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      isOnline.value = response.ok
    } catch {
      isOnline.value = false
    }
  }

  onMounted(() => {
    check()
    const interval = setInterval(check, CHECK_INTERVAL_MS)
    onUnmounted(() => clearInterval(interval))
  })

  return { isOnline }
}
