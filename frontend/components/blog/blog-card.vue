<template>
  <article ref="blogCard" class="blog-card" @click.prevent="handleCardClick">
    <div class="blog-card__info">
      <component
        :is="useH3 ? 'h3' : 'h2'"
        class="margin-reset blog-card__title"
      >
        <a :href="getSlug" v-text="blog.title" />
      </component>

      <time
        class="blog-card__date"
        :datetime="blog._createdAt"
        v-text="publishDate"
      />
    </div>

    <div class="blog-card__image">
      <img :src="blog.mainImage.asset.url" alt="" />
    </div>
  </article>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    blog: {
      type: [Object],
    },
    useH3: {
      type: Boolean,
      default: false,
    },
  })

  /**
   * Return blog slug with correct path.
   * @returns {String}
   */
  const getSlug = computed(() => {
    return `/blog/${props.blog.slug.current}`
  })

  /**
   * Format stylistic date.
   * @returns {String}
   */
  const publishDate = computed(() => {
    const date = new Date(props.blog._createdAt)

    const day = date.getDay() >= 10 ? date.getDay() : `0${date.getDay()}`

    const month =
      date.getMonth() >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

    const year = date.getFullYear()

    return `${year} . ${month} . ${day}`
  })

  /**
   * Redirect pointer users to the blog link.
   */
  const handleCardClick = () => window.location.assign(getSlug.value)

  const blogCard = ref(null)

  onMounted(() => {
    blogCard.value.style.cursor = 'pointer'
  })
</script>

<style lang="scss">
  .blog-card {
    $parent: &;

    background-color: var(--secondary);
    border-radius: var(--border-radius-44);
    color: var(--text);
    display: block;
    height: fit-content;
    overflow: hidden;
    padding: var(--spacing-2xl);
    text-decoration: none;
    width: 100%;

    &:hover {
      @include focus-ring;
      background-color: var(--secondary);
    }

    &:focus-within {
      @include focus-ring;

      a:focus {
        outline: none;
        text-decoration: none;
      }
    }

    &__info {
      padding-block-end: var(--spacing-m);
    }

    &__title {
      font-size: var(--font-24);
      line-height: 1.4;
      max-width: 95%;
    }

    a {
      text-decoration: none;
      color: var(--text);

      &:focus {
        text-decoration: underline;
      }
    }

    &__date {
      display: block;
      margin-block-start: var(--spacing-xs);
    }

    &__image {
      border-radius: var(--border-radius-16);
      height: 15rem; // 240px
      overflow: hidden;
      width: 100%;

      img {
        height: 100%;
        object-fit: cover;
        object-position: center center;
        width: 100%;
      }
    }
  }
</style>
