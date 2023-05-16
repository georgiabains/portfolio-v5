<template>
  <div class="container gutter">
    <div class="posts">
      <div v-for="(post, index) in posts" :key="index">
        <h2><a :href="`/post/${post.slug.current}`" v-text="post.title" /></h2>
      </div>
    </div>

    <div class="content">
      <template v-for="(section, sectionIndex) in indexPage.sections" :key="sectionIndex">
        <SanityContent v-if="section.blockContent" :blocks="section.blockContent" />

        <pre v-if="section.code">{{ section.code }}</pre>
      </template>
    </div>
  </div>
</template>

<script setup>
  const query = groq`*[_type == "post"]`

  const { data: posts } = await useSanityQuery(query)

  const indexPageQuery = groq`*[_type == "indexPage"][0]`

  const { data: indexPage } = await useSanityQuery(indexPageQuery)
</script>

<style>
  .container {
    margin: 0 auto;
  }

  .posts {
    margin: 2rem 0;
  }
</style>
