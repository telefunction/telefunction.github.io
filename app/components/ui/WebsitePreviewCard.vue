<script setup lang="ts">
import type { GithubRepo } from '#shared/types/github'
import { texts } from '../../config/texts'

defineProps<{ repo: GithubRepo & { homepageUrl: string } }>()

// Rendered at a fixed "desktop" size, then scaled down to fit the box — a
// real zoomed-out view of the page, not a squished narrow reflow. The scale
// factor comes from the box's actual measured width (ResizeObserver), not a
// CSS unit trick, so it stays correct across breakpoints/resizes.
const PREVIEW_WIDTH = 1440
const PREVIEW_HEIGHT = 810

const previewBox = ref<HTMLDivElement | null>(null)
const scale = ref(0.25)
const previewLoaded = ref(false)

onMounted(() => {
  if (!previewBox.value) return
  const observer = new ResizeObserver(([entry]) => {
    if (entry) scale.value = entry.contentRect.width / PREVIEW_WIDTH
  })
  observer.observe(previewBox.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_20px_50px_-25px_rgba(20,40,120,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.25)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)] dark:hover:border-blue-400/40 dark:hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.45)]"
  >
    <!-- Purely a preview: no pointer events, lazy-loaded. `allow-same-origin`
         is needed alongside `allow-scripts` because most JS-rendered sites
         (SPAs, hydration, storage access on boot) throw and render blank
         without it — real navigation/popups/forms stay blocked regardless. -->
    <div
      ref="previewBox"
      class="relative aspect-video overflow-hidden border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"
    >
      <div
        v-if="!previewLoaded"
        class="absolute inset-0 animate-shimmer bg-size-[200%_100%] bg-[linear-gradient(100deg,#f8fafc_30%,#e2e8f0_50%,#f8fafc_70%)] dark:bg-[linear-gradient(100deg,#0f172a_30%,#1e293b_50%,#0f172a_70%)]"
      />
      <iframe
        :src="repo.homepageUrl"
        :title="`Preview of ${repo.name}`"
        :style="{
          width: `${PREVIEW_WIDTH}px`,
          height: `${PREVIEW_HEIGHT}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        tabindex="-1"
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 left-1/2 border-0"
        @load="previewLoaded = true"
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
  </div>
</template>
