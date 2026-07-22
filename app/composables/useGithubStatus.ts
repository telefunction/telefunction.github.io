const CHECK_INTERVAL_MS = 60_000

/**
 * Live health check, separate from useGithubData's build-time payload —
 * polls GitHub's public org endpoint every 60s; a 200 means it's reachable.
 * Also reads `followers` from the same response: GraphQL's Organization
 * type has no such field (only User does), so this poll owns it instead of
 * a second, build-time-only REST call.
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
