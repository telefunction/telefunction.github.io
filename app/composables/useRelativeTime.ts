const TICK_INTERVAL_MS = 60_000

// Module-scope shared clock — one interval re-ticks every relative-time
// label on the page, however many there are.
const tick = ref(0)
let started = false

/**
 * Reactive wrapper around `relativeTime()` — a plain computed only
 * re-evaluates when its date input changes, which never happens on a
 * static page, so labels would freeze until a reload. This re-ticks every
 * 60s instead, via a shared interval started client-side on first mount.
 */
export function useRelativeTime(date: MaybeRefOrGetter<string>) {
  onMounted(() => {
    if (started) return
    started = true
    setInterval(() => {
      tick.value++
    }, TICK_INTERVAL_MS)
  })

  return computed(() => {
    void tick.value
    return relativeTime(toValue(date))
  })
}
