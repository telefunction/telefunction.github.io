/** All user-facing copy. `meta.description` takes the brand as a parameter — see `useBrand()`. */
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
