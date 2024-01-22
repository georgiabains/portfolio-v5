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

<script lang="jsx" setup>
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
      code: (props) => {
        return (
          <pre>
            <code>{props.code}</code>
          </pre>
        )
      },
    },
  }
</script>

<style scoped>
  .post {
    display: grid;
    max-width: var(--width-copy);
  }
</style>
