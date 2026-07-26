import tailwindcss from '@tailwindcss/vite'
import { THEME_STORAGE_KEY } from './app/config/theme'
import { texts } from './app/config/texts'

// Applied before Vue mounts to avoid a flash of the wrong theme.
const themeInitScript = `(function(){var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // Individual SEO modules, not the `@nuxtjs/seo` meta-package — it also
  // pulls in nuxt-og-image, which force-installs sharp and broke `npm ci`
  // on CI. We use the real org avatar as the OG image, so it's dead weight.
  modules: [
    'nuxt-site-config',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-link-checker',
    '@nuxt/eslint',
    '@nuxt/fonts',
  ],

  // Self-hosts the two families declared in main.css's @theme block —
  // explicit here instead of relying on auto-detection, since Tailwind v4
  // exposes them behind `var(--font-sans)`/`var(--font-mono)` rather than
  // literal `font-family` values the scanner can pick up on its own.
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

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
      // Each page supplies its own full title — skip the default suffix.
      titleTemplate: '%s',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#020617' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [{ key: 'theme-init', innerHTML: themeInitScript }],
    },
  },

  site: {
    // Runs before any fetch exists, so it can't use the live name from
    // useBrand() — the org's account slug stands in for this invisible SEO field.
    name: process.env.NUXT_PUBLIC_ORG_USERNAME,
    description: texts.meta.description(process.env.NUXT_PUBLIC_ORG_USERNAME || ''),
    defaultLocale: 'en',
  },

  runtimeConfig: {
    // Server-only — never exposed to the client bundle.
    githubToken: '',
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
