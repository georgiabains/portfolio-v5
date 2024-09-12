<template>
  <FeaturedText
    v-if="showFeaturedText"
    :is-first="index === 0"
    :section="section"
  />

  <BlogContainer
    v-if="showBlogPosts"
    :blog-array="section.blogArray"
    class="section"
    :class="{ 'section--first': index === 0 }"
    use-h3
    :use-latest="section.useLatest"
  >
    <template #copy>
      <h2 class="heading" v-text="section.title" />
    </template>
  </BlogContainer>

  <FeaturedBlog v-if="showFeaturedBlog" :section="section" class="section" />
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'
  import FeaturedBlog from './featured-blog'
  import FeaturedText from './featured-text'

  /**
   * Props.
   */
  const props = defineProps({
    index: {
      type: Number,
    },
    section: {
      type: Object,
    },
  })

  /**
   * Reactive.
   */
  const sectionData = reactive({
    type: props.section._type,
  })

  /**
   * Determine if the current section is a populated Blogs Container section.
   * @returns {Boolean}
   */
  const showBlogPosts = computed(() => {
    if (!props.section.useLatest) {
      return (
        sectionData.type === 'selectedBlogs' &&
        props.section.blogArray?.length > 0
      )
    }

    return props.section.useLatest
  })

  /**
   * Determine if the current section is a populated Featured Blog section.
   * @returns {Boolean}
   */
  const showFeaturedBlog = computed(() => {
    return Boolean(
      sectionData.type === 'featuredBlog' && props.section.featuredBlogPost
    )
  })

  /**
   * Determine if the current section is a populated Featured Text section.
   * @returns {Boolean}
   */
  const showFeaturedText = computed(() => {
    return sectionData.type === 'featuredText' && props.section.text?.length > 0
  })
</script>

<style lang="scss">
  .section {
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block: var(--spacing-3xl);

    &--first {
      padding-block-start: 0;
      justify-content: flex-start;
    }

    &__scroll {
      align-items: center;
      display: flex;
      gap: var(--spacing-s);
      position: relative;
      z-index: 2;
    }

    @media screen and (min-width: 1024px) {
      padding-block: var(--spacing-5xl);

      &--first {
        padding-block-start: 0;
      }

      &__scroll {
        font-size: var(--text-s);
      }
    }
  }
</style>
