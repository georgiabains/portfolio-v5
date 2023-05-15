<template>
  <div class="container gutter">
    <div class="posts">
      <div v-for="(post, index) in posts" :key="index">
        <h2><a :href="`/post/${post.slug.current}`" v-text="post.title" /></h2>
      </div>
    </div>
  </div>
</template>

<script setup>
  const query = groq`*[_type == "post"]`

  const { data: posts } = await useSanityQuery(query)
</script>

<style>
  .container {
    margin: 0 auto;
  }

  .posts {
    margin: 2rem 0;
  }
</style>
