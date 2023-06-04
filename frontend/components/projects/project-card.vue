<template>
  <div class="project-card">
    <div class="project-card__info">
      <h3 class="margin-reset project-card__title" v-text="project.title" />
      <p class="margin-reset" v-text="project.description" />
      <p class="margin-reset">
        <a 
          :href="`/project/${project.slug.current}`" 
          v-text="`Read ${project.title} case study`"
        />
      </p>
    </div>

    <div class="project-card__image">
      <img 
        :alt="project.featuredImage.alt"
        :src="project.featuredImage.asset.url" 
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    project: {
      type: [Object],
    }
  })
</script>

<style lang="scss">
  .project-card {
    display: flex;
    gap: 6rem;

    &__info {
      flex-direction: column;
      display: flex;
      gap: 1rem;
      width: 30%;

      p {
        font-size: 1.8rem;
      }

      a {
        border-bottom: 1px solid var(--text-link);
        color: var(--text-link);
        display: inline-block;
        // font-family: 'PT Mono', monospace;
        margin-block-start: 2rem;
        padding-block-end: 0.4rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: #fff;
          color: #000;
        }
      }
    }

    &__title {
      font-family: 'PT Mono', monospace;
      font-size: 2.2rem;
    }

    &__image {
      overflow: hidden;
      width: 70%;

      img {
        border: 1px solid var(--border);
        border-radius: 1rem;
        height: 100%;
      }
    }
  }
</style>