<script setup>
  import { PortableText, toPlainText } from '@portabletext/vue'
  import slugify from 'slugify'

  import CodeBlock from './code-block'

  /**
   * Props.
   */
  const props = defineProps({
    value: {
      type: Array,
      required: true,
    },
  })

  const LinkableHeader = ({ value }, { slots }) => {
    // `value` is the single Portable Text block of this header
    const slug = slugify(toPlainText(value), { lower: true })
    return h('h2', { id: slug }, slots.default?.())
  }

  const components = {
    block: {
      h2: LinkableHeader,
    },
    types: {
      code: CodeBlock,
    },
  }
</script>

<template>
  <PortableText :value="props.value" :components="components" />
</template>
