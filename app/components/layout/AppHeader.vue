<script setup lang="ts">
const brand = useBrand()
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80"
  >
    <div class="wrap flex h-16 items-center">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2.5 font-mono text-base font-bold tracking-tight text-slate-950 dark:text-white"
      >
        <IconLogo width="18" height="18" class="text-blue-600 dark:text-blue-400" />
        {{ brand }}
      </NuxtLink>

      <div class="ml-auto flex items-center gap-3">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
