<template>
  <footer class="footer">
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
    padding-inline-end: 1rem;
    padding-inline-start: 1rem;

    &__container {
      align-items: center;
      background-color: #BA8F69;
      border-radius: 0.5em;
      display: flex;
      justify-content: space-between;
      padding: 2rem 3rem;
      width: 100%;
    }

    &__right {
      display: flex;
      gap: 1rem;
    }
  }
</style>