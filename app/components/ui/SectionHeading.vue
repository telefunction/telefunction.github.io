<script setup lang="ts">
defineProps<{ number: string; eyebrow: string; title: string; subtitle: string; count?: number }>()
</script>

<template>
  <div class="mb-9 flex flex-wrap items-end justify-between gap-6 md:mb-12">
    <div>
      <div class="mb-4 flex items-center gap-3">
        <span class="font-mono text-xs text-slate-400 dark:text-slate-500">{{ number }} /</span
        ><Eyebrow :label="eyebrow" />
      </div>
      <h2 class="flex items-start gap-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
        {{ title
        }}<span
          v-if="count"
          class="mt-1 rounded-full border border-slate-200 px-2 py-1 font-mono text-xs tracking-normal text-slate-500 dark:border-white/15 dark:text-slate-400"
          >{{ count }}</span
        >
      </h2>
      <p class="mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">
        {{ subtitle }}
      </p>
    </div>
    <slot />
  </div>
</template>
