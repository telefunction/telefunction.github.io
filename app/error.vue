<script setup lang="ts">
import type { NuxtError } from '#app'
import { texts } from './config/texts'

defineProps<{ error: NuxtError }>()

// error.vue is prerendered standalone (it's not wrapped by app.vue), so it
// needs its own fetch to get the live brand name — this triggers it.
await useGithubData()
const brand = useBrand()

useSeoMeta({
  title: `${texts.notFound.eyebrow} — ${brand.value}`,
  description: texts.notFound.message,
  robots: 'noindex',
})
</script>

<template>
  <div
    class="bg-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-20"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-140 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.16),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(96,165,250,0.22),transparent_70%)]"
    />

    <div
      class="inline-flex items-center gap-2.5 font-mono text-base font-bold tracking-tight text-slate-950 dark:text-white"
    >
      <IconLogo width="20" height="20" class="text-blue-600 dark:text-blue-400" />
      {{ brand }}
    </div>

    <div
      class="animate-fade-in-up mt-10 w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center shadow-[0_20px_60px_-20px_rgba(0,10,60,0.15)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)]"
    >
      <p class="font-mono text-6xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
        {{ error.status ?? 404 }}
      </p>
      <h1 class="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
        {{ texts.notFound.heading }}
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ texts.notFound.message }}
      </p>
      <BaseButton href="/" variant="primary" class="mt-8 justify-center">
        {{ texts.notFound.backButton }}
      </BaseButton>
    </div>
  </div>
</template>
