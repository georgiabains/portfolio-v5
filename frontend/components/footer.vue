<template>
  <footer class="footer gutter">
    <div class="footer__container">
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
    </div>
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

    color: var(--text-inverse);
    display: grid;
    margin-block-end: var(--spacing-4xl);
    padding-block: var(--spacing-xl);

    &__container {
      align-items: center;
      background-color: var(--background-dark);
      border-radius: var(--border-radius-44);
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding-block: var(--spacing-xs);
      padding-inline: var(--spacing-4xl);
      position: relative;
    }

    &__socials {
      display: flex;
      gap: var(--spacing-m);
    }

    &__link {
      border-bottom: 1px solid var(--text-inverse);
      color: var(--text-inverse);
      text-decoration: none;

      &:hover,
      &:focus {
        border-width: 4px;
        color: var(--text-inverse);
      }
    }
  }
</style>
