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

    <div class="featured-text__copy">
      <SanityContent :blocks="section.text" />
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
          text: '',
          title: '',
        }
      },
      required: true,
    },
  })
</script>

<style lang="scss">
  .featured-text {
    gap: var(--spacing-m);

    &__copy {
      font-size: var(--text-s);
    }

    @media screen and (min-width: 1024px) {
      gap: var(--spacing-xs);

      &__copy {
        max-width: 50%;
      }
    }
  }
</style>
