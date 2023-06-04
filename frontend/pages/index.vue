<template>
  <section 
    v-for="(section, sectionIndex) in indexPage.sections"
    class="section"
  >
    <div v-if="section.featuredText" class="gutter">
      <p
        v-for="(text) in section.featuredText"
        class="featured-text"
        v-text="text" 
      />
    </div>

    <p 
      v-if="sectionIndex === 0"
      class="gutter section__scroll"
    >
      <nuxt-icon name="mouse" />
      Scroll to browse my work
    </p>

    <SanityContent 
      v-if="section.blockContent" 
      :blocks="section.blockContent" 
      class="max-width--content gutter"
    />

    <pre v-if="section.code">{{ section.code }}</pre>

    <ProjectContainer 
      v-if="section.indexProjectArray" 
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
</template>

<script setup>
  import ProjectContainer from '~/components/projects/container'

  const indexPageQuery = groq`
    *[_type == "indexPage"][0]{
      ...,
      sections[] {
        ...,
        indexProjectArray[] -> {
          title,
          slug,
          featuredImage{
            ...,
            asset -> {
              url
            }
          },
          description
        }
      }
    }
  `

  const { data: indexPage } = await useSanityQuery(indexPageQuery)
</script>

<style scoped lang="scss">
  .container {
    margin: 0 auto;
  }

  .section {
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block-end: 4rem;
    padding-block-start: 4rem;

    &:first-child {
      justify-content: flex-start;
      min-height: 73vh; // if using min height add some visual indicator that the user can scroll for more content
    }

    &--even {
      background-color: #d9efd4;
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

  .project-card {
    display: flex;
    gap: 6rem;

    &__info {
      flex-direction: column;
      display: flex;
      gap: 1rem;
      width: 30%;

      p {
        font-size: 1.8rem;
      }

      a {
        border-bottom: 1px solid var(--text-link);
        color: var(--text-link);
        display: inline-block;
        // font-family: 'PT Mono', monospace;
        margin-block-start: 2rem;
        padding-block-end: 0.4rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: #fff;
          color: #000;
        }
      }
    }

    &__title {
      font-family: 'PT Mono', monospace;
      font-size: 2.2rem;
    }

    &__image {
      overflow: hidden;
      width: 70%;

      img {
        border: 1px solid var(--border);
        border-radius: 1rem;
        height: 100%;
      }
    }
  }
</style>
