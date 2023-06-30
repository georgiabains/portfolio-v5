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
    border-bottom-left-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;
    min-height: 100vh;
    overflow-x: hidden; 
    padding-block-end: 8rem;
    position: relative;
    z-index: 1;
  }
</style>
