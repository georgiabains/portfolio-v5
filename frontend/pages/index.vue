<template>
  <div class="container gutter">
    <div class="content">
      <template 
        v-for="(section, sectionIndex) in indexPage.sections"
        :key="sectionIndex"
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
          class="project-container"
        >
          <div 
            v-for="(project, projectIndex) in section.indexProjectArray"
            class="project-card"
            :key="projectIndex"
          >
            <div class="project-card__info">
              <h2 class="margin-reset" v-text="project.title" />
              <p class="margin-reset" v-text="project.description" />
            </div>

            <img 
              :alt="project.featuredImage.alt"
              class="project-card__image"
              :src="project.featuredImage.asset.url" 
            />
          </div>
        </div>
      </template>
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

  .posts {
    margin: 2rem 0;
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
      max-width: 650px;
    }

    &__image {
      border: 1px solid #4c543f;
      border-radius: 0.5em;
    }
  }
</style>
