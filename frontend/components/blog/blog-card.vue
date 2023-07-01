<template>
  <article class="blog-card">
    <component :is="useH3 ? 'h3' : 'h2'">
      <span v-text="blog.title" />
    </component>

    <time 
      :datetime="blog._createdAt" 
      v-text="publishDate" 
    />
  </article>
</template>

<script setup>
  const props = defineProps({
    blog: {
      type: [Object],
    },
    useH3: {
      type: Boolean,
      default: false,
    }
  })

  /**
   * Format stylistic date.
   * @returns {String}
   */
  const publishDate = computed(() => {
    const date = new Date(props.blog._createdAt)

    const day = date.getDay() >= 10 
      ? date.getDay() 
      : `0${date.getDay()}`

    const month = date.getMonth() >= 10 
      ? date.getMonth() + 1 
      : `0${date.getMonth() + 1}`

    const year = date.getFullYear()
    
    return `${year} . ${month} . ${day}`
  })
</script>

<style lang="scss">
  .blog-card {
    border: 1px solid red;
    gap: 1rem;
    width: 33%;
  }
</style>