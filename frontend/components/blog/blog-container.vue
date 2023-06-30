<template>
  <div class="blogs-container">
    <slot name="copy"></slot>

    <div class="gutter blogs-container__projects">
      <BlogCard 
        v-for="(blog, blogIndex) in blogPosts" 
        :key="blogIndex"
        :blog="blog" 
      />
    </div>

    <div v-if="!hideCta" class="gutter">
      <p class="blogs-container__cta">
        <nuxt-icon name="eye" />
        <a href="/blog">View all blog posts</a>
      </p>
    </div>
  </div>
</template>

<script setup>
  import BlogCard from './blog-card'

  /**
   * Props.
   */
  const props = defineProps({
    blogArray: {
      type: [Array],
    },
    hideCta: {
      type: Boolean,
      default: false,
    },
    useLatest: {
      type: Boolean,
      default: false,
    }
  })


  /**
   * Get the 3 latest blog posts.
   * @returns {Array}
   */
  const getLatestBlogPosts = () => {
    const latestBlogsQuery = groq`
      *[_type == "post"][0..2] | order(_createdAt desc) {
        title,
        body
      }
    `

    const { data: latestBlogs } = useSanityQuery(latestBlogsQuery)

    return latestBlogs
  }

  /**
   * Choose which blog array to render based on if the user selected the 'use
   * latest' option in Sanity.
   * - Query for latest blogs is only performed if the user did select to use
   *   the latest blogs.
   */
  const blogPosts = props.useLatest ? getLatestBlogPosts() : props.blogArray
</script>

<style lang="scss">
  .blogs-container {
    margin-block-start: 2rem;

    &__title {
      align-items: center;
      display: flex;
      font-size: 6rem;
      gap: 1rem;
      justify-content: flex-start;
      text-transform: lowercase;

      span {
        flex-shrink: 0;
      }
    }

    &__subheading {
      display: none;
      margin: 1.0rem 0;
    }

    &__projects {
      display: flex;
      flex-direction: column;
      gap: 10rem;
      padding-block-end: 6rem;
      padding-block-start: 6rem;
      width: 100%;
    }

    &__cta {
      align-items: center;
      display: flex;
      gap: 1rem;

      a {
        border-bottom: 1px solid var(--text);
        color: var(--text);
        text-decoration: none;
      }
    }
  }
</style>