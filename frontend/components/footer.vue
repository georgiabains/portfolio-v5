<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__left">
        <p class="footer__display-copy margin-reset">All text on this background image is WCAG 2.1 AAA compliant.</p>
      </div>

      <div class="footer__right">
        
        <!--TODO: When tabbing to links, move screen focus too-->
        <ul class="list--unstyled footer__socials">
          <li>
            <a href="https://github.com/georgiabains" rel="noreferrer noopener">
              <nuxt-icon name="github" />
              <span class="footer__socials--link">Explore my Github</span>
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/georgia-bains/" rel="noreferrer noopener">
              <nuxt-icon name="linkedin" /> 
              <span class="footer__socials--link">Connect with me on LinkedIn</span>
            </a>
          </li>
        </ul>

        <div class="footer__privacy">
          <nuxt-icon name="analytics" />
          <p class="margin-reset">This site uses Vercel's Web Analytics. <br />See <a href="https://vercel.com/docs/concepts/analytics/privacy-policy" rel="noreferrer noopener">Vercel's privacy policy</a> for details.</p>
        </div>
      </div>
    </div>

    <div class="footer__copyright">&copy; Georgia Bains {{ dateRange }}. All rights reserved.</div>
    
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
      }
    },

    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
</script>

<style lang="scss">
  .footer {
    $parent: &;

    @include negative(margin-top, var(--spacing-l));
    align-items: center;
    background-color: var(--background-dark);
    bottom: 0;
    color: var(--text-inverse);
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 80vh;
    overflow: hidden;
    position: sticky;
    width: 100%;

    &::before {
      content: "";
      background-image: url('https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(10px) brightness(50%);
      height: 110%;
      left: -5%;
      position: absolute;
      top: -5%;
      width: 110%;
      z-index: -1;
    }

    &__container {
      align-items: baseline;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-5xl);
      justify-content: center;
      width: 80%;

      h2 {
        font-family: 'PT Mono', monospace;
      }

      a {
        border-bottom: 1px solid var(--text-inverse);
        color: var(--text-inverse);
        text-decoration: none;

        &:hover,
        &:focus {
          background-color: var(--text-inverse);
          color: var(--text);
        }
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
      gap: var(--spacing-xs);
      line-height: 140%;

      a {
        align-items: baseline;
        border: none;
        display: inline-flex;
        gap: var(--spacing-xs);
        text-decoration: none;

        &:hover {
          background-color: transparent;
          color: var(--text-inverse);

          #{$parent}__socials--link {
            background-color: var(--text-inverse);
            color: var(--text);
          }
        }
      }

      svg {
        fill: var(--text-inverse);
        width: var(--icon-m);
        height: var(--icon-m);
      }

      /** TODO: Update to add border radius */
      &--link {
        border-bottom: 1px solid var(--text-inverse);
        padding-inline: 0.2rem;
        padding-block: 0.4rem 0.2rem;
      }
    }

    &__privacy {
      align-items: flex-start;
      display: flex;
      gap: var(--spacing-s);
      margin-block-start: var(--spacing-5xl);

      svg {
        fill: var(--text-inverse);
        width: var(--icon-s);
        height: var(--icon-m);
      }
    }

    &__copyright {
      margin-block-start: var(--spacing-6xl);
      width: 80%;

      a {
        color: var(--text-inverse);
      }
    }

    @media screen and (min-width: 960px) {
      &__container,
      &__copyright {
        width: 60%;
      }

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