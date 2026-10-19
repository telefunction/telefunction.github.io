<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <p
    class="inline-flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase dark:text-blue-400"
  >
    {{ label }}
  </p>
</template>
