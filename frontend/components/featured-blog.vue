<template>
  <section class="container featured-blog">
    <h2 class="featured-blog__title heading" v-text="section.title"></h2>
    <BlogCard :blog="section.indexFeaturedBlogPost" is-featured />
  </section>
</template>

<script setup>
  import BlogCard from './blog/blog-card'

  /**
   * Props.
   */
  const props = defineProps({
    section: {
      type: [Object],
      required: true,
    },
  })
</script>

<style lang="scss">
  .featured-blog {
    &__title {
      margin-block-end: var(--spacing-m);
    }
  }
</style>
