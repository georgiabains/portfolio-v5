<template>
  <div class="about">
    <h1 class="about__title gutter--heading margin-reset" v-text="aboutPage.title" />
    <div class="about__body gutter">
      <SanityContent 
        v-if="aboutPage.body" 
        :blocks="aboutPage.body"
      />
    </div>
  </div>
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
    margin: 0 auto;
    padding-block-start: 4rem;

    &__title {
      font-size: 6rem;
      margin-block-start: 2.2rem;
      text-transform: lowercase;
    }

    &__body {
      font-size: 2rem;
      max-width: 850px;
    }
  }
</style>