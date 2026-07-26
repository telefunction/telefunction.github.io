const TICK_INTERVAL_MS = 60_000

const tick = ref(0)
let hasStarted = false

/**
 * Reactive wrapper around `formatRelativeTime()` — a plain computed only
 * re-evaluates when its date input changes, which never happens on a
 * static page, so labels would freeze until a reload. This re-ticks every
 * 60s instead, via a shared interval started client-side on first mount.
 *
 * Renders a fixed absolute date until mounted: the prerendered HTML is
 * frozen at build time, but hydration runs whenever a visitor actually loads
 * the (potentially hours-old, cron-rebuilt) static page — a relative string
 * computed at either moment would almost never match the other, tripping
 * Vue's hydration mismatch check.
 */
export function useRelativeTime(date: MaybeRefOrGetter<string>) {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
    if (hasStarted) return
    hasStarted = true
    setInterval(() => {
      tick.value++
    }, TICK_INTERVAL_MS)
  })

  return computed(() => {
    if (!isMounted.value) return formatAbsoluteDate(toValue(date))
    void tick.value
    return formatRelativeTime(toValue(date))
  })
}
