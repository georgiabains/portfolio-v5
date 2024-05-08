<template>
  <footer class="footer container">
    <a href="/sitemap.xml" class="footer__link">Sitemap</a>

    <p>&copy; Georgia Bains {{ dateRange }}.</p>
  </footer>
</template>

<script>
  export default {
    computed: {
      dateRange() {
        const initialYear = 2023
        const currentYear = new Date().getFullYear()

        return initialYear === currentYear
          ? initialYear
          : `${initialYear} - ${currentYear}`
      },
    },

    data() {
      return {
        currentYear: new Date().getFullYear(),
      }
    },
  }
</script>

<style lang="scss">
  .footer {
    $parent: &;

    display: flex;
    flex-direction: column;
    font-size: var(--text-s);
    gap: var(--spacing-m);
    justify-content: space-between;
    margin-block: var(--spacing-3xl) var(--spacing-5xl);

    &__link {
      width: fit-content;
    }

    @media screen and (min-width: 1024px) {
      margin-block: var(--spacing-6xl) var(--spacing-8xl);
      flex-direction: row;
    }
  }
</style>
