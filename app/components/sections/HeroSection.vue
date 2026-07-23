<script setup lang="ts">
import { texts } from '../../config/texts'

const { public: publicConfig } = useRuntimeConfig()
const githubOrgUrl = `https://github.com/${publicConfig.orgUsername}`

const brand = useBrand()
const { data } = useGithubDataState()
const org = computed(() => data.value?.org ?? null)

const { isOnline, followers } = useGithubStatus(publicConfig.orgUsername)
const statusLabel = computed(() => {
  if (isOnline.value === null) return texts.hero.status.checking
  return isOnline.value ? texts.hero.status.online : texts.hero.status.offline
})

const stats = computed(() => [
  { label: texts.hero.stats.repositories, value: org.value?.publicRepos ?? null },
  { label: texts.hero.stats.stars, value: data.value?.totalStars ?? null },
  { label: texts.hero.stats.followers, value: followers.value },
])

function formatStat(value: number | null) {
  return value === null ? texts.hero.statUnavailable : formatCount(value)
}
</script>

<template>
  <section id="top" class="bg-grid relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-140 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.16),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(96,165,250,0.22),transparent_70%)]"
    />

    <div class="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div>
        <Eyebrow :label="texts.hero.eyebrow" class="animate-fade-in-up" />

        <h1
          class="animate-fade-in-up mt-5 text-5xl leading-[1.05] font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-[3.4rem] dark:text-white"
        >
          <span
            v-for="(line, index) in texts.hero.titleLines"
            :key="line"
            class="block"
            :class="
              index === 0
                ? 'bg-linear-to-r from-slate-950 via-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-blue-300'
                : ''
            "
          >
            {{ line }}
            <span
              v-if="index === texts.hero.titleLines.length - 1"
              class="animate-blink inline-block h-[0.8em] w-[0.5ch] translate-y-[0.1em] bg-blue-600 align-middle dark:bg-blue-400"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p
          class="animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {{ texts.hero.subtitle }}
        </p>

        <div class="animate-fade-in-up mt-8 flex flex-wrap gap-3.5">
          <BaseButton :href="githubOrgUrl" variant="primary" external>
            {{ texts.hero.primaryCta }}
          </BaseButton>
        </div>
      </div>

      <div class="animate-fade-in-up relative">
        <div
          class="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-[0_20px_60px_-20px_rgba(0,10,60,0.15)] dark:border-blue-400/15 dark:bg-slate-900 dark:shadow-[0_20px_60px_-20px_rgba(0,10,60,0.6)]"
        >
          <div
            class="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-transparent via-blue-500/10 to-transparent"
          />

          <div
            class="flex items-center gap-1.5 border-b border-slate-200 px-5 py-3.5 dark:border-white/10"
          >
            <span class="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span class="h-2 w-2 rounded-full bg-blue-600/60 dark:bg-blue-400/60" />
            <span class="h-2 w-2 rounded-full bg-blue-600/30 dark:bg-blue-400/30" />
            <span class="ml-3 font-mono text-xs text-slate-500 dark:text-slate-500">
              {{ publicConfig.orgUsername }}/{{ texts.hero.statusLabel }}
            </span>
          </div>

          <div class="flex items-center gap-4 px-6 pt-6">
            <img
              v-if="org?.avatarUrl"
              :src="org.avatarUrl"
              :alt="brand"
              draggable="false"
              class="h-14 w-14 shrink-0 rounded-xl border border-slate-200 select-none dark:border-white/10"
            />
            <div v-else class="h-14 w-14 shrink-0 rounded-xl bg-blue-600/10 dark:bg-blue-400/10" />
            <div>
              <p class="font-mono text-lg font-bold text-slate-950 dark:text-white">
                {{ brand }}
              </p>
              <p
                class="mt-1 inline-flex items-center gap-1.5 font-mono text-xs"
                :class="
                  isOnline
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-500 dark:text-slate-500'
                "
              >
                <span class="relative flex h-1.5 w-1.5">
                  <span
                    v-if="isOnline"
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"
                  />
                  <span
                    class="relative inline-flex h-1.5 w-1.5 rounded-full"
                    :class="
                      isOnline ? 'bg-blue-600 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-600'
                    "
                  />
                </span>
                {{ statusLabel }}
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-3 gap-px px-6 py-6">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-1">
              <dt
                class="font-mono text-[0.68rem] tracking-wide text-slate-500 uppercase dark:text-slate-500"
              >
                {{ stat.label }}
              </dt>
              <dd class="font-mono text-2xl font-bold text-slate-950 dark:text-white">
                {{ formatStat(stat.value) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
