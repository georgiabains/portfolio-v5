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
          excerpt,
          _createdAt,
          mainImage,
          defined(tags) => {
            'tags': tags[] -> {
              'slug': slug.current,
              title
            }
          }
        },
        featuredBlogPost -> {
          title,
          slug,
          _createdAt,
          mainImage,
          excerpt,
          defined(tags) => {
            'tags': tags[] -> {
              'slug': slug.current,
              title
            }
          }
        }
      }
    }
  `

  const { data: indexPage } = reactive(await useSanityQuery(indexPageQuery))
</script>
