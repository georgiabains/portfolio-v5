<template>
  <article class="blog-card">
    <component :is="useH3 ? 'h3' : 'h2'">
      <span v-text="blog.title" />
    </component>
  </article>
</template>

<script setup>
  const props = defineProps({
    blog: {
      type: [Object],
    },
    useH3: {
      type: Boolean,
      default: false,
    }
  })
</script>

<style lang="scss">
  .blog-card {
    border: 1px solid red;
  }
</style>