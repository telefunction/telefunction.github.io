<script setup lang="ts">
import { BRAND, texts } from '../../config/texts'

const { public: publicConfig } = useRuntimeConfig()
const githubOrgUrl = `https://github.com/${publicConfig.orgUsername}`

const { data } = useGithubDataState()
const cacheAgeLabel = useRelativeTime(() => data.value?.generatedAt ?? '')
const cacheAge = computed(() => (data.value ? cacheAgeLabel.value : null))

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 py-10 dark:border-white/10">
    <div
      class="wrap flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
    >
      <div>
        <p class="font-mono text-sm font-bold text-slate-950 dark:text-white">
          {{ BRAND }}
        </p>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ texts.footer.tagline }}</p>
      </div>

      <a
        class="self-start rounded-xl border border-slate-300 px-3.5 py-2 font-mono text-sm text-blue-600 transition-colors hover:border-blue-600 dark:border-white/15 dark:text-blue-400 dark:hover:border-blue-400"
        :href="githubOrgUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/{{ publicConfig.orgUsername }}
      </a>

      <div class="text-left text-xs text-slate-500 sm:text-right dark:text-slate-500">
        <p class="inline-flex items-center gap-1.5 font-mono">
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          </span>
          <span v-if="cacheAge">{{ texts.footer.dataCached }} {{ cacheAge }}</span>
        </p>
        <p class="mt-1">© {{ year }} {{ BRAND }}. {{ texts.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>
