<script setup lang="ts">
import type { GithubRepoWithHomepage } from '#shared/types/github'
import { texts } from '../../config/texts'

defineProps<{ repo: GithubRepoWithHomepage }>()

// Rendered at a fixed "desktop" size, then scaled down to fit the box — a
// real zoomed-out view of the page, not a squished narrow reflow. The scale
// factor comes from the box's actual measured width (ResizeObserver), not a
// CSS unit trick, so it stays correct across breakpoints/resizes.
const PREVIEW_WIDTH = 1440
const PREVIEW_HEIGHT = 810

const previewBox = ref<HTMLDivElement | null>(null)
const scale = ref(0.25)
const isPreviewLoaded = ref(false)
const isPreviewVisible = ref(false)

onMounted(() => {
  if (!previewBox.value) return
  const resizeObserver = new ResizeObserver(([entry]) => {
    if (entry) scale.value = entry.contentRect.width / PREVIEW_WIDTH
  })
  resizeObserver.observe(previewBox.value)
  onUnmounted(() => resizeObserver.disconnect())

  // Assigning `src` only once in view — rather than trusting the browser's
  // native `loading="lazy"` distance threshold — keeps these full external
  // pages (each with its own JS to parse/execute) from ever touching the
  // main thread until the visitor actually scrolls to them.
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isPreviewVisible.value = true
      intersectionObserver.disconnect()
    },
    { rootMargin: '200px' },
  )
  intersectionObserver.observe(previewBox.value)
  onUnmounted(() => intersectionObserver.disconnect())
})
</script>

<template>
  <BaseCard as="div" class="group relative flex flex-col overflow-hidden">
    <!-- Purely a preview: no pointer events, lazy-loaded. `overscroll-contain`
         stops any scroll/focus behavior from inside the frame (e.g. a site
         autofocusing an element on load) from chaining out and scrolling
         *our* page — needed because most of these sites require JS to
         render at all, so the sandbox can't drop `allow-scripts`. -->
    <div
      ref="previewBox"
      class="relative aspect-video overflow-hidden overscroll-contain border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
    >
      <div
        v-if="!isPreviewLoaded"
        class="animate-shimmer absolute inset-0 bg-[linear-gradient(100deg,#f8fafc_30%,#e2e8f0_50%,#f8fafc_70%)] bg-size-[200%_100%] dark:bg-[linear-gradient(100deg,#0f172a_30%,#1e293b_50%,#0f172a_70%)]"
      />
      <iframe
        v-if="isPreviewVisible"
        :src="repo.homepageUrl"
        :title="`Preview of ${repo.name}`"
        :style="{
          width: `${PREVIEW_WIDTH}px`,
          height: `${PREVIEW_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }"
        sandbox="allow-scripts allow-same-origin"
        tabindex="-1"
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 left-1/2 border-0"
        @load="isPreviewLoaded = true"
      />
    </div>

    <div class="flex grow flex-col gap-2 p-6">
      <h3 class="font-mono text-base font-bold text-slate-950 dark:text-white">
        {{ repo.name }}
      </h3>
      <p class="line-clamp-2 grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ repo.description || texts.repoCard.noDescription }}
      </p>
      <!-- Stretched link: same click-anywhere-on-the-card pattern as RepoCard. -->
      <a
        :href="repo.homepageUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-1 inline-flex items-center gap-1.5 self-start font-mono text-sm text-blue-600 after:absolute after:inset-0 dark:text-blue-400"
      >
        {{ texts.websites.openSite }}
        <IconArrowRight
          width="12"
          height="12"
          class="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </a>
    </div>
  </BaseCard>
</template>
