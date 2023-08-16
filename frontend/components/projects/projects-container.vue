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

    <div v-if="!hideCta" class="gutter">
      <p class="project-container__cta">
        <nuxt-icon name="eye" />
        <a href="/projects">View all projects</a>
      </p>
    </div>
  </div>
</template>

<script setup>
  import ProjectCard from './project-card'

  const props = defineProps({
    hideCta: {
      type: Boolean,
      default: false,
    },
    projectArray: {
      type: [Array],
    }
  })
</script>

<style lang="scss">
  .project-container {
    margin-block-start: var(--spacing-l);

    &__title {
      align-items: center;
      display: flex;
      font-size: var(--font-60);
      gap: 1rem;
      justify-content: flex-start;
      text-transform: lowercase;

      span {
        flex-shrink: 0;
      }
    }

    &__subheading {
      display: none;
      margin: var(--spacing-m) 0;
    }

    &__projects {
      display: flex;
      flex-direction: column;
      gap: 6rem;
      padding-block-end: var(--spacing-5xl);
      padding-block-start: var(--spacing-5xl);
      width: 100%;
    }

    &__cta {
      align-items: center;
      display: flex;
      gap: var(--spacing-s);

      a {
        border-bottom: 1px solid var(--text);
        color: var(--text);
        text-decoration: none;
      }
    }
  }
</style>