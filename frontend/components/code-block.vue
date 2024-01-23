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
    background-color: var(--background-dark);
    border-radius: var(--border-radius-22);
    color: var(--text-inverse);
    display: grid;
    padding-block: var(--spacing-m);
    padding-inline: var(--spacing-xl);

    code {
      font-size: var(--font-16);
      min-height: var(--font-20);
    }
  }
</style>
