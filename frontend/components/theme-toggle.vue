<template>
  <div class="theme-toggle">
    <button
      v-click-outside="handleToggleClose"
      class="bubble bubble--has-icon"
      type="button"
      @click="handleToggleClick"
    >
      <nuxt-icon name="system" aria-hidden="true" />
      <span v-text="'Theme'" />
    </button>

    <ul ref="themeToggleMenu" class="theme-toggle__menu list--unstyled">
      <li>
        <button class="bubble bubble--has-icon">
          <nuxt-icon name="system" aria-hidden="true" />
          <span v-text="'System default'" />
        </button>
      </li>

      <li>
        <button class="bubble bubble--has-icon">
          <nuxt-icon name="sun" aria-hidden="true" />
          <span v-text="'Light'" />
        </button>
      </li>

      <li>
        <button class="bubble bubble--has-icon">
          <nuxt-icon name="moon" aria-hidden="true" />
          <span v-text="'Dark'" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const themeToggleMenu = ref()

  const handleToggleClick = () => {
    themeToggleMenu.value.classList.toggle('is-active')
  }

  const handleToggleClose = () => {
    themeToggleMenu.value.classList.remove('is-active')
  }
</script>

<style lang="scss" scoped>
  .theme-toggle {
    &__menu {
      display: none;
      flex-direction: column;
      position: absolute;

      &.is-active {
        display: flex;
      }
    }
  }
</style>
