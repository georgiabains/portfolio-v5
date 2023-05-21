<template>
  <div class="container gutter">
    <div class="content">
      <template v-for="(section) in indexPage.sections">
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

        <div v-if="section.indexProjectArray">
          <div v-for="(project) in section.indexProjectArray">
            <h2 v-text="project.title" />
            <img 
              :alt="project.featuredImage.alt"
              :src="project.featuredImage.asset.url" 
            />
            <p v-text="project.description" />
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

<style scoped>
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
</style>
