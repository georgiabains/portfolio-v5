<template>
  <header class="header">
    <div class="header__container container">
      <component
        :is="isCurrentPage('index') ? 'h1' : 'h2'"
        class="header__title"
      >
        <a href="/" v-text="'Georgia Bains'" />
      </component>

      <div class="header__right">
        <nav class="header__navigation">
          <ul class="list--unstyled">
            <li>
              <a
                :aria-current="getAriaCurrent('index')"
                href="/"
                class="bubble"
                v-text="'Home'"
              ></a>
            </li>

            <li>
              <a
                :aria-current="getAriaCurrent('about')"
                href="/about"
                class="bubble"
                v-text="'About'"
              ></a>
            </li>

            <li>
              <a
                :aria-current="getAriaCurrent('blogs')"
                href="/blog"
                class="bubble"
                v-text="'Blog'"
              ></a>
            </li>
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
  import ThemeToggle from './theme-toggle'

  const title = ref('Georgia Bains')
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

  /**
   * Determine if a given route matches the current page's route.
   * @param {String} routeName - Target route name.
   * @returns {Boolean}
   */
  const isCurrentPage = (routeName) => route.name === routeName

  /**
   * Return aria-current value.
   * @param {String} routeName - Target route name.
   * @returns {Boolean|String}
   */
  const getAriaCurrent = (routeName) => {
    return isCurrentPage(routeName) ? 'page' : false
  }
</script>

<style scoped lang="scss">
  .header {
    background-color: var(--background);
    padding-block: var(--spacing-5xl);
    position: relative;
    z-index: 1;

    &__container {
      flex-direction: column;
      display: flex;
      gap: var(--spacing-m);
      justify-content: space-between;
    }

    &__title {
      font-size: var(--text-m);
      font-weight: 400;

      a {
        border: 0;
        text-decoration: none;
      }
    }

    &__right {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-l);
    }

    &__navigation > ul {
      display: flex;
      flex-wrap: wrap;
      font-size: var(--text-s);
      gap: var(--spacing-m);

      a {
        align-items: center;
        display: flex;
        flex-direction: column;
        position: relative;
      }
    }

    @media screen and (min-width: 1024px) {
      padding-block: var(--spacing-8xl);

      &__container {
        align-items: center;
        gap: var(--spacing-4xl);
        flex-direction: row;
      }

      &__navigation > ul {
        gap: var(--spacing-l);
      }
    }
  }
</style>
