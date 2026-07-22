const TICK_INTERVAL_MS = 60_000

// Module-scope shared clock — one interval re-ticks every relative-time
// label on the page, however many there are.
const tick = ref(0)
let started = false

/**
 * Reactive wrapper around `relativeTime()` (app/utils/relativeTime.ts). A
 * computed built straight from a plain date string only re-evaluates when
 * that string changes — which never happens on a static page — so "3
 * minutes ago" would otherwise freeze at whatever was true on first render
 * until a full reload. This re-evaluates every 60s instead, via a shared
 * interval started client-side on first mount (SSR/prerender-safe).
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
