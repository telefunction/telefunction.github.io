<script setup lang="ts">
import { texts } from '../../config/texts'
const { public: publicConfig } = useRuntimeConfig()
const githubOrgUrl = `https://github.com/${publicConfig.orgUsername}`
const brand = useBrand()
const { data } = useGithubDataState()
const cacheAgeLabel = useRelativeTime(() => data.value?.generatedAt ?? '')
const year = new Date().getFullYear()
</script>

<template>
  <footer class="section-surface border-t border-slate-200 dark:border-white/10">
    <div class="wrap">
      <div class="flex flex-col justify-between gap-8 py-14 sm:flex-row sm:items-end md:py-20">
        <div>
          <p class="mb-4 font-mono text-xs text-slate-500 dark:text-slate-400">
            {{ texts.footer.tagline }}
          </p>
          <p class="max-w-lg text-3xl leading-tight font-semibold tracking-[-0.045em] sm:text-4xl">
            {{ texts.footer.invitation }}
          </p>
        </div>
        <a
          :href="githubOrgUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link inline-flex items-center gap-4 self-start border-b border-slate-300 pb-3 text-base font-medium sm:self-auto dark:border-white/20"
          >{{ texts.footer.cta }}<IconArrowRight width="20" height="20" class="-rotate-45"
        /></a>
      </div>
      <div
        class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-t border-slate-200 py-6 text-xs text-slate-500 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-x-6 dark:border-white/10 dark:text-slate-400"
      >
        <p class="min-w-0 break-words">© {{ year }} {{ brand }}</p>
        <p
          v-if="data"
          class="col-start-1 row-start-2 min-w-0 font-mono text-[0.65rem] break-words sm:col-start-2 sm:row-start-1"
        >
          {{ texts.footer.dataCached }} {{ cacheAgeLabel }}
        </p>
        <a
          href="#top"
          class="text-link col-start-2 row-span-2 row-start-1 inline-flex min-h-11 items-center gap-2 justify-self-end whitespace-nowrap sm:col-start-3 sm:row-span-1"
          >{{ texts.navigation.backToTop
          }}<IconArrowRight width="12" height="12" class="shrink-0 -rotate-90"
        /></a>
      </div>
    </div>
  </footer>
</template>
