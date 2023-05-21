<template>
  <footer class="footer gutter">
    <div class="footer__container">
      <div class="footer__left">
        <p>&copy; Georgia Bains {{ currentYear }}</p>
      </div>
      <ul class="footer__right list--unstyled">
        <li><a href="https://github.com/georgiabains">Github</a></li>
        <li><a href="https://www.linkedin.com/in/georgia-bains/">LinkedIn</a></li>
      </ul>
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
    margin-block-end: 2em;
    margin-block-start: 2em;

    &__container {
      align-items: center;
      background-color: #010201;
      border-radius: 0.5em;
      color: #fff;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding: 2rem 3.6rem;
      position: relative;
      width: 100%;
      z-index: 0;

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

      a {
        color: #fff;
      }
    }

    &__right {
      display: flex;
      gap: 1.8rem;
    }
  }
</style>