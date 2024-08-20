<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>

<script setup>
  // https://seanedevane.com/blog/dark-mode-nuxt-3#other-considerations
  useHead({
    script: [
      {
        children: `
          const theme = localStorage.getItem('gb-theme');
          const isDark = window.matchMedia("(prefers-color-scheme: dark)");
          if (theme) {
            document.documentElement.setAttribute('data-theme', JSON.parse(theme).scheme)
            window.gbTheme = JSON.parse(theme)
          } else if (isDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark')
          } else {
            document.documentElement.setAttribute('data-theme', 'light')
          }
        `,
      },
    ],
  })

  onMounted(() => {
    // Check what the system color scheme preferences are
    try {
      // See references for more context for why "not all" is used here
      let media = window.matchMedia('(prefers-color-scheme: light)'),
        rootElem = document.documentElement
      //
      const currentTheme = localStorage.getItem('gb-theme')
        ? localStorage.getItem('gb-theme')
        : null
      if (currentTheme.scheme == 'dark') {
        rootElem.setAttribute('data-theme', 'dark')
      } else if (currentTheme == 'light') {
        rootElem.setAttribute('data-theme', 'light')
      } else if (media.matches) {
        rootElem.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', {
          icon: 'system',
          name: 'System',
          scheme: 'system',
        })
      }
      // catches browser/OS level preference changes while the page is already loaded
      media.addEventListener('change', () => {
        if (media.matches) {
          rootElem.setAttribute('data-theme', 'dark')
          localStorage.setItem('theme', {
            icon: 'system',
            name: 'System',
            scheme: 'dark',
          })
        } else {
          rootElem.setAttribute('data-theme', 'light')
          localStorage.setItem('theme', {
            icon: 'system',
            name: 'System',
            scheme: 'light',
          })
        }
      })
    } catch (err) {}
  })
</script>

<style lang="scss">
  main {
    background-color: var(--background);
    border-bottom-left-radius: var(--border-radius-44);
    border-bottom-right-radius: var(--border-radius-44);
    // Screen minus header height
    min-height: calc(100vh - 260px);
    overflow-x: hidden;
    position: relative;

    @media screen and (min-width: 1024px) {
      // Screen minus header height
      min-height: calc(100vh - 260px);
    }
  }
</style>
