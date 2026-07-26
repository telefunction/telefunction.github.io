<script setup lang="ts">
import type { GithubRepoWithHomepage } from '#shared/types/github'
import { texts } from '../../config/texts'

const { data, pending, errorMessage, refresh } = useGithubDataState()

// Same fetched payload PinnedReposSection reads — just a different filter
// over it (repos with a homepage), not a second GitHub request.
const websiteRepos = computed(() =>
  (data.value?.repos ?? []).filter((repo): repo is GithubRepoWithHomepage =>
    Boolean(repo.homepageUrl),
  ),
)
</script>

<template>
  <section
    v-if="pending || errorMessage || websiteRepos.length"
    id="websites"
    class="border-t border-slate-200 py-16 md:py-20 dark:border-white/10"
  >
    <div class="wrap">
      <div class="mb-10">
        <Eyebrow :label="texts.websites.eyebrow" />
        <h2
          class="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
        >
          {{ texts.websites.title }}
        </h2>
        <p class="mt-2 max-w-lg text-slate-600 dark:text-slate-400">
          {{ texts.websites.subtitle }}
        </p>
      </div>

      <LoadingState v-if="pending && !data" :rows="3" />
      <ErrorState v-else-if="errorMessage" :message="errorMessage" :on-retry="refresh" />
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <WebsitePreviewCard v-for="repo in websiteRepos" :key="repo.name" :repo="repo" />
      </div>
    </div>
  </section>
</template>
