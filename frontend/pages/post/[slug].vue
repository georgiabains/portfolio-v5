<template>
  <div class="container">
    <div v-if="post">
      <h1 v-if="post.title" class="title" v-text="post.title" />

      <SanityContent v-if="post.body" :blocks="post.body" :serializers="serializers" />

    </div>

    <div v-else>
      <p>Loading</p>
    </div>

    <p><a href="/">← Go back</a></p>
  </div>
</template>

<script lang="jsx" setup>
  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    body
  }`

  const route = useRoute()

  const { data: post } = await useSanityQuery(query, { slug: route.params.slug })

  const serializers = {
    types: {
      code: (props) => {return <pre><code>{ props.code }</code></pre>}
    }
  }
</script>


<style>
  .container {
    margin: 2rem;
  }

  .content {
    margin: 2rem 0;
    max-width: 38rem;
  }

  p {
    margin: 1rem 0;
  }
</style>