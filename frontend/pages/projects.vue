<template>
  <ProjectContainer 
    v-if="projects"
    hide-cta
    :project-array="projects"
  >
    <template #copy>
      <h1 
        class="project-container__title margin-reset gutter--heading" 
        v-text="'All projects'" 
      />
    </template>
  </ProjectContainer>
</template>

<script setup>
  import ProjectContainer from '~/components/projects/container'

  const projectsQuery = groq`
    *[_type == "project"]{
      ...,
      featuredImage{
        ...,
        asset -> {
          url
        }
      },
    }
  `

  const { data: projects } = await useSanityQuery(projectsQuery)
</script>

<style lang="scss">
  .project-container {
    margin-block-start: 0;
    padding-block-start: 4rem;
    padding-block-end: 10rem;

    &__title {
      margin-block-start: 2.2rem;
    }
  }
</style>