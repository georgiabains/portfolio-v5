<template>
  <BlogContainer v-if="blogs" class="blogs" hide-cta :blog-array="blogs">
    <template #copy>
      <h1 id="content" class="heading heading--primary" v-text="title" />
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
        mainImage,
        defined(tags) => {
          'tags': tags[] -> {
            'slug': slug.current,
            title
          }
        }
      }
    }
  `

  const route = useRoute()

  const { data: taggedWithBlogs } = await useSanityQuery(taggedWithBlogsQuery, {
    tag: route.params.slug,
  })

  const tag = taggedWithBlogs.value[0].title
  const title = `All Posts Tagged: ${tag}`
  const blogs = taggedWithBlogs.value[0].posts

  useHead({
    title,
  })

  route.meta.title = title
</script>
