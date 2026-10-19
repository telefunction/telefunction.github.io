<script setup lang="ts">
import { texts } from '../../config/texts'
const { public: publicConfig } = useRuntimeConfig()
const viewAllUrl = `https://github.com/orgs/${publicConfig.orgUsername}/repositories`
const { data, pending, errorMessage, refresh } = useGithubDataState()
const pinnedRepos = computed(() => data.value?.pinnedRepos ?? [])
</script>

<template>
  <section
    id="repositories"
    class="section-surface border-t border-slate-200 py-16 md:py-24 dark:border-white/10"
  >
    <div class="wrap">
      <SectionHeading
        number="01"
        :eyebrow="texts.pinned.eyebrow"
        :title="texts.pinned.title"
        :subtitle="texts.pinned.subtitle"
        :count="pinnedRepos.length"
      >
        <a
          :href="viewAllUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link inline-flex items-center gap-2 text-sm font-medium"
          >{{ texts.pinned.viewAll }}<IconArrowRight width="15" height="15"
        /></a>
      </SectionHeading>
      <LoadingState v-if="pending && !data" :rows="3" />
      <ErrorState v-else-if="errorMessage" :message="errorMessage" :on-retry="refresh" />
      <div
        v-else-if="pinnedRepos.length"
        class="grid grid-cols-1 gap-4"
        :class="{
          'md:grid-cols-2': pinnedRepos.length > 1,
          'lg:grid-cols-3': pinnedRepos.length > 2,
        }"
      >
        <RepoCard v-for="repo in pinnedRepos" :key="repo.name" :repo="repo" />
      </div>
      <div v-else class="empty-state">
        <IconRepo width="32" height="32" class="mb-5 text-blue-600 dark:text-blue-400" />
        <h3 class="text-xl font-semibold tracking-tight">{{ texts.pinned.empty }}</h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {{ texts.pinned.emptyDescription }}
        </p>
      </div>
    </div>
  </section>
</template>
