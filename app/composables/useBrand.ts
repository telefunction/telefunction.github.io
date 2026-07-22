/**
 * Live brand name — entirely sourced from the GitHub org's own GraphQL data,
 * no hardcoded string anywhere. Falls back to `org.login` (still real
 * GitHub data, just the account slug) only for the edge case where the org
 * hasn't set a display name.
 */
export function useBrand() {
  const { data } = useGithubDataState()
  return computed(() => data.value?.org.name || data.value?.org.login || '')
}
