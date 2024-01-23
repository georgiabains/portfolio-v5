<template>
  <article class="gutter post">
    <template v-if="post">
      <header>
        <h1 v-if="post.title" class="title margin-reset" v-text="post.title" />
      </header>

      <SanityContent
        v-if="post.body"
        :blocks="post.body"
        :serializers="serializers"
      />
    </template>

    <p v-else>Loading</p>
  </article>
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

  console.log(post)

  const serializers = {
    types: {
      code: CodeBlock,
    },
  }
</script>

<style scoped>
  .post {
    display: grid;
    max-width: var(--width-copy);
  }

  pre {
    background-color: var(--background-dark);
    color: var(--text-inverse);
    padding: var(--spacing-m);
  }
</style>
