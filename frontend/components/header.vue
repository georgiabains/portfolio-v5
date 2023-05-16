<template>
  <header class="gutter">
    <h1>Georgia Bains</h1>
  </header>
</template>

<script setup>
const title = ref('Georgia Bains Portfolio')
const description = ref('My portfolio of web development work.')

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})
</script>


<style>
  h1 {
    font-weight: 400;
  }
</style>