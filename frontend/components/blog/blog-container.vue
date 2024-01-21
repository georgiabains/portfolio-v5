<template>
  <section class="blogs-container gutter">
    <slot name="copy"></slot>

    <ul class="blogs-container__blogs list--unstyled">
      <li v-for="(blog, blogIndex) in blogPosts" :key="blogIndex">
        <BlogCard :blog="blog" :use-h3="useH3" />
      </li>
    </ul>

    <div v-if="!hideCta">
      <p class="blogs-container__cta">
        <nuxt-icon name="eye" />
        <a href="/blog">View all blog posts</a>
      </p>
    </div>
  </section>
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
    useH3: {
      type: Boolean,
      default: false,
    },
    useLatest: {
      type: Boolean,
      default: false,
    },
  })

  /**
   * Get the 3 latest blog posts.
   * @returns {Array}
   */
  const getLatestBlogPosts = () => {
    const latestBlogsQuery = groq`
      *[_type == "post"][0..2] | order(_createdAt desc) {
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
    &__blogs {
      display: grid;
      grid-template-columns: auto;
      gap: var(--spacing-5xl);
      justify-content: space-between;
      margin-block: var(--spacing-3xl) var(--spacing-5xl);
    }

    &__cta {
      align-items: center;
      display: flex;
      gap: var(--spacing-m);

      a {
        border-bottom: 1px solid var(--text);
        color: var(--text);
        text-decoration: none;
      }
    }

    @media screen and (min-width: 960px) {
      &__blogs {
        gap: var(--spacing-4xl);
        grid-template-columns: auto auto;
      }
    }

    @media screen and (min-width: 1520px) {
      &__blogs {
        grid-template-columns: auto auto auto;
      }
    }
  }
</style>
