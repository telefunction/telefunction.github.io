<script setup lang="ts">
import type { GithubRepoWithHomepage } from '#shared/types/github'
import { texts } from '../../config/texts'
const { data, pending, errorMessage, refresh } = useGithubDataState()
const websiteRepos = computed(() =>
  (data.value?.repos ?? []).filter((repo): repo is GithubRepoWithHomepage =>
    Boolean(repo.homepageUrl),
  ),
)
</script>

<template>
  <section id="websites" class="border-t border-slate-200 py-16 md:py-24 dark:border-white/10">
    <div class="wrap">
      <SectionHeading
        number="02"
        :eyebrow="texts.websites.eyebrow"
        :title="texts.websites.title"
        :subtitle="texts.websites.subtitle"
        :count="websiteRepos.length"
      />
      <LoadingState v-if="pending && !data" :rows="3" />
      <ErrorState v-else-if="errorMessage" :message="errorMessage" :on-retry="refresh" />
      <div v-else-if="websiteRepos.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WebsitePreviewCard v-for="repo in websiteRepos" :key="repo.name" :repo="repo" />
      </div>
      <div v-else class="empty-state">
        <IconMonitor width="32" height="32" class="mb-5 text-blue-600 dark:text-blue-400" />
        <h3 class="text-xl font-semibold tracking-tight">{{ texts.websites.empty }}</h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {{ texts.websites.emptyDescription }}
        </p>
      </div>
    </div>
  </section>
</template>
