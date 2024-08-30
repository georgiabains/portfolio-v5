<script setup>
  import slugify from 'slugify'

  const props = defineProps({
    headings: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
    isNested: {
      type: Boolean,
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
  <!-- TODO: Refactor, its messy & i don't like it -->
  <nav v-if="!isNested" :aria-labelledby="label">
    <ol>
      <li v-for="heading in props.headings">
        <a
          :href="`#${slugify(heading.children[0].text, { lower: true })}`"
          v-text="heading.children[0].text"
        />
        <template v-if="headingHasSubheadings(heading)">
          <TableOfContents :headings="heading.subheadings" is-nested />
        </template>
      </li>
    </ol>
  </nav>

  <ol v-else>
    <li v-for="heading in props.headings">
      <a
        :href="`#${slugify(heading.children[0].text, { lower: true })}`"
        v-text="heading.children[0].text"
      />
      <template v-if="headingHasSubheadings(heading)">
        <TableOfContents :headings="heading.subheadings" is-nested />
      </template>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
  ol {
    counter-reset: toc;
    list-style: none;
    padding-inline-start: var(--spacing-l);

    li {
      margin-block-end: var(--spacing-2xs);

      &::before {
        content: counters(toc, '.') '. ';
        counter-increment: toc;
        margin-left: -20px;
      }

      & > ol {
        counter-reset: toc;
      }
    }
  }
</style>
