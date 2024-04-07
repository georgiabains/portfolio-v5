<template>
  <article
    v-if="blog.slug"
    ref="blogCard"
    class="blog-card"
    @click.prevent="handleCardClick"
  >
    <div v-if="blog.mainImage?.asset?.url" class="blog-card__image">
      <img :src="blog.mainImage.asset.url" alt="" />
    </div>
    <header class="blog-card__info">
      <component :is="useH3 ? 'h3' : 'h2'" class="blog-card__title">
        <a class="blog-card__title-link" :href="getSlug" v-text="blog.title" />
      </component>

      <time
        class="blog-card__date"
        :datetime="blog._createdAt"
        v-text="publishDate"
      />
    </header>
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
    return new Date(props.blog._createdAt).toLocaleString('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
    height: 100%;
    overflow: hidden;
    text-decoration: none;
    width: 100%;

    &:hover {
      @include focus-ring;
      background-color: var(--secondary);

      #{$parent}__title-link {
        text-decoration: underline;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
      padding-block: var(--spacing-3xl);
      padding-inline: var(--spacing-3xl);
    }

    &__title {
      font-size: var(--font-24);
      line-height: 1.4;
      max-width: 95%;
    }

    &__title-link {
      color: var(--text);
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    &__date {
      font-size: var(--font-20);
    }

    &__image {
      height: 12rem; // 240px
      overflow: hidden;
      width: 100%;

      img {
        height: 100%;
        object-fit: cover;
        object-position: center center;
        width: 100%;
      }
    }

    @media (prefers-color-scheme: dark) {
      color: var(--text-inverse);

      &__title-link {
        color: var(--text-inverse);
      }
    }
  }
</style>
