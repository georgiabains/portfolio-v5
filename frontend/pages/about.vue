<template>
  <article class="about gutter">
    <h1 class="heading margin-reset" v-text="aboutPage.title" />

    <div class="about__body">
      <SanityContent v-if="aboutPage.body" :blocks="aboutPage.body" />
    </div>
  </article>
</template>

<script setup>
  const aboutPageQuery = groq`
    *[_type == "about"][0]{
      ...
    }
  `

  const { data: aboutPage } = await useSanityQuery(aboutPageQuery)
</script>

<style lang="scss">
  .about {
    width: var(--width-copy);

    &__body {
      font-size: var(--font-20);
      line-height: var(--line-140);
    }
  }
</style>
