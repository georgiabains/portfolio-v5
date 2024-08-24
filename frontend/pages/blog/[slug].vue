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

  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }`
  const route = useRoute()

  const { data: post } = await useSanityQuery(query, {
    slug: route.params.slug,
  })
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
