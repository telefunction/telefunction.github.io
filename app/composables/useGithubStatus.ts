const CHECK_INTERVAL_MS = 60_000

/**
 * Live health check — deliberately separate from `useGithubData`'s
 * build-time payload. Polls GitHub's public, unauthenticated org endpoint
 * client-side every 60s; a 200 means the API (and by extension the org
 * page) is reachable right now. The same response also carries `followers`
 * — GraphQL's `Organization` type has no such field (verified against
 * GitHub's live schema; only `User` exposes it), so rather than a second,
 * authenticated REST call at build time, this already-live poll owns it —
 * a genuinely current count, refreshed every 60s instead of frozen at build.
 */
export function useGithubStatus(login: string) {
  const isOnline = ref<boolean | null>(null)
  const followers = ref<number | null>(null)

  async function check() {
    try {
      const response = await fetch(`https://api.github.com/orgs/${login}`, {
        headers: { Accept: 'application/vnd.github+json' },
      })
      isOnline.value = response.ok
      if (response.ok) {
        const data: { followers: number } = await response.json()
        followers.value = data.followers
      }
    } catch {
      isOnline.value = false
    }
  }

  onMounted(() => {
    check()
    const interval = setInterval(check, CHECK_INTERVAL_MS)
    onUnmounted(() => clearInterval(interval))
  })

  return { isOnline, followers }
}
