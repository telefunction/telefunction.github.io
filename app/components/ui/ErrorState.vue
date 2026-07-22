<script setup lang="ts">
import { texts } from '../../config/texts'

const props = defineProps<{
  message?: string | null
  onRetry?: () => void
}>()

const label = computed(() =>
  props.message === 'rate-limited' ? texts.states.rateLimited : texts.states.error,
)
</script>

<template>
  <div
    class="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-slate-900"
  >
    <p class="font-mono text-sm text-slate-600 dark:text-slate-400">{{ label }}</p>
    <button
      v-if="onRetry"
      class="rounded-xl border border-slate-300 px-5 py-2.5 font-mono text-sm text-slate-950 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400"
      type="button"
      @click="onRetry"
    >
      {{ texts.states.retry }}
    </button>
  </div>
</template>
