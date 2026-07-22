/**
 * Single source of truth for the org/brand name — every other string in this
 * file (and any SEO/meta config that needs it) is derived from it.
 */
export const BRAND = 'Telefunction'

/**
 * All user-facing copy lives here, separate from components/markup.
 * Also the single source for SEO meta content (see `nuxt.config.ts` and
 * `app/app.vue`).
 */
export const texts = {
  meta: {
    title: `${BRAND} — Ecosystem`,
    description: `${BRAND} is a software engineering ecosystem building open-source tools and infrastructure.`,
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
  },

  pinned: {
    eyebrow: 'Open-source',
    title: 'Repositories',
    subtitle: 'A curated look at the projects we’re most proud of.',
    empty: 'No repositories to feature yet.',
  },

  repoCard: {
    updated: 'Updated',
    noDescription: 'No description provided.',
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
