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

    align-items: center;
    background-color: #010201;
    bottom: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -2rem;
    min-height: 80vh;
    overflow: hidden;
    padding: 4rem 3.6rem 2rem;
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
      gap: 6rem;
      justify-content: center;
      width: 60%;

      h2 {
        font-family: 'PT Mono', monospace;
      }

      a {
        border-bottom: 1px solid #fff;
        color: #fff;
        text-decoration: none;

        &:hover,
        &:focus {
          background-color: #fff;
          color: var(--text);
        }
      }
    }

    &__left {
      width: 60%;
    }

    &__right {
      width: 40%;
    }

    &__display-copy {
      font-family: 'Castoro', serif;
      font-size: 4.4rem;
    }

    &__socials {
      font-size: 2.2rem;
      line-height: 140%;

      li {
        margin-block-start: 1rem;
      }

      a {
        align-items: baseline;
        border: none;
        display: inline-flex;
        gap: 0.8rem;
        text-decoration: none;

        &:hover {
          background-color: transparent;
          color: #fff;

          #{$parent}__socials--link {
            background-color: #fff;
            color: var(--text);
          }
        }
      }

      svg {
        fill: #fff;
        width: 2.6rem;
        height: 2.6rem;
      }

      &--link {
        border-bottom: 1px solid #fff;
        padding-inline: 0.2rem;
        padding-block: 0.4rem 0.2rem;
      }
    }

    &__privacy {
      align-items: flex-start;
      display: flex;
      gap: 0.8rem;
      margin-block-start: 6rem;

      svg {
        fill: #fff;
        width: 1.8rem;
        height: 2.2rem;
      }
    }

    &__copyright {
      margin-block-start: 10rem;
      width: 60%;

      a {
        color: #fff;
      }
    }
  }
</style>