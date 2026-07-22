<script setup lang="ts">
import { texts } from '../../config/texts'

const { public: publicConfig } = useRuntimeConfig()
const viewAllUrl = `https://github.com/orgs/${publicConfig.orgUsername}/repositories`

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

          <!-- Same card chrome as RepoCard, so it reads as part of the same set. -->
          <a
            :href="viewAllUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-[0_20px_50px_-25px_rgba(20,40,120,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.25)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)] dark:hover:border-blue-400/40 dark:hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.45)]"
          >
            <span
              class="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-400/10 dark:text-blue-400"
            >
              <IconArrowRight width="18" height="18" />
            </span>
            <span class="font-mono text-base font-bold text-slate-950 dark:text-white">
              {{ texts.pinned.viewAll }}
            </span>
            <span class="font-mono text-xs text-slate-500 dark:text-slate-500">
              github.com/{{ publicConfig.orgUsername }}
            </span>
          </a>
        </div>
      </template>
    </div>
  </section>
</template>
