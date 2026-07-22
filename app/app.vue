<script setup lang="ts">
// Owns the one GitHub data fetch for the whole app — every layout/page
// component below reads the result via useGithubDataState() instead of
// triggering its own fetch. See app/composables/useGithubData.ts.
await useGithubData()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
