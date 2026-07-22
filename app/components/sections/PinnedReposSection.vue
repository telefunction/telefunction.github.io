<script setup lang="ts">
import { texts } from '../../config/texts'

const { data, pending, errorMessage, refresh } = useGithubDataState()
const pinnedRepos = computed(() => data.value?.pinnedRepos ?? [])
</script>

<template>
  <section id="repositories" class="border-t border-slate-200 py-16 md:py-20 dark:border-white/10">
    <div class="wrap">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow :label="texts.pinned.eyebrow" />
          <h2
            class="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
          >
            {{ texts.pinned.title }}
          </h2>
          <p class="mt-2 max-w-lg text-slate-600 dark:text-slate-400">
            {{ texts.pinned.subtitle }}
          </p>
        </div>
      </div>

      <LoadingState v-if="pending && !data" :rows="3" />
      <ErrorState v-else-if="errorMessage" :message="errorMessage" :on-retry="refresh" />
      <p v-else-if="!pinnedRepos.length" class="text-slate-600 dark:text-slate-400">
        {{ texts.pinned.empty }}
      </p>
      <template v-else>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <RepoCard v-for="repo in pinnedRepos" :key="repo.name" :repo="repo" featured />
        </div>
      </template>
    </div>
  </section>
</template>
