<template>
  <BlogContainer v-if="blogs" class="blogs" hide-cta :blog-array="blogs">
    <template #copy>
      <h1
        id="content"
        class="heading heading--primary"
        v-text="blogsPage.title"
      />
    </template>
  </BlogContainer>
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'

  const postsQuery = groq`
    *[
      _type == "post"
      && (defined(slug))
      && (defined(mainImage))
    ] | order(_createdAt desc) {
      ...,
      defined(slug) => {
        'slug': slug
      },
      mainImage,
      defined(tags) => {
        'tags': tags[] -> {
          'slug': slug.current,
          title
        }
      }
    }
  `

  const blogsPageQuery = groq`
    *[_type == "blogs"][0]{
      ...
    }
  `

  const { data: blogs } = await useSanityQuery(postsQuery)
  const { data: blogsPage } = await useSanityQuery(blogsPageQuery)
</script>
