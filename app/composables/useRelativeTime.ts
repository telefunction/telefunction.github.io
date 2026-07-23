const TICK_INTERVAL_MS = 60_000

const tick = ref(0)
let hasStarted = false

/**
 * Reactive wrapper around `formatRelativeTime()` — a plain computed only
 * re-evaluates when its date input changes, which never happens on a
 * static page, so labels would freeze until a reload. This re-ticks every
 * 60s instead, via a shared interval started client-side on first mount.
 */
export function useRelativeTime(date: MaybeRefOrGetter<string>) {
  onMounted(() => {
    if (hasStarted) return
    hasStarted = true
    setInterval(() => {
      tick.value++
    }, TICK_INTERVAL_MS)
  })

  return computed(() => {
    void tick.value
    return formatRelativeTime(toValue(date))
  })
}
