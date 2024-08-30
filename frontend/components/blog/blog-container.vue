<template>
  <section class="blogs-container container">
    <slot name="copy"></slot>

    <ul class="blogs-container__blogs list--unstyled">
      <li
        v-for="(blog, blogIndex) in blogPosts"
        :key="blogIndex"
        class="blogs-container__blog"
      >
        <BlogCard :blog="blog" :use-h3="useH3" />
      </li>
    </ul>

    <p v-if="!hideCta" class="blogs-container__cta-container">
      <a href="/blogs" class="blogs-container__cta bubble">
        <Icon name="custom:eye" aria-hidden="true" />
        View all blog posts
      </a>
    </p>
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
      *[
        _type == "post"
        && (defined(slug))
        && (defined(mainImage))
      ] | order(_createdAt desc)[0..2]  {
        title,
        defined(slug) => {
          'slug': slug
        },
        excerpt,
        _createdAt,
        defined(mainImage) => {
          'mainImage':  {
            'asset': {
              'url': mainImage.asset -> url
            }
          }
        },
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
    display: grid;
    gap: var(--spacing-l);
    padding-block: var(--spacing-3xl);

    &__blogs {
      display: grid;
      grid-auto-rows: 1fr;
      grid-template-columns: 1fr;
      gap: var(--spacing-5xl);
      justify-content: space-between;
    }

    &__blog {
      display: flex;
    }

    &__cta {
      align-items: center;
      display: inline-flex;
      gap: var(--spacing-m);
    }

    @media screen and (min-width: 1024px) {
      &__blogs {
        gap: var(--spacing-4xl);
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
</style>
