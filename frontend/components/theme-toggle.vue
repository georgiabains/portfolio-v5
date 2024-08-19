<template>
  <div class="theme-toggle">
    <button
      v-click-outside="handleToggleClose"
      class="theme-toggle__button"
      type="button"
      @click="handleToggleClick"
    >
      <nuxt-icon
        class="theme-toggle__icon"
        :name="activeTheme.icon"
        aria-hidden="true"
      />
      <span class="visually-hidden" v-text="activeTheme.name" />
    </button>

    <ul ref="themeToggleMenu" class="theme-toggle__menu list--unstyled">
      <li v-for="(theme, index) in themes" :key="`${theme.name}-${index}`">
        <button
          class="theme-toggle__button"
          type="button"
          @click="handleThemeSelection(theme)"
        >
          <nuxt-icon
            class="theme-toggle__icon"
            :name="theme.icon"
            aria-hidden="true"
          />
          <span v-text="theme.name" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const scheme = ref('')
  // const storageKey = ref('gb-theme')

  const themeToggleMenu = ref()

  const themes = reactive([
    {
      icon: 'system',
      name: 'System',
      scheme: scheme.value,
    },
    {
      icon: 'sun',
      name: 'Light',
      scheme: 'light',
    },
    {
      icon: 'moon',
      name: 'Dark',
      scheme: 'dark',
    },
  ])

  const activeTheme = ref(themes[0])

  const systemScheme = computed(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches
    return isDark ? 'dark' : 'light'
  })

  useHead({
    bodyAttrs: {
      'data-theme': scheme,
    },
  })

  onBeforeMount(() => {
    getColorPreference()
  })

  /**
   * Methods.
   */

  /**
   * Toggle the theme menu.
   */
  function handleToggleClick() {
    themeToggleMenu.value.classList.toggle('is-active')
  }

  /**
   * Close theme menu.
   */
  function handleToggleClose() {
    themeToggleMenu.value.classList.remove('is-active')
  }

  /**
   * Update active theme.
   * @param {Object} theme - Theme object.
   */
  function handleThemeSelection(theme) {
    activeTheme.value = theme

    if (activeTheme.value.name === 'System') {
      activeTheme.value.scheme = systemScheme.value
    }

    scheme.value = activeTheme.value.scheme
  }

  /**
   * Get initial colour preference.
   */
  function getColorPreference() {
    scheme.value = systemScheme.value
  }
</script>

<style lang="scss" scoped>
  .theme-toggle {
    align-items: center;
    display: flex;
    position: relative;

    &__menu {
      border-radius: var(--border-radius-8);
      border: 1px solid var(--accent);
      display: none;
      flex-direction: column;
      padding: var(--spacing-2xs);
      position: absolute;
      top: var(--spacing-3xl);

      &.is-active {
        display: flex;
      }
    }

    &__button {
      align-items: center;
      background-color: var(--background);
      border: none;
      border-radius: var(--border-radius-8);
      color: var(--text);
      display: flex;
      gap: var(--spacing-xs);
      padding: var(--spacing-xs);
      width: 100%;

      &:hover,
      &:focus {
        // TODO: Check contrast; add to figma and variables
        background-color: #b6c4b6;
      }
    }

    &__icon {
      display: flex;
      // nuxt-icon size prop doesn't do anything
      font-size: var(--icon-m);
      height: var(--icon-m);
      width: var(--icon-m);
    }

    @media screen and (min-width: 1024px) {
      &__button {
        font-size: var(--text-s);
      }
    }
  }
</style>
