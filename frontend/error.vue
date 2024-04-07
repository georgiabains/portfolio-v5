// layouts/error.vue
<template>
  <main>
    <div class="layout">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'error',
    props: {
      error: {
        type: Object,
      },
    },
  }
</script>

<style scoped>
  main {
    min-height: 100vh;
  }

  .layout {
    align-items: center;
    display: grid;
    height: 100%;
  }
</style>
