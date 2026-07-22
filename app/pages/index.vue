<script setup lang="ts">
import { texts } from '../config/texts'

// app.vue already awaited the fetch, so data/error is settled by now.
const brand = useBrand()
const { data } = useGithubDataState()
const ogImage = data.value?.org.avatarUrl
const githubUrl = data.value ? `https://github.com/${data.value.org.login}` : undefined

const title = `${brand.value} — ${texts.meta.titleSuffix}`
const description = texts.meta.description(brand.value)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
})

useSchemaOrg([
  defineOrganization({
    name: brand.value,
    description,
    logo: ogImage,
    sameAs: githubUrl ? [githubUrl] : [],
  }),
])
</script>

<template>
  <HeroSection />
  <PinnedReposSection />
  <WebsitesSection />
</template>
