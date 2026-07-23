/** Live org name from GraphQL, falling back to `org.login` if no display name is set. */
export function useBrand() {
  const { data } = useGithubDataState()
  return computed(() => data.value?.org.name || data.value?.org.login || '')
}
