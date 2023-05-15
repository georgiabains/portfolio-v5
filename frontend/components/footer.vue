<template>
  <p>&copy; Georgia Bains {{ currentYear }}</p>
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