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
  <a
    class="group flex h-full flex-col gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_50px_-25px_rgba(20,40,120,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.25)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)] dark:hover:border-blue-400/40 dark:hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.45)]"
    :class="featured ? 'p-7' : ''"
    :href="repo.htmlUrl"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
      <IconRepo width="16" height="16" />
      <h3
        class="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-base font-bold text-slate-950 dark:text-white"
      >
        {{ repo.name }}
      </h3>
    </div>

    <p class="line-clamp-3 grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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

    <div
      class="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-3.5 text-[0.82rem] text-slate-600 dark:border-white/10 dark:text-slate-400"
    >
      <span v-if="repo.language" class="inline-flex items-center gap-1.5">
        <span class="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
        {{ repo.language }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <IconStar class="text-yellow-500 dark:text-yellow-400" width="16" height="16" />
        {{ repo.stargazerCount }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <IconFork width="14" height="14" />
        {{ repo.forkCount }}
      </span>
      <span class="ml-auto font-mono text-[0.75rem] text-slate-400 dark:text-slate-600">
        {{ texts.repoCard.updated }} {{ updatedLabel }}
      </span>
    </div>
  </a>
</template>
