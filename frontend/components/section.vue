<template>
  <section 
    v-if="showFeaturedText" 
    class="gutter section"
    :class="{ 'section--first': index === 0 }"
  >
    <p
      v-for="(text) in section.featuredText"
      class="featured-text"
      v-text="text" 
    />
  
    <p 
      v-if="index === 0"
      class="section__scroll"
    >
      <nuxt-icon name="mouse" />
      Scroll to browse my work
    </p>
  </section>

  <section 
    v-if="showProjects"
    class="section"
    :class="{ 'section--first': index === 0 }"
  >
    <ProjectContainer
      :project-array="section.indexProjectArray"
    >
      <template #copy>
        <h2 
          class="project-container__title margin-reset gutter--heading" 
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
      :use-latest="section.indexBlogUseLatest"
    >
      <template #copy>
        <h2 
          class="blogs-container__title margin-reset gutter--heading" 
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
      type: Number
    },
    section: {
      type: Object,
    }
  })

  /**
   * Reactive.
   */
  const sectionData = reactive({
    type: props.section._type
  })

  /**
   * Determine if the current section is a populated Blogs Container section.
   * @returns {Boolean}
   */
  const showBlogPosts = computed(() => {
    if (!props.section.indexBlogUseLatest) {
      return sectionData.type === 'indexBlogPosts' 
        && props.section.indexBlogArray?.length > 0
    }

    return props.section.indexBlogUseLatest
  })

  const getLatestBlogPosts = async () => {
    const latestBlogsQuery = groq`
      *[_type == "post"][0..2] {
        title,
        body
      }
    `

    const { data: latestBlogs } = await useSanityQuery(latestBlogsQuery)

    console.log(latestBlogs)

    return latestBlogs
  }

  /**
   * Determine if the current section is a populated Featured Text section.
   * @returns {Boolean}
   */
  const showFeaturedText = computed(() => {
    return sectionData.type === 'indexFeaturedText' 
      && props.section.featuredText?.length > 0
  })

  /**
   * Determine if the current section is a populated Projects Container section.
   * @returns {Boolean}
   */
  const showProjects = computed(() => {
    return sectionData.type === 'indexProjects' 
      && props.section.indexProjectArray?.length > 0
  })
</script>

<style lang="scss">
  .section {
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block-end: 4rem;
    padding-block-start: 4rem;

    &--first {
      justify-content: flex-start;
      min-height: 73vh; // if using min height add some visual indicator that the user can scroll for more content
    }

    &__scroll {
      align-items: center;
      display: flex;
      gap: 1rem;
      margin-block-start: 10rem;
    }
  }

  .featured-text {
    font-size: 2.2rem;
    max-width: 740px;
  }
</style>