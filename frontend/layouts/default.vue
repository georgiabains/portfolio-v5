<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
  main {
    background-color: #fff;
    border-bottom-left-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
</style>
