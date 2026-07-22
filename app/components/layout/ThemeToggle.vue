<script setup lang="ts">
import { texts } from '../../config/texts'

const { preference, cyclePreference } = useTheme()

const icon = computed(() => {
  if (preference.value === 'light') return 'light'
  if (preference.value === 'dark') return 'dark'
  return 'system'
})

const label = computed(() => texts.theme[preference.value])
</script>

<template>
  <button
    class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-slate-300 text-slate-600 transition-all duration-150 hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
    type="button"
    :aria-label="texts.theme.toggleLabel"
    :title="`${texts.theme.toggleLabel}: ${label}`"
    @click="cyclePreference"
  >
    <IconSun v-if="icon === 'light'" width="16" height="16" />
    <IconMoon v-else-if="icon === 'dark'" width="16" height="16" />
    <IconMonitor v-else width="16" height="16" />
    <span class="sr-only">{{ label }}</span>
  </button>
</template>
