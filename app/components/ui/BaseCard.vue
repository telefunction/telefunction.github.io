<script setup lang="ts">
withDefaults(defineProps<{ as?: 'div' | 'a' }>(), { as: 'div' })
</script>

<template>
  <component
    :is="as"
    class="rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_20px_50px_-25px_rgba(20,40,120,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.25)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)] dark:hover:border-blue-400/40 dark:hover:shadow-[0_24px_70px_-20px_rgba(59,130,246,0.45)]"
  >
    <slot />
  </component>
</template>
