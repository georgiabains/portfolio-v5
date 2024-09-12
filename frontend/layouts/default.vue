<template>
  <NuxtRouteAnnouncer>
    <template #default>
      <p>"{{ route }}" was loaded.</p>
    </template>
  </NuxtRouteAnnouncer>
  <Header />
  <main id="main" tabindex="-1">
    <slot />
  </main>
  <Footer />
</template>

<script setup>
  // https://seanedevane.com/blog/dark-mode-nuxt-3#other-considerations
  const route = computed(() => useRoute().meta.title)

  useHead({
    script: [
      {
        children: `
          const storedTheme = localStorage.getItem('gb-theme')
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

          if (storedTheme) {
            document.documentElement.setAttribute('data-theme',JSON.parse(storedTheme).scheme)
          } else if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark system')
          } else {
            document.documentElement.setAttribute('data-theme', 'light system')
          }
        `,
      },
    ],
  })

  onMounted(() => {
    // Check what the system color scheme preferences are
    try {
      // See references for more context for why "not all" is used here
      let media = window.matchMedia('(prefers-color-scheme: dark)'),
        rootElem = document.documentElement
      //
      const currentTheme = localStorage.getItem('gb-theme')
        ? localStorage.getItem('gb-theme')
        : null
      if (currentTheme) {
        const theme = JSON.parse(currentTheme)
        rootElem.setAttribute('data-theme', theme.scheme)
      } else if (media.matches) {
        rootElem.setAttribute('data-theme', 'dark system')
        localStorage.setItem(
          'gb-theme',
          JSON.stringify({
            icon: 'system',
            name: 'System',
            scheme: 'dark system',
          })
        )
      }
      // catches browser/OS level preference changes while the page is already loaded
      media.addEventListener('change', () => {
        if (media.matches) {
          rootElem.setAttribute('data-theme', 'dark system')
          localStorage.setItem('theme', {
            icon: 'system',
            name: 'System',
            scheme: 'dark system',
          })
        } else {
          rootElem.setAttribute('data-theme', 'light system')
          localStorage.setItem('theme', {
            icon: 'system',
            name: 'System',
            scheme: 'light system',
          })
        }
      })
    } catch (err) {}
  })
</script>
