<template>
  <pre class="code-block">
    <code 
      v-for="(codeSnippet, index) in formattedCode" 
      :key="index"
      :class="`language-${props.language}`" 
      v-text="codeSnippet" 
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

  const formattedCode = props.code.split('\n')
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
      min-height: var(--font-20);
    }
  }
</style>
