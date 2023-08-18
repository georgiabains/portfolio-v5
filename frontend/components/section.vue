<template>
  <section
    v-if="showFeaturedText"
    class="section featured-text"
    :class="{ 'section--first': index === 0 }"
  >
    <div>
      <h2 class="heading margin-reset gutter">
        accessibility-focused frontend developer
      </h2>

      <div class="featured-text__grid gutter">
        <p
          v-for="text in section.featuredText"
          class="featured-text__copy"
          v-text="text"
        />
      </div>

      <p v-if="index === 0" class="section__scroll gutter">
        <nuxt-icon name="mouse" />
        Scroll to browse my work
      </p>
    </div>
  </section>

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

  <section
    v-else-if="showBlogPosts"
    class="section"
    :class="{ 'section--first': index === 0 }"
  >
    <BlogContainer
      :blog-array="section.indexBlogArray"
      use-h3
      :use-latest="section.indexBlogUseLatest"
    >
      <template #copy>
        <h2
          class="blogs-container__title margin-reset gutter"
          v-text="'blog posts'"
        />
      </template>
    </BlogContainer>
  </section>
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'
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
      min-height: calc(100vh - 15rem);
    }

    &__scroll {
      align-items: center;
      display: flex;
      gap: var(--spacing-s);
      margin-block-start: var(--spacing-5xl);
      position: relative;
      z-index: 2;
    }
  }

  .featured-text {
    margin-inline: auto;
    width: 90rem; // 1440px

    &__copy {
      font-size: var(--font-22);
      margin-block-start: var(--spacing-5xl);
    }

    &__grid {
      align-items: center;
      display: grid;
      gap: var(--spacing-5xl);

      @media screen and (min-width: 1200px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  .heading {
    font-size: var(--font-64);
  }
</style>
