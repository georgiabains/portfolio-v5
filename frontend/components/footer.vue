<template>
  <footer class="footer gutter">
    <div class="footer__container">
      <div class="footer__background"></div>
      <div class="footer__flex">
        <div class="footer__left">
          <p>&copy; Georgia Bains {{ currentYear }}</p>
        </div>
        <ul class="footer__right list--unstyled">
          <li><a href="https://github.com/georgiabains">Github</a></li>
          <li><a href="https://www.linkedin.com/in/georgia-bains/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
</script>

<style lang="scss">
  .footer {
    &__container {
      background-color: #010201;
      border-radius: 0.5em;
      color: #fff;
      overflow: hidden;
      width: 100%;
      position: relative;

      a {
        color: #fff;
      }
    }

    &__background {
      background-image: url('https://images.unsplash.com/photo-1485134532658-d720895a3b5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(10px);
      height: 100%;
      position: absolute;
      width: 100%;
    }

    &__flex {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 2rem 3rem;
      position: relative;
    }

    &__right {
      display: flex;
      gap: 1rem;
    }
  }
</style>