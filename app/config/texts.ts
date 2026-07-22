/**
 * All user-facing copy lives here, separate from components/markup. Also
 * the single source for SEO meta content (see `nuxt.config.ts` and
 * `app/pages/index.vue`).
 *
 * No brand name is hardcoded anywhere in this file — `meta.description` is
 * a function of the brand instead of a fixed string, so every caller
 * supplies the live name from `useBrand()` (or, in `nuxt.config.ts`, the
 * org's account slug — the one spot that can't reach live GraphQL data;
 * see the comment there).
 */
export const texts = {
  meta: {
    titleSuffix: 'Ecosystem',
    description: (brand: string) =>
      `${brand} is a software engineering ecosystem building open-source tools and infrastructure.`,
  },

  hero: {
    eyebrow: 'Ecosystem',
    titleLines: ['We build systems', 'that hold up.'],
    subtitle:
      'An open-source engineering collective focused on clean architecture, resilient infrastructure, and tools built to last.',
    primaryCta: 'View on GitHub',
    statusLabel: 'status',
    status: {
      online: 'ONLINE',
      offline: 'OFFLINE',
      checking: 'CHECKING',
    },
    stats: {
      repositories: 'Repositories',
      stars: 'Total Stars',
      followers: 'Followers',
    },
    /** Shown for a stat whose value isn't available yet (or failed to load) — never a fake 0. */
    statUnavailable: '—',
  },

  pinned: {
    eyebrow: 'Open-source',
    title: 'Repositories',
    subtitle: 'A curated look at the projects we’re most proud of.',
    empty: 'No repositories to feature yet.',
    viewAll: 'View all repositories',
  },

  repoCard: {
    updated: 'Updated',
    noDescription: 'No description provided.',
  },

  websites: {
    eyebrow: 'Live',
    title: 'Project Sites',
    subtitle: 'Live previews of the sites behind these repositories.',
    openSite: 'Open site',
  },

  states: {
    loading: 'Loading data from GitHub…',
    error: 'Unable to reach the GitHub API right now.',
    rateLimited: 'GitHub API rate limit reached — please try again shortly.',
    retry: 'Retry',
  },

  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    toggleLabel: 'Toggle theme',
  },

  footer: {
    tagline: 'Building in the open.',
    rights: 'All rights reserved.',
    dataCached: 'Data cached',
  },

  notFound: {
    eyebrow: 'Error 404',
    heading: 'Lost in the pipeline.',
    message: 'This page doesn’t exist, moved, or never shipped in the first place.',
    backButton: 'Back to home',
  },
} as const
