<template>
  <div class="container gutter">
    <div class="content">
      <section 
        v-for="(section, sectionIndex) in indexPage.sections"
        :class="sectionIndex % 2 === 0 ? 'section--even' : 'section--odd'"
      >
        <p 
          v-if="section.featuredText" 
          class="featured-text"
          v-text="section.featuredText" 
        />

        <SanityContent 
          v-if="section.blockContent" 
          :blocks="section.blockContent" 
          class="max-width--content"
        />

        <pre v-if="section.code">{{ section.code }}</pre>

        <div 
          v-if="section.indexProjectArray"
        >
          <h2 v-text="'Projects'" />

          <div class="project-container">
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

              <img 
                :alt="project.featuredImage.alt"
                class="project-card__image"
                :src="project.featuredImage.asset.url" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
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
    &--even {
      background-color: grey;
      border-radius: 0.5rem;
    }
  }

  .featured-text {
    font-size: 2.2rem;
    max-width: 740px;
  }

  .project-container {
    display: flex;
    gap: 3.2rem;
    width: 100%;
  }

  .project-card {

    &__info {
      flex-direction: column;
      display: flex;
      gap: 1rem;
      max-width: 650px;

      a {
        background-color: #3c4435;
        border: 1px solid #3c4435;
        border-radius: 0.5rem;
        color: white;
        display: inline-block;
        padding: 1.2rem 1.6rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: #fff;
          color: #3c4435;
        }
      }
    }

    &__title {
      font-size: 2.6rem;
    }

    &__image {
      border: 1px solid #3c4435;
      border-radius: 0.5em;
      margin-block-start: 1.6rem;
    }
  }
</style>
