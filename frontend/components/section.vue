<template>
  <section
    v-if="showFeaturedText"
    class="section"
    :class="{ 'section--first': index === 0 }"
  >
    <div>
      <h2 class="heading gutter gutter--heading margin-reset">
        accessibility-focused frontend developer
      </h2>

      <div class="featured-text gutter grid">
        <div>
          <p
            v-for="text in section.featuredText"
            class="featured-text__copy"
            v-text="text"
          />

          <p v-if="index === 0" class="section__scroll">
            <nuxt-icon name="mouse" />
            Scroll to browse my work
          </p>
        </div>

        <div class="featured-text__image">
          <svg
            style="visibility: hidden; position: absolute"
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <filter id="round">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
          <img
            alt="Computer desk with lamp and tea."
            src="https://images.unsplash.com/photo-1601642964568-1917224f4e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
      </div>
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
          class="project-container__title margin-reset gutter gutter--heading"
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
          class="blogs-container__title margin-reset gutter gutter--heading"
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
    padding-block-end: 2.5rem;
    padding-block-start: 2.5rem;

    &--first {
      padding-block-start: 0;
      justify-content: flex-start;
      // min-height: 73vh; // if using min height add some visual indicator that the user can scroll for more content
      min-height: calc(100vh - 5rem);
    }

    &__scroll {
      align-items: center;
      display: flex;
      gap: 1rem;
      margin-block-start: 6rem;
      position: relative;
      z-index: 2;
    }
  }

  .featured-text {
    margin-block-start: var(--spacing-5xl);

    &__copy {
      font-size: var(--font-22);
    }

    &__image {
      filter: url(#round);
      max-width: 35rem; // 560px
      justify-self: end;
    }

    img {
      clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
    }

    @media screen and (min-width: 700px) {
      &__image {
        margin-block-start: -7.5rem;
      }
    }

    @media screen and (min-width: 1200px) {
      &__image {
        margin-block-start: 0;
        max-width: 40rem; // 640px
      }
    }
  }

  .heading {
    font-size: var(--font-64);
  }

  .grid {
    align-items: center;
    display: grid;
    gap: var(--spacing-5xl);

    @media screen and (min-width: 1200px) {
      grid-template-columns: 1fr 1.5fr;
    }
  }
</style>
