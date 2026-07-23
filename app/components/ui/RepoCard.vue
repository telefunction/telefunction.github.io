<script setup lang="ts">
import type { GithubRepo } from '#shared/types/github'
import { texts } from '../../config/texts'

const props = defineProps<{
  repo: GithubRepo
  featured?: boolean
}>()

const updatedLabel = useRelativeTime(() => props.repo.pushedAt)
</script>

<template>
  <BaseCard
    as="div"
    class="group relative flex h-full flex-col gap-3.5 overflow-hidden p-6"
    :class="featured ? 'p-7' : ''"
  >
    <!-- Pinned cards get a top accent bar instead of competing for space in the header row. -->
    <span
      v-if="featured"
      class="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300"
    />

    <div class="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
      <IconRepo width="16" height="16" class="shrink-0" />
      <h3
        class="flex min-w-0 flex-1 items-center gap-1 font-mono text-base font-bold text-slate-950 dark:text-white"
      >
        <!-- Stretched link: covers the whole card so it's clickable anywhere. -->
        <a
          :href="repo.htmlUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex min-w-0 items-center gap-1 after:absolute after:inset-0"
        >
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ repo.name }}</span>
          <IconArrowRight
            width="12"
            height="12"
            class="shrink-0 -translate-x-1 text-blue-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-blue-400"
          />
        </a>
      </h3>
    </div>

    <p class="line-clamp-2 grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
      {{ repo.description || texts.repoCard.noDescription }}
    </p>

    <ul v-if="repo.topics.length" class="flex flex-wrap gap-1.5">
      <li
        v-for="topic in repo.topics.slice(0, 4)"
        :key="topic"
        class="rounded-full border border-slate-300 px-2.5 py-1 font-mono text-[0.7rem] text-slate-600 dark:border-white/15 dark:text-slate-400"
      >
        {{ topic }}
      </li>
    </ul>

    <!-- Never wraps: language/stars/forks stay put (shrink-0), "Updated…"
         grows/shrinks into whatever's left and truncates with an ellipsis
         instead of pushing the row onto a second line. -->
    <div
      class="flex items-center gap-3 border-t border-slate-200 pt-3.5 text-[0.82rem] text-slate-600 dark:border-white/10 dark:text-slate-400"
    >
      <span v-if="repo.language" class="inline-flex shrink-0 items-center gap-1.5">
        <span
          class="h-2 w-2 shrink-0 rounded-full"
          :style="{ backgroundColor: getLanguageColor(repo.language) }"
        />
        {{ repo.language }}
      </span>
      <span class="inline-flex shrink-0 items-center gap-1.5">
        <IconStar class="text-yellow-500 dark:text-yellow-400" width="16" height="16" />
        {{ formatCount(repo.stargazerCount) }}
      </span>
      <span class="inline-flex shrink-0 items-center gap-1.5">
        <IconFork width="14" height="14" />
        {{ formatCount(repo.forkCount) }}
      </span>
      <span
        class="ml-auto min-w-0 flex-1 overflow-hidden text-right font-mono text-[0.75rem] text-ellipsis whitespace-nowrap text-slate-400 dark:text-slate-600"
      >
        {{ texts.repoCard.updated }} {{ updatedLabel }}
      </span>
    </div>
  </BaseCard>
</template>
