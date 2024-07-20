<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { page, frontmatter } = useData()
 

const { Layout } = DefaultTheme



</script>

<template>
  <Layout>
    <template #doc-top> 
        <div v-if="!frontmatter.hideAdContent">
          <GoogleAdsense />
        </div>
    </template>
  </Layout>
</template>