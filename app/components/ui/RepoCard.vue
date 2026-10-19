<script setup lang="ts">
import type { GithubRepo } from '#shared/types/github'
import { texts } from '../../config/texts'
import { REPO_TOPIC_LIMIT } from '../../config/ui'
const props = defineProps<{ repo: GithubRepo }>()
const updatedLabel = useRelativeTime(() => props.repo.pushedAt)
</script>

<template>
  <BaseCard as="div" class="group relative flex h-full flex-col p-6 sm:p-7">
    <div class="flex items-start gap-3">
      <IconRepo
        width="18"
        height="18"
        class="mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
      />
      <h3 class="min-w-0 flex-1 font-mono text-base font-semibold tracking-tight break-words">
        <a
          :href="repo.htmlUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="after:absolute after:inset-0 after:rounded-2xl"
          >{{ repo.name }}</a
        >
      </h3>
      <IconArrowRight
        width="17"
        height="17"
        class="mt-0.5 shrink-0 -rotate-45 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
      />
    </div>
    <p class="mt-3 grow text-sm leading-6 text-slate-600 dark:text-slate-400">
      {{ repo.description || texts.repoCard.noDescription }}
    </p>
    <ul v-if="repo.topics.length" class="mt-5 flex flex-wrap gap-1.5">
      <li
        v-for="topic in repo.topics.slice(0, REPO_TOPIC_LIMIT)"
        :key="topic"
        class="rounded-md bg-slate-100 px-2 py-1 font-mono text-[0.65rem] text-slate-500 dark:bg-white/5 dark:text-slate-400"
      >
        {{ topic }}
      </li>
    </ul>
    <div
      class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400"
    >
      <span v-if="repo.language" class="inline-flex items-center gap-1.5"
        ><span
          class="size-2 rounded-full"
          :style="{ backgroundColor: getLanguageColor(repo.language) }"
        />{{ repo.language }}</span
      >
      <span
        class="inline-flex items-center gap-1"
        :aria-label="`${formatCount(repo.stargazerCount)} ${texts.hero.stats.stars}`"
        ><IconStar width="14" height="14" />{{ formatCount(repo.stargazerCount) }}</span
      >
      <span
        class="inline-flex items-center gap-1"
        :aria-label="`${formatCount(repo.forkCount)} ${texts.repoCard.forks}`"
        ><IconFork width="13" height="13" />{{ formatCount(repo.forkCount) }}</span
      >
      <time
        :datetime="repo.pushedAt"
        :title="formatAbsoluteDate(repo.pushedAt)"
        class="ml-auto text-[0.65rem]"
        >{{ texts.repoCard.updated }} {{ updatedLabel }}</time
      >
    </div>
  </BaseCard>
</template>
