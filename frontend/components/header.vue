<template>
  <header class="header">
    <a
      ref="skipLink"
      :href="route.name === 'index' ? '#main' : '#content'"
      class="skiplink"
      v-text="'Skip to content'"
    />

    <div class="header__container container">
      <component
        :is="isCurrentPage('index') ? 'h1' : 'h2'"
        class="header__title"
      >
        <NuxtLink :to="{ name: 'index' }">Georgia Bains</NuxtLink>
      </component>

      <div class="header__right">
        <nav class="header__navigation">
          <ul class="list--unstyled">
            <li>
              <NuxtLink
                :aria-current="getAriaCurrent('about')"
                :to="{ name: 'about' }"
                class="bubble"
              >
                About
              </NuxtLink>
            </li>

            <li>
              <NuxtLink
                :aria-current="getAriaCurrent('blog')"
                :to="{ name: 'blog' }"
                class="bubble"
              >
                Blog
              </NuxtLink>
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

  const description = ref('My portfolio of web development work.')

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: (test) => {
      return test ? `${test} - Georgia Bains` : 'Georgia Bains'
    },
    meta: [
      {
        name: 'description',
        content: description,
      },
    ],
  })

  const route = useRoute()
  const skipLink = ref('skipLink')

  /**
   * Watch route change to focus on skip link. Follows guidelines from:
   * https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/
   */
  watch(
    () => route.path,
    () => {
      skipLink.value.focus()
    }
  )

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
        gap: var(--spacing-3xl);
        flex-direction: row;
      }
    }
  }
</style>
