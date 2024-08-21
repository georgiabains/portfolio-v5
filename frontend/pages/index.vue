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
        blogArray[] -> {
          title,
          slug,
          _createdAt,
          mainImage {
            ...,
            asset -> {
              url
            }
          }
        },
        featuredBlogPost -> {
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
