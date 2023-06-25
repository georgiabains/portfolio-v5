<template>
  <header class="header">
    <div class="header__container gutter">
      <h1 
        v-if="route.name === 'index'" 
        class="header__title margin-reset"
      >
        <a href="/" v-text="'Georgia Bains'" />
      </h1>

      <h2 
        v-else 
        class="header__title margin-reset"
      >
        <a href="/" v-text="'Georgia Bains'" />
      </h2>

      <nav class="header__navigation">
        <ul class="list--unstyled">
          <li><a href="/about">about</a></li>
          <li><a href="/projects">projects</a></li>
          <li><a href="/blog">blog</a></li>
        </ul>
      </nav>
    </div>
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
    min-height: 27vh;
    position: relative;
    z-index: 1;

    &__container {
      align-items: baseline;
      display: flex;
      gap: 3.6rem;
    }
  
    &__title {
      font-size: 3.6rem;
      font-weight: 400;

      a {
        text-decoration: none;
      }
    }

    &__navigation > ul {
      display: flex;
      font-family: 'PT Mono', monospace;
      font-size: 2.2rem;
      gap: 2rem;

      a {
        border-bottom: 2px solid var(--text-link);
        padding-block-end: 0.2rem;
        text-decoration: none;

        &:hover {
          border-bottom: 2px solid var(--text);
        }
      }
    }
  }
</style>