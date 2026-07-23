<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <p
    class="inline-flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase dark:text-blue-400"
  >
    <span
      class="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_12px_2px_rgba(59,130,246,0.45)] dark:bg-blue-400"
    />
    {{ label }}
  </p>
</template>
