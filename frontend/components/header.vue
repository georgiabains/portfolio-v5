<template>
  <header class="header">
    <div class="header__container gutter">
      <component
        :is="route.name === 'index' ? 'h1' : 'h2'"
        class="header__title margin-reset"
      >
        <a href="/" v-text="'Georgia Bains'" />
      </component>

      <nav class="header__navigation">
        <ul class="list--unstyled">
          <li><a href="/about">about</a></li>
          <li><a href="/blogs">blog</a></li>
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
      lang: 'en',
    },
    title,
    meta: [
      {
        name: 'description',
        content: description,
      },
    ],
  })

  const route = useRoute()
</script>

<style scoped lang="scss">
  .header {
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-block: var(--spacing-7xl);
    position: relative;
    z-index: 1;

    &__container {
      align-items: center;
      flex-direction: column;
      display: flex;
      gap: var(--spacing-4xl);
    }

    &__title {
      font-size: var(--font-32);
      font-weight: 400;

      a {
        text-decoration: none;
      }
    }

    &__navigation > ul {
      display: flex;
      font-size: var(--font-20);
      gap: var(--spacing-l);

      a {
        align-items: center;
        border: 1px solid var(--text-link);
        border-radius: var(--border-radius-22);
        display: flex;
        flex-direction: column;
        padding-block: var(--spacing-2xs);
        padding-inline: var(--spacing-m);
        position: relative;
        text-decoration: none;

        &:hover {
          background-color: var(--secondary);
          border-color: var(--secondary);
        }
      }
    }

    @media screen and (min-width: 960px) {
      &__container {
        flex-direction: row;
      }
    }
  }
</style>
