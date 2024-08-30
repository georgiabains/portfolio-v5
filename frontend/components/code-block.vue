<template>
  <pre class="code-block">
    <code
      :class="`language-${props.language}`" 
      v-text="code" 
    />
  </pre>
</template>

<script setup>
  /**
   * Props.
   */
  const props = defineProps({
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  })
</script>

<style scoped>
  .code-block {
    /**
     * TODO: Add some sort of helper or dedicated property for the background & colour here.
     */
    background-color: var(--color-neutral-8);
    border-radius: var(--border-radius-m);
    color: var(--color-neutral-0);
    display: grid;
    padding-block: var(--spacing-m);
    padding-inline: var(--spacing-xl);

    code {
      font-size: var(--text-s);
      min-height: var(--text-m);
    }
  }
</style>
