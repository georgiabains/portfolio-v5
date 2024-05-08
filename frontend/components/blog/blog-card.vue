<template>
  <article v-if="blog.slug" class="blog-card">
    <a
      v-if="blog.mainImage?.asset?.url"
      aria-hidden="true"
      class="blog-card__image"
      :href="getSlug"
      tabindex="-1"
    >
      <img :src="blog.mainImage.asset.url" alt="" />
    </a>

    <header class="blog-card__info">
      <component :is="titleElement" class="blog-card__title">
        <a class="blog-card__title-link" :href="getSlug">
          <span v-text="blog.title" />

          <nuxt-icon name="arrow-right" aria-hidden="true" />
        </a>
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
   * Compute title element.
   * @returns {String}
   */
  const titleElement = computed(() => (props.useH3 ? 'h3' : 'h2'))
</script>

<style lang="scss">
  .blog-card {
    $parent: &;

    &__image {
      aspect-ratio: 16 / 9;
      border-radius: var(--border-radius-16);
      // TODO: Update variables
      box-shadow: 4px 4px 4px rgba(22, 24, 22, 0.16);
      display: block;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
      padding: var(--spacing-m) var(--spacing-xs);
    }

    &__title {
      font-size: var(--text-s);

      .nuxt-icon {
        margin-inline-start: var(--spacing-xs);
      }

      &:hover {
        text-decoration: underline;
      }
    }

    &__title-link {
      color: var(--text);
      text-decoration: none;
    }

    &__date {
      color: var(--text-light);
      font-size: var(--text-xs);
    }

    // @media (prefers-color-scheme: dark) {
    //   color: var(--text-inverse);

    //   &__title-link {
    //     color: var(--text-inverse);
    //   }
    // }
  }
</style>
