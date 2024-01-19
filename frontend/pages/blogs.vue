<template>
  <BlogContainer v-if="blogs" class="blogs" hide-cta :blog-array="blogs">
    <template #copy>
      <h1 class="heading margin-reset" v-text="blogsPage.title" />
    </template>
  </BlogContainer>
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'

  const postsQuery = groq`
    *[_type == "post"] | order(_createdAt desc) {
      ...,
      mainImage {
        ...,
        asset -> {
          url
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
