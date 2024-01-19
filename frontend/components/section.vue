<template>
  <FeaturedText
    v-if="showFeaturedText"
    :is-first="index === 0"
    :section="section"
  />

  <section
    v-if="showProjects"
    class="section"
    :class="{ 'section--first': index === 0 }"
  >
    <ProjectContainer :project-array="section.indexProjectArray">
      <template #copy>
        <h2
          class="project-container__title margin-reset gutter"
          v-text="'Featured projects'"
        />

        <p
          class="gutter margin-reset max-width--content project-container__subheading"
          v-text="section.indexProjectCopy"
        />
      </template>
    </ProjectContainer>
  </section>

  <BlogContainer
    v-if="showBlogPosts"
    :blog-array="section.indexBlogArray"
    class="section"
    :class="{ 'section--first': index === 0 }"
    use-h3
    :use-latest="section.indexBlogUseLatest"
  >
    <template #copy>
      <h2 class="margin-reset heading" v-text="'Blog posts'" />
    </template>
  </BlogContainer>
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'
  import FeaturedText from './featured-text'
  import ProjectContainer from '~/components/projects/projects-container'

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
    if (!props.section.indexBlogUseLatest) {
      return (
        sectionData.type === 'indexBlogPosts' &&
        props.section.indexBlogArray?.length > 0
      )
    }

    return props.section.indexBlogUseLatest
  })

  /**
   * Determine if the current section is a populated Featured Text section.
   * @returns {Boolean}
   */
  const showFeaturedText = computed(() => {
    return (
      sectionData.type === 'indexFeaturedText' &&
      props.section.featuredText?.length > 0
    )
  })

  /**
   * Determine if the current section is a populated Projects Container section.
   * @returns {Boolean}
   */
  const showProjects = computed(() => {
    return (
      sectionData.type === 'indexProjects' &&
      props.section.indexProjectArray?.length > 0
    )
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
      // min-height: 73vh; // if using min height add some visual indicator that the user can scroll for more content
      min-height: calc(100vh - 16rem);
    }

    &__scroll {
      align-items: center;
      display: flex;
      gap: var(--spacing-s);
      position: relative;
      z-index: 2;
    }
  }
</style>
