<script setup lang="ts">
import { texts } from '../../config/texts'
const brand = useBrand()
</script>

<template>
  <a href="#main-content" class="skip-link">{{ texts.navigation.skip }}</a>
  <header
    class="site-header sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90"
  >
    <div
      class="wrap grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-3 sm:h-20 sm:grid-cols-[1fr_auto_auto] sm:py-0"
    >
      <NuxtLink
        to="/"
        class="inline-flex min-w-0 items-center gap-3 text-sm font-bold tracking-tight sm:text-lg"
      >
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-950"
        >
          <IconLogo width="19" height="19" />
        </span>
        <span class="truncate">{{ brand }}</span>
      </NuxtLink>
      <nav
        :aria-label="texts.navigation.label"
        class="order-3 col-span-2 flex items-center gap-6 text-xs font-medium sm:order-none sm:col-span-1 sm:gap-7 sm:text-sm"
      >
        <a href="/#repositories" class="nav-link">{{ texts.navigation.repositories }}</a>
        <a href="/#websites" class="nav-link">{{ texts.navigation.websites }}</a>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>
