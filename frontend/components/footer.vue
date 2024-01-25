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
            <p
              class="footer__display-copy margin-reset"
              v-text="'Let\'s make the web accessible for all.'"
            />
          </div>

          <div class="footer__right">
            <!--TODO: When tabbing to links, move screen focus too-->
            <ul class="list--unstyled footer__socials">
              <li>
                <a
                  class="bubble bubble--has-icon bubble--background-light"
                  href="https://github.com/georgiabains"
                  rel="noreferrer noopener"
                >
                  <nuxt-icon name="github" aria-hidden="true" />
                  <span v-text="'Explore my Github'" />
                </a>
              </li>

              <li>
                <a
                  class="bubble bubble--has-icon bubble--background-light"
                  href="https://www.linkedin.com/in/georgia-bains/"
                  rel="noreferrer noopener"
                >
                  <nuxt-icon name="linkedin" aria-hidden="true" />
                  <span v-text="'Connect on LinkedIn'" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__copyright">
          &copy; Georgia Bains {{ dateRange }}. Using
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            rel="noreferrer noopener"
            >Vercel's Web Analytics</a
          >.
        </div>
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
      padding-block: var(--spacing-7xl);
      padding-inline: var(--spacing-4xl);
      position: relative;

      h2 {
        font-family: 'PT Mono', monospace;
      }
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

    &__display-copy {
      font-family: 'Castoro', serif;
      font-size: var(--font-44);
    }

    &__socials {
      display: flex;
      flex-direction: column;
      font-size: var(--font-22);
      gap: var(--spacing-m);

      svg {
        fill: var(--text-inverse);
        width: var(--icon-m);
        height: var(--icon-m);
      }

      .bubble {
        padding-block: var(--spacing-s);
        padding-inline: var(--spacing-xl);
      }
    }

    &__copyright {
      align-self: flex-end;

      a {
        color: var(--text-inverse);
      }
    }

    @media screen and (min-width: 960px) {
      &__right {
        align-items: baseline;
        display: flex;
        gap: var(--spacing-l);
        justify-content: space-between;
        width: 100%;
      }
    }

    @media screen and (min-width: 1520px) {
      &__container {
        flex-direction: row;
      }

      &__left {
        width: 60%;
      }

      &__right {
        flex-direction: column;
        width: 40%;
      }
    }
  }
</style>
