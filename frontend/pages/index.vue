<template>
  <div class="container">
    <div class="content">
      <section 
        v-for="(section, sectionIndex) in indexPage.sections"
        class="section"
        :class="sectionIndex % 2 === 0 ? 'section--even' : 'section--odd'"
      >
        <div class="gutter">
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
            <h2 class="margin-reset" v-text="'Projects'" />

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

                <div class="project-card__image">
                  <img 
                    :alt="project.featuredImage.alt"
                    :src="project.featuredImage.asset.url" 
                  />
                </div>
              </div>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 50vh;
    padding-block-end: 6rem;
    padding-block-start: 6rem;

    &:first-child {
      justify-content: flex-start;
      min-height: 70vh;
    }

    &--even {
      background-color: #e3e9de;
    }
  }

  .featured-text {
    font-size: 2.2rem;
    max-width: 740px;
  }

  .project-container {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    padding: 10rem 0;
    width: 100%;
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
        border-bottom: 1px solid #1F2614;
        color: #000;
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
      border: 1px solid #1F2614;
      border-radius: 0.5em;
      overflow-x: hidden;
      width: 70%;
    }
  }
</style>
