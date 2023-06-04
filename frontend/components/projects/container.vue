<template>
  <div
    class="project-container"
  >
    <!-- <h2 
      class="project-container__title margin-reset gutter--heading" 
      v-text="'Featured projects'" 
    />

    <p 
      class="gutter margin-reset max-width--content project-container__subheading" 
      v-text="section.indexProjectCopy" 
    /> -->

    <slot name="copy"></slot>

    <div class="gutter project-container__projects">
      <div 
        v-for="(project, projectIndex) in projectArray"
        class="project-card"
        :key="projectIndex"
      >
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
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    projectArray: {
      type: [Array],
    }
  })
</script>

<style lang="scss">
  .project-container {
    margin-block-start: 2rem;

    &__title {
      align-items: center;
      display: flex;
      font-size: 6rem;
      gap: 1rem;
      justify-content: flex-start;
      text-transform: lowercase;

      span {
        flex-shrink: 0;
      }
    }

    &__subheading {
      display: none;
      margin: 1.0rem 0;
    }

    &__projects {
      display: flex;
      flex-direction: column;
      gap: 10rem;
      padding-block-end: 4rem;
      padding-block-start: 4rem;
      width: 100%;
    }
  }
</style>