<template>
  <article class="container container--text post">
    <template v-if="post">
      <header class="post__header">
        <h1
          v-if="post.title"
          class="post__title heading heading--primary"
          v-text="post.title"
        />

        <div class="post__meta meta">
          <div class="post__meta-item">
            <span v-text="'Published '" />
            <time :datetime="post._createdAt" v-text="datePublished" />
          </div>

          <div class="post__meta-item">
            <span v-text="'Updated '" />
            <time :datetime="post._updatedAt" v-text="dateUpdated" />
          </div>
        </div>

        <div class="post__excerpt">
          <CustomPortableText :value="post.excerpt" />
        </div>

        <div class="post__main-image">
          <img :src="post.mainImage.asset.url" alt="" />
        </div>
      </header>

      <aside class="post__table-of-contents">
        <p>In this article</p>
        <TableOfContents :headings="tableOfContents" />
      </aside>

      <div v-if="post.body" class="post__body rte">
        <CustomPortableText :value="post.body" />
      </div>
    </template>

    <p v-else>Loading</p>
  </article>

  <BlogContainer use-latest>
    <template #copy>
      <h2 v-text="'Browse Other Blog Posts'" />
    </template>
  </BlogContainer>
</template>

<script setup>
  import { formatDate } from '../../utils'
  import CustomPortableText from '../../components/custom-portable-text'
  import TableOfContents from '../../components/table-of-contents'

  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
    _createdAt,
    _updatedAt,
    defined(mainImage) => {
      'mainImage':  {
        'asset': {
          'url': mainImage.asset -> url
        }
      }
    },
    excerpt
  }`
  const route = useRoute()

  const { data: post } = await useSanityQuery(query, {
    slug: route.params.slug,
  })

  const tableOfContents = computed(() => {
    return parseOutline()
  })

  const datePublished = computed(() => {
    return formatDate(post.value._createdAt)
  })

  const dateUpdated = computed(() => {
    return formatDate(post.value._updatedAt)
  })

  /**
   * The following helper functions are modified from Kitty Giraudel's blog post:
   * https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/
   */

  /**
   * Parse headings to format Table of Contents array.
   * @returns {Array}
   */
  function parseOutline() {
    const outline = { subheadings: [] }
    const headings = post.value.headings
    const path = []
    let lastLevel = 0

    headings.forEach((heading) => {
      const level = Number(heading.style.slice(1))
      heading.subheadings = []

      if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop()
      else if (level === lastLevel) path.pop()

      const prop = getLinkedHeading(outline, getOutlinePath(path))
      prop.subheadings.push(heading)
      path.push(prop.subheadings.length - 1)
      lastLevel = level
    })

    return outline.subheadings
  }

  /**
   * Return linked heading element given outline and path.
   * @param {Object} outline
   * @param {Array} path
   */
  function getLinkedHeading(outline, path) {
    return path.reduce((prev, curr) => prev[curr], outline)
  }

  /**
   * Return outline path.
   * @param {Array} path
   */
  function getOutlinePath(path) {
    return path.length === 0
      ? path
      : ['subheadings'].concat(path.join('.subheadings.').split('.'))
  }
</script>

<style lang="scss" scoped>
  .post {
    $parent: &;
    display: grid;
    column-gap: var(--spacing-3xl);
    grid-template-areas:
      'header'
      'sidebar'
      'post';
    grid-template-columns: 1fr;
    margin-block-end: var(--spacing-6xl);
    max-width: calc(86.25rem + var(--gutter) + var(--gutter)); // 1380px

    &__header {
      column-gap: var(--spacing-3xl);
      row-gap: var(--spacing-s);
      display: grid;
      grid-template-areas:
        'title'
        'meta'
        'excerpt'
        'image';
      grid-area: header;
      grid-template-columns: 1fr;
    }

    &__title {
      grid-area: title;
    }

    &__meta {
      grid-area: meta;
      align-items: center;
      display: flex;
    }

    &__meta-item + #{$parent}__meta-item {
      &::before {
        content: '\2022';
        padding: 0 var(--spacing-m);
      }
    }

    &__excerpt {
      grid-area: excerpt;
      margin-block: var(--spacing-xl) var(--spacing-2xl);
    }

    &__main-image {
      aspect-ratio: 16/9;
      grid-area: image;
      overflow: hidden;
      border-radius: var(--border-radius-16);

      img {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    &__table-of-contents {
      border: 1px solid var(--accent);
      border-radius: var(--border-radius-8);
      grid-area: sidebar;
      margin-block-start: var(--spacing-2xl);
      padding: var(--spacing-m);
      align-self: start;
      top: var(--spacing-2xl);
    }

    &__body {
      grid-area: post;
    }

    @media screen and (min-width: 1024px) {
      grid-template-areas:
        'header header header'
        'sidebar post .';
      grid-template-columns: 1fr 2fr 1fr;

      &__header {
        grid-template-areas:
          'title title title'
          'meta meta meta'
          'excerpt excerpt .'
          'image image image';
        grid-template-columns: 1fr 1fr 1fr;
      }

      &__table-of-contents {
        position: sticky;
      }
    }
  }

  pre {
    background-color: var(--color-dark-grey);
    color: var(--color-off-white);
    overflow-x: scroll;
    padding: var(--spacing-m);
  }
</style>
