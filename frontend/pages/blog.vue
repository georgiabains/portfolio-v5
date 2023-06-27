<template>
  <BlogContainer 
    v-if="blogs"
    hide-cta
    :blog-array="blogs"
  >
    <template #copy>
      <h1 
        class="blogs-container__title margin-reset gutter--heading" 
        v-text="'All blog posts'" 
      />
    </template>
  </BlogContainer>
</template>

<script setup>
  import BlogContainer from '~/components/blog/container'

  const postsQuery = groq`
    *[_type == "post"]{
      ...
    }
  `

  const { data: blogs } = await useSanityQuery(postsQuery)
</script>

<style lang="scss">
  .blogs {
    &__title {
      font-size: 6rem;
      text-transform: lowercase;
    }
  }
</style>
