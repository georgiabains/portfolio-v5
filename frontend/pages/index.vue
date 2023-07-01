<template>
  <template 
    v-for="(section, sectionIndex) in indexPage.sections"
    class="section"
    :key="section._key"
  >
    <Section :section="section" :index="sectionIndex" />
  </template>
</template>

<script setup>
  import Section from '~/components/section'

  const indexPageQuery = groq`
    *[_type == "indexPage"][0]{
      ...,
      sections[] {
        ...,
        indexProjectArray[] -> {
          title,
          slug,
          featuredImage {
            ...,
            asset -> {
              url
            }
          },
          description
        },
        indexBlogArray[] -> {
          title,
          slug,
          _createdAt,
          mainImage {
            ...,
            asset -> {
              url
            }
          }
        }
      }
    }
  `

  const { data: indexPage } = reactive(await useSanityQuery(indexPageQuery))
</script>
