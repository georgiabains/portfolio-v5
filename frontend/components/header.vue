<template>
  <header class="header">
    <div class="header__container gutter">
      <h1 v-if="route.name === 'index'" class="header__title margin-reset">
        <a href="/" v-text="'Georgia Bains'" />
      </h1>

      <h2 v-else class="header__title margin-reset">
        <a href="/" v-text="'Georgia Bains'" />
      </h2>

      <nav class="header__navigation">
        <ul class="list--unstyled">
          <li><a href="/about">about</a></li>
          <li><a href="/projects">projects</a></li>
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
    padding-block: var(--gutter);
    position: relative;
    z-index: 1;

    &__container {
      align-items: baseline;
      flex-direction: column;
      display: flex;
      gap: var(--spacing-3xl);
      justify-content: space-between;
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
      font-size: var(--font-18);
      gap: var(--spacing-l);

      a {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding-block: var(--spacing-2xs);
        padding-inline: var(--spacing-xs);
        position: relative;
        text-decoration: none;

        &::after {
          @include negative(bottom, var(--spacing-2xs));
          content: '';
          mask: url("data:image/svg+xml,%3Csvg version='1.1' id='squiggly-line-svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 64 12' fill='none'%3E%3Cpath stroke-width='2' d='M-1,6c0,0,8-8,16,0s16,0,16,0s8-8,16,0s16,0,16,0s8-8,16,0,8-8,16' stroke='currentcolor' fill='none'%3E%3C/path%3E%3C/svg%3E")
            center repeat;
          background-color: var(--text-link);
          height: 0.375rem; // 6px
          position: absolute;
          width: 80%;
        }

        &:hover {
          background-color: var(--secondary);
          border-color: var(--secondary);
          border-radius: var(--border-radius-8);

          &::after {
            display: none;
          }
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
