<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>

<style lang="scss">
  main {
    background-color: var(--background);
    border-bottom-left-radius: var(--border-radius-44);
    border-bottom-right-radius: var(--border-radius-44);
    min-height: 100vh;
    overflow-x: hidden;
    padding-block-end: var(--spacing-7xl);
    position: relative;
    z-index: 1;
  }
</style>
