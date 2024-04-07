<template>
  <article class="container post">
    <template v-if="post">
      <header>
        <h1
          v-if="post.title"
          class="heading heading--primary"
          v-text="post.title"
        />
      </header>

      <div v-if="post.body" class="post__body rte">
        <SanityContent :blocks="post.body" :serializers="serializers" />
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
  import CodeBlock from '../../components/code-block'

  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body
  }`

  const route = useRoute()

  const { data: post } = await useSanityQuery(query, {
    slug: route.params.slug,
  })

  const serializers = {
    types: {
      code: CodeBlock,
    },
  }
</script>

<style lang="scss" scoped>
  .post {
    margin-block-end: var(--spacing-6xl);

    &__body {
      max-width: var(--width-copy);
    }
  }

  pre {
    background-color: var(--color-dark-grey);
    color: var(--color-off-white);
    overflow-x: scroll;
    padding: var(--spacing-m);
  }
</style>
