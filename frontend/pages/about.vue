<template>
  <article class="about rte container container--text">
    <h1 class="heading heading--primary" v-text="aboutPage.title" />

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
