<template>
  <footer class="footer gutter">
    <div class="footer__container">
      <div class="footer__background" aria-hidden="true">
        <img
          alt=""
          loading="lazy"
          role="presentation"
          src="https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
        />
      </div>

      <div class="footer__content">
        <div class="footer__split">
          <div class="footer__left">
            <h2
              class="footer__display-copy margin-reset"
              v-text="'Let\'s make the web accessible for all.'"
            />
          </div>

          <div class="footer__right">
            <div class="footer__links-group">
              <h3 class="margin-reset">Pages</h3>
              <ul class="list--unstyled">
                <li><a href="/resources">Accessibility resources</a></li>
                <li><a href="/sitemap.xml">Sitemap</a></li>
              </ul>
            </div>
            <div class="footer__links-group">
              <h3 class="margin-reset">Socials</h3>
              <ul class="list--unstyled footer__socials">
                <li>
                  <a
                    href="https://github.com/georgiabains"
                    rel="noreferrer noopener"
                  >
                    <span v-text="'Explore my Github'" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/georgia-bains/"
                    rel="noreferrer noopener"
                  >
                    <span v-text="'Connect on LinkedIn'" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <ul class="footer__copyright list--unstyled">
          <li>&copy; Georgia Bains {{ dateRange }}.</li>
          <li>
            Using
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              rel="noreferrer noopener"
              v-text="'Vercel\'s Web Analytics'"
            />
          </li>
        </ul>
      </div>
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
    padding-block: var(--spacing-7xl);
    min-height: 100vh;

    &__container {
      background-color: var(--background-dark);
      border-radius: var(--border-radius-44);
      display: grid;
      overflow: hidden;
      padding-block: var(--spacing-7xl) var(--spacing-4xl);
      padding-inline: var(--spacing-4xl);
      position: relative;
    }

    &__content {
      display: grid;
      gap: var(--spacing-7xl);
      grid-template-rows: 3fr minmax(25px, 1fr);
      height: 100%;
      position: relative;
    }

    &__background {
      filter: blur(40px) brightness(50%);
      height: 110%;
      left: -5%;
      position: absolute;
      top: -5%;
      width: 110%;

      img {
        max-width: unset;
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
      }
    }

    &__split {
      display: grid;
      gap: var(--spacing-4xl);
      grid-template-columns: 1fr 2fr;
    }

    &__display-copy {
      font-family: 'Castoro', serif;
      font-size: var(--font-44);
    }

    &__links-group {
      a {
        color: var(--text-inverse);
      }
    }

    &__copyright {
      align-self: flex-end;
      display: flex;
      gap: var(--spacing-m);
      justify-content: space-between;

      a {
        color: var(--text-inverse);
      }
    }
  }
</style>
