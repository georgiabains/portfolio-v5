<template>
  <BlogContainer v-if="blogs" class="blogs" hide-cta :blog-array="blogs">
    <template #copy>
      <h1
        class="blogs__title margin-reset gutter gutter--heading"
        v-text="'All blog posts'"
      />
    </template>
  </BlogContainer>
</template>

<script setup>
import BlogContainer from "~/components/blog/blog-container";

const postsQuery = groq`
    *[_type == "post"] | order(_createdAt desc) {
      ...,
      mainImage {
        ...,
        asset -> {
          url
        }
      }
    }
  `;

const { data: blogs } = await useSanityQuery(postsQuery);
</script>

<style lang="scss">
.blogs {
  margin-block-start: 0;
  padding-block-start: 2.5rem;

  &__title {
    margin-block-start: 1.25rem;
  }
}
</style>
