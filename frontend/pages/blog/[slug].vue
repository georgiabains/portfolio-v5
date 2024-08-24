<template>
  <article class="container container--text post">
    <template v-if="post">
      <header>
        <h1
          v-if="post.title"
          class="heading heading--primary"
          v-text="post.title"
        />
      </header>

      <div class="post__content">
        <aside class="post__table-of-contents">
          <p>In this article</p>
          <TableOfContents :headings="tableOfContents" />
        </aside>

        <div v-if="post.body" class="post__body rte">
          <CustomPortableText :value="post.body" />
        </div>
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
  import CustomPortableText from '../../components/custom-portable-text'
  import TableOfContents from '../../components/table-of-contents'

  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }`
  const route = useRoute()

  const { data: post } = await useSanityQuery(query, {
    slug: route.params.slug,
  })

  const tableOfContents = computed(() => {
    return parseOutline()
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
    margin-block-end: var(--spacing-6xl);
    max-width: calc(1024px + var(--gutter) + var(--gutter));

    &__content {
      display: grid;
      gap: var(--spacing-3xl);
      grid-template-columns: 1fr 2fr;
    }

    &__table-of-contents {
      border: 1px solid var(--accent);
      margin-block-start: var(--spacing-2xl);
      padding: var(--spacing-m);
      position: sticky;
      align-self: start;
      top: var(--spacing-2xl);
    }
  }

  pre {
    background-color: var(--color-dark-grey);
    color: var(--color-off-white);
    overflow-x: scroll;
    padding: var(--spacing-m);
  }
</style>
