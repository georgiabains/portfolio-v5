<template>
  <BlogContainer v-if="blogs" class="blogs" hide-cta :blog-array="blogs">
    <template #copy>
      <h1
        class="heading heading--primary"
        v-text="`All Posts Tagged: ${title}`"
      />
    </template>
  </BlogContainer>
</template>

<script setup>
  import BlogContainer from '~/components/blog/blog-container'

  const taggedWithBlogsQuery = groq`
    *[
      _type == "category"
      && slug.current == $tag
    ] {
      title,
      "posts": *[
        _type == "post" 
        && references(^._id)
      ] | order(_createdAt desc) {
        title,
        excerpt,
        slug,
        _createdAt,
        defined(mainImage) => {
          'mainImage':  {
            'asset': {
              'url': mainImage.asset -> url
            }
          }
        },
      }
    }
  `

  const route = useRoute()

  const { data: taggedWithBlogs } = await useSanityQuery(taggedWithBlogsQuery, {
    tag: route.params.slug,
  })

  const title = taggedWithBlogs.value[0].title
  const blogs = taggedWithBlogs.value[0].posts
</script>
