<script setup lang="ts">
import { texts } from '../../config/texts'
const brand = useBrand()
const { data } = useGithubDataState()
</script>

<template>
  <div class="ecosystem-visual" aria-hidden="true">
    <div class="visual-grid" />
    <span class="visual-coordinate visual-coordinate-top">{{ texts.hero.diagramLabel }}</span>
    <span class="visual-cross visual-cross-top">+</span>
    <span class="visual-cross visual-cross-bottom">+</span>
    <svg class="visual-orbits" viewBox="0 0 480 480" fill="none">
      <circle cx="240" cy="240" r="180" class="orbit-outline" />
      <circle cx="240" cy="240" r="132" class="orbit-outline orbit-dashed" />
      <path d="M60 240H420M240 60V420" class="orbit-outline" />
      <g class="orbit-rotor">
        <circle
          cx="240"
          cy="240"
          r="180"
          stroke="currentColor"
          stroke-dasharray="80 1051"
          stroke-width="2"
        />
        <circle cx="420" cy="240" r="5" fill="currentColor" />
      </g>
    </svg>
    <div class="visual-core-halo" />
    <div class="visual-core">
      <img
        v-if="data?.org.avatarUrl"
        :src="getSizedAvatarUrl(data.org.avatarUrl, 160)"
        alt=""
        width="80"
        height="80"
        class="size-16 rounded-2xl sm:size-20"
      />
      <IconLogo v-else class="size-16 text-white" />
    </div>
    <div class="visual-node visual-node-source">
      <IconRepo width="16" height="16" /><span>{{ texts.hero.diagramNodes[0] }}</span>
    </div>
    <div class="visual-node visual-node-community">
      <IconFork width="16" height="16" /><span>{{ texts.hero.diagramNodes[1] }}</span>
    </div>
    <div class="visual-node visual-node-build">
      <span class="size-2 rounded-full bg-blue-500" /><span>{{ texts.hero.diagramNodes[2] }}</span>
    </div>
    <div class="visual-caption">
      <span>{{ brand }}</span
      ><span>{{ texts.hero.diagramCaption }}</span>
    </div>
  </div>
</template>
