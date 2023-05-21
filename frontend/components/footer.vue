<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__left">
        <p>&copy; Georgia Bains {{ currentYear }}</p>
      </div>

      <!--TODO: When tabbing to links, move screen focus too-->
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
    bottom: 0;
    margin-top: -2rem;
    position: sticky;
    width: 100%;

    &__container {
      align-items: center;
      background-color: #010201;
      color: #fff;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding: 10rem 3.6rem 8rem;
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