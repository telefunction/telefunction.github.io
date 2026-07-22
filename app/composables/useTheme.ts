import { THEME_STORAGE_KEY } from '../config/theme'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

// Module-scope singletons, shared by every consumer. Only touched inside
// onMounted below — never at module load — so this stays prerender-safe.
const preference = ref<ThemePreference>('system')
const systemPrefersDark = ref(false)
let initialized = false

const resolvedTheme = computed<ResolvedTheme>(() =>
  preference.value === 'system' ? (systemPrefersDark.value ? 'dark' : 'light') : preference.value,
)

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', theme)
}

function setPreference(next: ThemePreference) {
  preference.value = next
  localStorage.setItem(THEME_STORAGE_KEY, next)
  applyTheme(resolvedTheme.value)
}

function cyclePreference() {
  const order: ThemePreference[] = ['system', 'light', 'dark']
  setPreference(order[(order.indexOf(preference.value) + 1) % order.length] ?? 'system')
}

export function useTheme() {
  onMounted(() => {
    if (initialized) return
    initialized = true

    // Theme itself is already applied pre-hydration (nuxt.config.ts's
    // inline script) — this just syncs Vue's state (icon/label) after mount.
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    preference.value =
      stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
    systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      systemPrefersDark.value = event.matches
      if (preference.value === 'system') applyTheme(resolvedTheme.value)
    })
  })

  return { preference, resolvedTheme, setPreference, cyclePreference }
}
