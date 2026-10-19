/** All user-facing copy. `meta.description` takes the brand as a parameter — see `useBrand()`. */
export const texts = {
  meta: {
    titleSuffix: 'Ecosystem',
    description: (brand: string) =>
      `${brand} is a software engineering ecosystem building open-source tools and infrastructure.`,
  },

  navigation: {
    label: 'Main navigation',
    repositories: 'Repositories',
    websites: 'Project sites',
    skip: 'Skip to content',
    backToTop: 'Back to top',
  },

  hero: {
    eyebrow: 'Independent minds. Shared ambition.',
    titleLines: ['We build systems', 'that hold up.'],
    subtitle:
      'An open-source engineering collective focused on clean architecture, resilient infrastructure, and tools built to last.',
    primaryCta: 'Explore our work',
    secondaryCta: 'Find us on GitHub',
    diagramLabel: 'An open ecosystem',
    diagramCaption: 'Ideas connect. Systems emerge.',
    diagramNodes: ['Open source', 'Built together', 'Made to last'],
    statsLabel: 'The ecosystem, in numbers',
    statusLabel: 'status',
    status: {
      online: 'GitHub connected',
      offline: 'GitHub unavailable',
      checking: 'Connecting to GitHub',
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
    viewAll: 'View all repositories',
    empty: 'Our next chapter starts here.',
    emptyDescription: 'Public projects will appear here as they take shape.',
  },

  repoCard: {
    forks: 'Forks',
    updated: 'Updated',
    noDescription: 'No description provided.',
  },

  websites: {
    eyebrow: 'Live',
    title: 'Project Sites',
    subtitle: 'Live previews of the sites behind these repositories.',
    openSite: 'Visit site',
    preview: 'Load preview',
    hidePreview: 'Hide preview',
    copyLink: 'Copy link',
    linkCopied: 'Copied',
    copyFailed: 'Copy failed',
    previewNote: 'Preview loads content from the project’s website.',
    empty: 'A window into what we build.',
    emptyDescription: 'Project sites will appear here when they’re ready to explore.',
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
    tagline: 'Built in the open. Better together.',
    invitation: 'Good systems start with a connection.',
    cta: 'Let’s build something.',
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
