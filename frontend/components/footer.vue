<template>
  <footer class="footer container">
    <ul class="list--unstyled footer__socials">
      <li>
        <a
          href="https://github.com/georgiabains"
          class="footer__link"
          rel="noreferrer noopener"
        >
          <span v-text="'Github'" />
        </a>
      </li>

      <li>
        <a
          href="https://www.linkedin.com/in/georgia-bains/"
          class="footer__link"
          rel="noreferrer noopener"
        >
          <span v-text="'LinkedIn'" />
        </a>
      </li>
    </ul>

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

    margin-block: var(--spacing-3xl) var(--spacing-5xl);

    &__socials {
      display: flex;
      gap: var(--spacing-m);
    }

    &__link {
      border-bottom: 1px solid transparent;
      text-decoration: none;

      &:hover,
      &:focus {
        border-color: var(--text-inverse);
        color: var(--text-inverse);
      }
    }

    @media screen and (min-width: 1024px) {
      margin-block: var(--spacing-6xl) var(--spacing-8xl);
    }
  }
</style>
