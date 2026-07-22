import tailwindcss from '@tailwindcss/vite'
import { BRAND, texts } from './app/config/texts'

const THEME_STORAGE_KEY = 'telefunction-theme'

// Applied before Vue mounts to avoid a flash of the wrong theme.
const themeInitScript = `(function(){var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo', '@nuxt/eslint'],

  // Subfolders under app/components/ are for organization only, not naming
  // namespaces — keep bare component names (<AppHeader>, not <LayoutAppHeader>).
  components: [
    { path: '~/components/icons', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/ui', pathPrefix: false },
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      // texts.ts already supplies the full, brand-inclusive title — skip
      // the site module's default "%s | SiteName" auto-suffix.
      titleTemplate: '%s',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#020617' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
      script: [{ key: 'theme-init', innerHTML: themeInitScript }],
    },
  },

  site: {
    name: BRAND,
    description: texts.meta.description,
    defaultLocale: 'en',
  },

  // Social preview image is the org's real GitHub avatar (set via useSeoMeta
  // in app/pages/index.vue) rather than a generated one — no renderer
  // dependency (Chromium/Satori) needed for a one-page static site.
  ogImage: {
    enabled: false,
  },

  runtimeConfig: {
    // Server-only — never exposed to the client bundle.
    githubToken: '',
    pinnedRepos: '',
    public: {
      orgUsername: '',
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  typescript: {
    strict: true,
  },
})
