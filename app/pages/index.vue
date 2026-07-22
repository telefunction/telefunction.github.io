<script setup lang="ts">
import { BRAND, texts } from '../config/texts'

// app.vue already awaited the fetch before this page renders, so the data
// (or error) is guaranteed to be settled here.
const { data } = useGithubDataState()
const ogImage = data.value?.org.avatarUrl
const githubUrl = data.value ? `https://github.com/${data.value.org.login}` : undefined

useSeoMeta({
  title: texts.meta.title,
  description: texts.meta.description,
  ogTitle: texts.meta.title,
  ogDescription: texts.meta.description,
  ogType: 'website',
  ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: texts.meta.title,
  twitterDescription: texts.meta.description,
})

useSchemaOrg([
  defineOrganization({
    name: BRAND,
    description: texts.meta.description,
    logo: ogImage,
    sameAs: githubUrl ? [githubUrl] : [],
  }),
])
</script>

<template>
  <HeroSection />
  <PinnedReposSection />
</template>
