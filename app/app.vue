<script setup lang="ts">
// Fetches GitHub data once; every component below reads it via
// useGithubDataState() instead of triggering its own fetch.
await useGithubData()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
