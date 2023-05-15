<template>
  <div class="container">
    <div>
      <h1 class="title">My Blog</h1>
    </div>
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
    margin: 2rem;
  }

  .posts {
    margin: 2rem 0;
  }
</style>
