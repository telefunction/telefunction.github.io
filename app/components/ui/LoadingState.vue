<script setup lang="ts">
import { texts } from '../../config/texts'

withDefaults(defineProps<{ rows?: number }>(), { rows: 3 })
</script>

<template>
  <div>
    <div class="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in rows"
        :key="i"
        class="animate-shimmer h-44 rounded-2xl border border-slate-200 bg-[linear-gradient(100deg,#f8fafc_30%,#e2e8f0_50%,#f8fafc_70%)] bg-size-[200%_100%] dark:border-white/10 dark:bg-[linear-gradient(100deg,#0f172a_30%,#1e293b_50%,#0f172a_70%)]"
      />
    </div>
    <p
      class="inline-flex items-center gap-2.5 font-mono text-sm text-slate-600 dark:text-slate-400"
    >
      <span
        class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-white/15 dark:border-t-blue-400"
      />
      {{ texts.states.loading }}
    </p>
  </div>
</template>
