<script setup lang="ts">
import { texts } from '../../config/texts'

const { public: publicConfig } = useRuntimeConfig()
const githubOrgUrl = `https://github.com/${publicConfig.orgUsername}`
const { data } = useGithubDataState()
const { isOnline, followers } = useGithubStatus(publicConfig.orgUsername)
const statusLabel = computed(() =>
  isOnline.value === null
    ? texts.hero.status.checking
    : isOnline.value
      ? texts.hero.status.online
      : texts.hero.status.offline,
)
const stats = computed(() => [
  { label: texts.hero.stats.repositories, value: data.value?.org.publicRepos ?? null },
  { label: texts.hero.stats.stars, value: data.value?.totalStars ?? null },
  { label: texts.hero.stats.followers, value: followers.value },
])
</script>

<template>
  <section id="top" class="hero-section relative overflow-hidden">
    <div class="wrap">
      <div
        class="grid items-center gap-6 pt-14 pb-12 md:grid-cols-[1.15fr_1fr] md:gap-2 md:pt-20 lg:pt-24 lg:pb-16"
      >
        <div class="animate-fade-in-up relative z-10">
          <Eyebrow :label="texts.hero.eyebrow" />
          <h1
            class="mt-7 text-[clamp(3rem,7vw,5.6rem)] leading-[1.04] font-semibold tracking-[-0.065em]"
          >
            <span
              v-for="(line, index) in texts.hero.titleLines"
              :key="line"
              class="block"
              :class="index === 1 ? 'text-blue-600 dark:text-blue-400' : ''"
              >{{ line }}</span
            >
          </h1>
          <p
            class="mt-7 max-w-md text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-400"
          >
            {{ texts.hero.subtitle }}
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-5">
            <BaseButton href="#repositories"
              >{{ texts.hero.primaryCta }}<IconArrowRight width="16" height="16"
            /></BaseButton>
            <a
              :href="githubOrgUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link inline-flex items-center gap-2 text-sm font-medium"
              >{{ texts.hero.secondaryCta
              }}<IconArrowRight width="13" height="13" class="-rotate-45"
            /></a>
          </div>
        </div>
        <EcosystemVisual />
      </div>
      <div
        class="flex flex-col gap-6 border-t border-slate-200 py-7 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
      >
        <div
          class="flex items-center gap-3 font-mono text-[0.65rem] text-slate-500 dark:text-slate-400"
        >
          <span
            class="size-1.5 rounded-full"
            :class="isOnline ? 'bg-emerald-500' : 'bg-slate-400'"
          />
          <span>{{ statusLabel }}</span>
        </div>
        <dl :aria-label="texts.hero.statsLabel" class="grid grid-cols-3 gap-4 sm:gap-10 lg:gap-16">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2.5"
          >
            <dd class="order-first text-2xl font-semibold tracking-tight tabular-nums">
              {{ stat.value === null ? texts.hero.statUnavailable : formatCount(stat.value) }}
            </dd>
            <dt class="text-xs text-slate-500 dark:text-slate-400">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
