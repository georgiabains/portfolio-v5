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

    <SanityContent 
      v-if="section.blockContent" 
      :blocks="section.blockContent" 
      class="max-width--content gutter"
    />

    <pre v-if="section.code">{{ section.code }}</pre>

    <div 
      v-if="section.indexProjectArray"
      class="project-container"
    >
      <h2 
        class="project-container__title margin-reset gutter--heading" 
        v-text="'Featured projects'" 
      />

      <p 
        class="gutter margin-reset max-width--content project-container__subheading" 
        v-text="section.indexProjectCopy" 
      />

      <div class="gutter project-container__projects">
        <div 
          v-for="(project, projectIndex) in section.indexProjectArray"
          class="project-card"
          :key="projectIndex"
        >
          <div class="project-card__info">
            <h3 class="margin-reset project-card__title" v-text="project.title" />
            <p class="margin-reset" v-text="project.description" />
            <p class="margin-reset">
              <a 
                :href="`/project/${project.slug.current}`" 
                v-text="`Read ${project.title} case study`"
              />
            </p>
          </div>

          <div class="project-card__image">
            <img 
              :alt="project.featuredImage.alt"
              :src="project.featuredImage.asset.url" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
  }

  .featured-text {
    font-size: 2.2rem;
    max-width: 740px;
  }

  .project-container {
    margin-block-start: 2rem;

    &__title {
      align-items: center;
      display: flex;
      font-size: 6rem;
      gap: 1rem;
      justify-content: flex-start;
      text-transform: lowercase;

      span {
        flex-shrink: 0;
      }
    }

    &__subheading {
      display: none;
      margin: 1.0rem 0;
    }

    &__projects {
      display: flex;
      flex-direction: column;
      gap: 10rem;
      padding-block-end: 4rem;
      padding-block-start: 4rem;
      width: 100%;
    }
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
