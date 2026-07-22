import { THEME_STORAGE_KEY } from '../config/theme'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

// Module-scope singletons: cheap, client-only UI state shared by every
// consumer (there's one ThemeToggle on the page). Never touched at module
// load — only inside onMounted below — so importing this file has no
// browser-API side effects and stays safe under Nuxt's Node-based prerender.
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

    // The actual theme is already applied pre-hydration by the inline
    // script in nuxt.config.ts (app.head.script) — this just brings Vue's
    // state (icon/label) in sync afterward, avoiding a hydration mismatch.
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
