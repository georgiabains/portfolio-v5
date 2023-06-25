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

  console.log(props)
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
        border: 1px solid var(--text);
        border-radius: 0.5rem;
        color: var(--text);
        display: inline-block;
        // font-family: 'PT Mono', monospace;
        margin-block-start: 2rem;
        padding-block: 0.5rem;
        padding-inline: 1rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: var(--secondary);
          color: #000;
        }
      }
    }

    &__title {
      font-family: 'PT Mono', monospace;
      font-size: 2.4rem;
    }

    &__image {
      width: 70%;

      img {
        border-radius: 1rem;
        filter: drop-shadow(0 0 1rem var(--secondary));
        height: 100%;
      }
    }
  }
</style>