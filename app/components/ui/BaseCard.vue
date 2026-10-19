<script setup lang="ts">
withDefaults(defineProps<{ as?: 'div' | 'a' }>(), { as: 'div' })
</script>

<template>
  <component
    :is="as"
    class="project-card rounded-2xl border border-slate-200 bg-white transition-[transform,border-color,box-shadow] duration-300 focus-within:border-blue-500 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-xl hover:shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-blue-400/50 dark:hover:shadow-black/20"
  >
    <slot />
  </component>
</template>
