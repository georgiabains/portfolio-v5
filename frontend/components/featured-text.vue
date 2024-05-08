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
      <div
        v-for="(text, index) in section.featuredText"
        :key="index"
        class="featured-text__copy"
      >
        <SanityContent :blocks="text.body" />
      </div>
    </div>
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
    gap: var(--spacing-xs);

    &__copy {
      font-size: var(--text-s);
      max-width: var(--width-copy);
    }

    &__grid {
      align-items: center;
      display: grid;
      gap: var(--spacing-2xl);
    }
  }
</style>
