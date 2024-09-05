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

        <figure class="post__main-image">
          <img
            :alt="post.mainImage.alt"
            fetchpriority="high"
            v-bind="{
              ...getImageProps({ image: post.mainImage, maxWidth: 1920 }),
            }"
          />

          <figcaption class="meta">
            {{ post.mainImage.alt }}
            <br />

            <template v-if="post.mainImage.attribution">
              Photo by
              <a
                :href="post.mainImage.attribution.url"
                v-text="post.mainImage.attribution.title"
              />
            </template>
          </figcaption>
        </figure>
      </header>

      <aside class="post__table-of-contents">
        <p id="post-toc">In this article</p>
        <TableOfContents :headings="tableOfContents" label="post-toc" />
      </aside>

      <div v-if="post.body" class="post__body rte">
        <CustomPortableText :value="post.body" />
      </div>

      <!-- TODO: Add social share links -->
      <footer class="post__footer">
        <p>Share: Permalink</p>
      </footer>
    </template>

    <p v-else>Loading</p>
  </article>

  <!-- <BlogContainer use-latest>
    <template #copy>
      <h2 v-text="'Browse Other Blog Posts'" />
    </template>
  </BlogContainer> -->
</template>

<script setup>
  import { formatDate } from '../../utils'
  import CustomPortableText from '../../components/custom-portable-text'
  import TableOfContents from '../../components/table-of-contents'
  import getImageProps from '../../utils/get-image-props'

  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")],
    _createdAt,
    _updatedAt,
    mainImage,
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

    if (!headings) {
      return []
    }

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

  const mainImage = JSON.parse(JSON.stringify(post.value.mainImage))

  // const test = getImageProps({ image: mainImage, maxWidth: 1000 })

  // console.log(test)
</script>

<style lang="scss" scoped>
  .post {
    $parent: &;
    display: grid;
    column-gap: var(--spacing-3xl);
    row-gap: var(--spacing-xl);
    grid-template-areas:
      'header'
      'sidebar'
      'post'
      'footer';
    grid-template-columns: minmax(1rem, 1fr);
    max-width: calc(86.25rem + var(--gutter) + var(--gutter)); // 1380px

    &__header {
      column-gap: var(--spacing-3xl);
      row-gap: var(--spacing-xs);
      display: grid;
      grid-template-areas:
        'title'
        'meta'
        'excerpt'
        'image';
      grid-area: header;
      grid-template-columns: minmax(1rem, 1fr);
    }

    &__title {
      grid-area: title;
    }

    &__meta {
      grid-area: meta;
      display: flex;
      flex-direction: column;
    }

    &__excerpt {
      grid-area: excerpt;
      margin-block: var(--spacing-s) var(--spacing-m);
    }

    &__main-image {
      aspect-ratio: 16/9;
      grid-area: image;
      margin: 0;

      img {
        border-radius: var(--border-radius-l);
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    &__table-of-contents {
      background-color: var(--background-raised);
      border-radius: var(--border-radius-m);
      grid-area: sidebar;
      padding: var(--spacing-m);
      align-self: start;
      top: var(--spacing-2xl);
    }

    &__body {
      grid-area: post;
    }

    &__footer {
      grid-area: footer;
    }

    @media screen and (min-width: 1024px) {
      grid-template-areas:
        'header header'
        'sidebar post'
        '. footer';
      grid-template-columns: 1fr 1.5fr;
      row-gap: var(--spacing-3xl);
      margin-block-end: var(--spacing-6xl);

      &__header {
        grid-template-areas:
          'title title'
          'meta meta'
          'excerpt excerpt'
          'image image';
        grid-template-columns: 1fr 1.5fr;
      }

      &__meta {
        align-items: center;
        flex-direction: row;
      }

      &__meta-item + #{$parent}__meta-item {
        &::before {
          content: '\2022';
          padding: 0 var(--spacing-m);
        }
      }

      &__excerpt {
        margin-block: var(--spacing-xl) var(--spacing-2xl);
      }

      &__main-image-container {
        figcaption {
          font-size: var(--text-xs);
        }
      }

      &__table-of-contents {
        position: sticky;
      }
    }

    @media screen and (min-width: 1378px) {
      grid-template-areas:
        'header header header'
        'sidebar post .'
        '. footer .';
      grid-template-columns: 1fr 2fr 1fr;

      &__header {
        grid-template-areas:
          'title title title'
          'meta meta meta'
          'excerpt excerpt .'
          'image image image';
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }

  pre {
    /**
     * TODO: Add some sort of helper or dedicated property for the background & colour here.
     */
    background-color: var(--color-neutral-8);
    color: var(--color-neutral-0);
    overflow-x: scroll;
    padding: var(--spacing-m);
  }
</style>
