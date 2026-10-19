<script setup lang="ts">
import type { GithubRepoWithHomepage } from '#shared/types/github'
import { texts } from '../../config/texts'
import {
  WEBSITE_PREVIEW_WIDTH,
  WEBSITE_PREVIEW_HEIGHT,
  COPY_FEEDBACK_DURATION_MS,
} from '../../config/ui'
const props = defineProps<{ repo: GithubRepoWithHomepage }>()
const previewBox = ref<HTMLDivElement | null>(null)
const previewWidth = ref(0)
const showPreview = ref(false)
const loadButton = ref<HTMLButtonElement | null>(null)
const dismissButton = ref<HTMLButtonElement | null>(null)

const copyFeedback = ref('')
const isCopying = ref(false)
let copyFeedbackTimer: ReturnType<typeof setTimeout> | undefined
let isDisposed = false

async function copyLink() {
  if (isCopying.value) return
  clearTimeout(copyFeedbackTimer)
  copyFeedback.value = ''
  isCopying.value = true
  try {
    await navigator.clipboard.writeText(props.repo.homepageUrl)
    copyFeedback.value = texts.websites.linkCopied
  } catch {
    copyFeedback.value = texts.websites.copyFailed
  } finally {
    isCopying.value = false
    if (!isDisposed) {
      copyFeedbackTimer = setTimeout(() => {
        copyFeedback.value = ''
      }, COPY_FEEDBACK_DURATION_MS)
    }
  }
}

async function openPreview() {
  showPreview.value = true
  await nextTick()
  dismissButton.value?.focus({ preventScroll: true })
}

async function hidePreview() {
  if (!showPreview.value) return
  showPreview.value = false
  await nextTick()
  loadButton.value?.focus({ preventScroll: true })
}
let resizeObserver: ResizeObserver | undefined
onMounted(() => {
  if (!previewBox.value) return
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry) previewWidth.value = entry.contentRect.width
  })
  resizeObserver.observe(previewBox.value)
})
onUnmounted(() => {
  isDisposed = true
  clearTimeout(copyFeedbackTimer)
  resizeObserver?.disconnect()
})
</script>

<template>
  <BaseCard as="div" class="group flex flex-col overflow-hidden">
    <div
      class="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5"
    >
      <span class="flex shrink-0 gap-1" aria-hidden="true"
        ><span
          v-for="dot in 3"
          :key="dot"
          class="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
      /></span>
      <button
        type="button"
        class="min-w-0 flex-1 cursor-pointer truncate text-left font-mono text-[0.65rem] text-slate-500 transition-colors hover:text-blue-600 hover:underline disabled:cursor-wait dark:text-slate-400 dark:hover:text-blue-400"
        :title="repo.homepageUrl"
        :aria-label="`${texts.websites.copyLink}: ${repo.homepageUrl}`"
        :disabled="isCopying"
        @click="copyLink"
      >
        {{ repo.homepageUrl }}
      </button>
      <span
        role="status"
        aria-live="polite"
        :class="
          copyFeedback ? 'shrink-0 text-[0.65rem] text-slate-600 dark:text-slate-300' : 'sr-only'
        "
        >{{ copyFeedback }}</span
      >
    </div>
    <div
      ref="previewBox"
      class="site-preview-cover relative aspect-video shrink-0 overflow-hidden border-b border-slate-200 dark:border-white/10"
      @keydown.esc="hidePreview"
    >
      <div
        v-if="!showPreview"
        class="flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <span
          class="mb-4 flex size-14 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-600 shadow-sm dark:border-blue-400/20 dark:bg-slate-900 dark:text-blue-400"
          ><IconMonitor width="24" height="24"
        /></span>
        <p class="max-w-full truncate text-xl font-semibold tracking-tight sm:text-2xl">
          {{ repo.name }}
        </p>
        <button
          ref="loadButton"
          type="button"
          class="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-white/20 dark:bg-slate-900 dark:hover:border-blue-400 dark:hover:text-blue-400"
          :title="texts.websites.previewNote"
          :aria-label="`${texts.websites.preview}: ${repo.name}`"
          @click="openPreview"
        >
          {{ texts.websites.preview }}<IconArrowRight width="12" height="12" />
        </button>
      </div>
      <iframe
        v-else
        :src="repo.homepageUrl"
        :title="repo.name"
        :style="{
          width: `${WEBSITE_PREVIEW_WIDTH}px`,
          height: `${WEBSITE_PREVIEW_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${previewWidth / WEBSITE_PREVIEW_WIDTH})`,
        }"
        sandbox="allow-scripts allow-same-origin"
        tabindex="-1"
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 left-1/2 border-0 bg-white"
      />
      <button
        v-if="showPreview"
        ref="dismissButton"
        type="button"
        class="absolute right-3 bottom-3 z-10 flex size-10 items-center justify-center rounded-full border border-red-300/50 bg-red-600/60 text-white shadow-sm backdrop-blur-md transition-colors hover:border-red-200/60 hover:bg-red-600/75 dark:border-red-300/40 dark:bg-red-500/60 dark:hover:border-red-200/50 dark:hover:bg-red-500/75"
        :aria-label="`${texts.websites.hidePreview}: ${repo.name}`"
        :title="texts.websites.hidePreview"
        @click="hidePreview"
      >
        <IconClose width="16" height="16" />
      </button>
    </div>
    <div class="flex grow flex-col p-6">
      <h3 class="font-mono text-base font-semibold break-words">{{ repo.name }}</h3>
      <p class="mt-2 grow text-sm leading-6 text-slate-600 dark:text-slate-400">
        {{ repo.description || texts.repoCard.noDescription }}
      </p>
      <a
        :href="repo.homepageUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-blue-600 dark:text-blue-400"
        :aria-label="`${texts.websites.openSite}: ${repo.name}`"
        >{{ texts.websites.openSite }}<IconArrowRight width="13" height="13" class="-rotate-45"
      /></a>
    </div>
  </BaseCard>
</template>
