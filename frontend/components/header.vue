<template>
  <header class="header gutter">
    <h1 
      v-if="route.name === 'index'" 
      class="header__title margin-reset"
      v-text="'Georgia Bains'" 
    />

    <h2 
      v-else 
      class="header__title margin-reset"
      v-text="'Georgia Bains'" 
    />
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

  const route = useRoute()
</script>


<style scoped lang="scss">
  .header {
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 30vh;
    position: relative;
    z-index: 1;
  
    &__title {
      font-size: 3.6rem;
      font-weight: 400;
    }
  }
</style>