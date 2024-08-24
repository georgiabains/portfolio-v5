<script setup>
  import slugify from 'slugify'

  const props = defineProps({
    headings: {
      type: Array,
      required: true,
    },
  })

  /**
   * Return if the current heading level has subheadings.
   * @param {Object} heading - Heading object from Portable Text.
   * @returns {Boolean}
   */
  function headingHasSubheadings(heading) {
    if (!heading) {
      return false
    }

    return heading.subheadings?.length > 0
  }
</script>

<template>
  <ol>
    <li v-for="heading in props.headings">
      <a
        :href="`#${slugify(heading.children[0].text, { lower: true })}`"
        v-text="heading.children[0].text"
      />
      <template v-if="headingHasSubheadings(heading)">
        <TableOfContents :headings="heading.subheadings" />
      </template>
    </li>
  </ol>
</template>
