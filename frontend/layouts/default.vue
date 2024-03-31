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
    // Screen minus header height
    min-height: calc(100vh - 260px);
    overflow-x: hidden;
    position: relative;
    z-index: 1;

    @media screen and (min-width: 700px) {
      // Screen minus header height
      min-height: calc(100vh - 260px);
    }
  }
</style>
