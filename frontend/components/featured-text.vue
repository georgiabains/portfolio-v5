<template>
  <section
    class="section featured-text container"
    :class="{ 'section--first': isFirst }"
  >
    <h2
      v-if="section.title"
      class="heading heading--primary"
      v-text="section.title"
    />

    <div class="featured-text__grid">
      <p
        v-for="copy in section.featuredText"
        class="featured-text__copy"
        v-text="copy"
      />
    </div>

    <p v-if="isFirst" class="section__scroll">
      <nuxt-icon aria-hidden="true" name="mouse" />
      Scroll to browse my work
    </p>
  </section>
</template>

<script setup>
  /**
   * Props.
   */
  const props = defineProps({
    isFirst: {
      type: Boolean,
      default: false,
    },
    section: {
      type: Object,
      default() {
        return {
          featuredText: '',
          title: '',
        }
      },
      required: true,
    },
  })
</script>

<style lang="scss">
  .featured-text {
    gap: var(--spacing-3xl);

    &__copy {
      font-size: var(--font-22);
      max-width: var(--width-copy);
    }

    &__grid {
      align-items: center;
      display: grid;
      gap: var(--spacing-2xl);
    }
  }
</style>
