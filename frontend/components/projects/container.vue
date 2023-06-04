<template>
  <div class="project-container">
    <slot name="copy"></slot>

    <div class="gutter project-container__projects">
      <ProjectCard 
        v-for="(project, projectIndex) in projectArray" 
        :key="projectIndex"
        :project="project" 
      />
    </div>
  </div>
</template>

<script setup>
  import ProjectCard from './project-card'

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