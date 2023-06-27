<template>
  <article class="blog-card">
    {{ blog.title }}
  </article>
</template>

<script setup>
  const props = defineProps({
    blog: {
      type: [Object],
    }
  })
</script>

<style lang="scss">
  .blog-card {
    border: 1px solid red;
  }
</style>