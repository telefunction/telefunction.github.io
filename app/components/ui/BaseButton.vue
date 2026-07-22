<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'ghost'
    external?: boolean
  }>(),
  { variant: 'primary', external: false },
)

const base =
  'inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-mono text-sm font-semibold tracking-wide transition-all duration-150 whitespace-nowrap'
const variants = {
  primary:
    'bg-blue-600 text-white hover:-translate-y-0.5 hover:shadow-[0_0_24px_2px_rgba(59,130,246,0.4)] dark:bg-blue-400 dark:text-slate-950',
  ghost:
    'border border-slate-300 text-slate-950 hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-400',
}
</script>

<template>
  <a
    :class="[base, variants[variant]]"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>
