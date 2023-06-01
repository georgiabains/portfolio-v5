<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__left">
        <p class="footer__display-copy">All text on this background image is WCAG 2.1 AAA compliant.</p>
      </div>

      <div class="footer__right">
        
        <!--TODO: When tabbing to links, move screen focus too-->
        <p>Socials</p>
        <ul class="list--unstyled">
          <li><a href="https://github.com/georgiabains">Github</a></li>
          <li><a href="https://www.linkedin.com/in/georgia-bains/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <p class="footer__copyright">&copy; Georgia Bains {{ dateRange }}. All rights reserved.</p>
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
      align-items: center;
      display: flex;
      gap: 6rem;
      justify-content: center;
      width: 60%;

      a {
        color: #fff;
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

    &__copyright {
      width: 60%;
    }
  }
</style>