/**
 * localStorage key for the persisted theme preference. Shared between the
 * pre-hydration inline script (`nuxt.config.ts`, avoids a flash of the
 * wrong theme) and `useTheme.ts` (reads/writes it after mount) — a single
 * source so the two can never drift out of sync.
 */
export const THEME_STORAGE_KEY = 'telefunction-theme'
