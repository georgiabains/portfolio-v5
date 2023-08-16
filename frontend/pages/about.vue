<template>
  <div class="about">
    <h1
      class="about__title gutter gutter--heading margin-reset"
      v-text="aboutPage.title"
    />
    <div class="about__body gutter">
      <SanityContent v-if="aboutPage.body" :blocks="aboutPage.body" />
    </div>
  </div>
</template>

<script setup>
const aboutPageQuery = groq`
    *[_type == "about"][0]{
      ...
    }
  `;

const { data: aboutPage } = await useSanityQuery(aboutPageQuery);
</script>

<style lang="scss">
.about {
  margin: 0 auto;
  padding-block-start: 2.5rem;

  &__title {
    font-size: 3.75rem;
    margin-block-start: 1.375rem;
    text-transform: lowercase;
  }

  &__body {
    font-size: 1.25rem;
    max-width: 850px;
  }
}
</style>
