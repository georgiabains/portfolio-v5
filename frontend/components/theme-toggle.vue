<template>
  <div class="theme-toggle">
    <button
      v-click-outside="handleToggleClose"
      class="theme-toggle__button"
      type="button"
      @click="handleToggleClick"
    >
      <template
        v-for="(theme, index) in themes"
        :key="`${theme.icon}-${index}`"
      >
        <nuxt-icon
          class="theme-toggle__icon theme-toggle__icon--selected"
          :class="`theme-toggle__icon--${theme.icon}`"
          :name="theme.icon"
          aria-hidden="true"
          filled
        />
      </template>
      <span v-if="scheme.name" class="visually-hidden" v-text="scheme.name" />
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
            filled
          />
          <span v-text="theme.name" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const scheme = ref({
    icon: 'system',
    name: 'System',
    scheme: '',
  })

  const schemeString = ref(scheme.value.scheme)
  const storageKey = ref('gb-theme')

  const themes = reactive([
    {
      icon: 'system',
      name: 'System',
      scheme: schemeString,
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

  const themeToggleMenu = ref()

  const systemScheme = computed(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches
    const scheme = isDark ? 'dark system' : 'light system'

    return {
      icon: 'system',
      name: 'System',
      scheme,
    }
  })

  useHead({
    htmlAttrs: {
      'data-theme': schemeString,
    },
  })

  onMounted(() => {
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
    if (theme.name === 'System') {
      theme.scheme = systemScheme.value.scheme
    }

    setColorPreference(theme)
  }

  /**
   * Get initial colour preference.
   */
  function getColorPreference() {
    const savedScheme = localStorage.getItem(storageKey.value)

    if (savedScheme) {
      setColorPreference(JSON.parse(savedScheme))
      return
    }

    setColorPreference(systemScheme.value)
  }

  /**
   * Set and save colour scheme preference.
   * @param {String} theme
   */
  function setColorPreference(theme) {
    scheme.value = theme
    schemeString.value = theme.scheme
    localStorage.setItem(storageKey.value, JSON.stringify(theme))
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

    &__icon--selected {
      display: none;
    }

    @media screen and (min-width: 1024px) {
      &__button {
        font-size: var(--text-s);
      }
    }
  }

  html[data-theme='dark'] {
    .theme-toggle__icon--moon {
      display: flex;
    }
  }

  html[data-theme='light'] {
    .theme-toggle__icon--sun {
      display: flex;
    }
  }

  html[data-theme='dark system'] {
    .theme-toggle__icon--system {
      display: flex;
    }
  }

  html[data-theme='light system'] {
    .theme-toggle__icon--system {
      display: flex;
    }
  }
</style>
