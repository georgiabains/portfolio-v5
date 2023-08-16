<template>
  <div class="container gutter">
    <div v-if="project">
      <h1 v-if="project.title" class="title" v-text="project.title" />

      <SanityContent v-if="project.body" :blocks="project.body" :serializers="serializers" />

    </div>

    <div v-else>
      <p>Loading</p>
    </div>

    <p><a href="/">← Go back</a></p>
  </div>
</template>

<script lang="jsx" setup>
  const query = groq`*[_type == "project" && slug.current == $slug][0] {
    title
  }`

  const route = useRoute()

  const { data: project } = await useSanityQuery(query, { slug: route.params.slug })

  const serializers = {
    types: {
      code: (props) => {return <pre><code>{ props.code }</code></pre>}
    }
  }
</script>


<style scoped>
  .container {
    margin: 1.25rem;
  }

  .content {
    margin: 1.25rem 0;
    max-width: 24rem;
  }

  p {
    margin: 1rem 0;
  }
</style>