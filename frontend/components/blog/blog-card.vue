<template>
  <article
    v-if="blog.slug"
    class="blog-card"
    :class="{ 'blog-card--is-featured': isFeatured }"
  >
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

          <Icon name="custom:arrow-right" aria-hidden="true" />
        </a>
      </component>

      <time
        class="blog-card__date meta"
        :datetime="blog._createdAt"
        v-text="publishDate"
      />
    </header>
  </article>
</template>

<script setup>
  import { formatDate } from '../../utils'

  const props = defineProps({
    blog: {
      type: [Object],
    },
    isFeatured: {
      type: Boolean,
      default: false,
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
    return formatDate(props.blog._createdAt)
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
      border-bottom: 0;
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

      &:hover {
        border-bottom: 0;
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

      .icon {
        margin-inline-start: var(--spacing-xs);
        vertical-align: sub;
      }
    }

    &__title-link {
      border-bottom: 0;
      color: var(--text);
      text-decoration: none;
    }

    &__date {
      font-size: var(--text-xs);
    }

    /**
     * Featured blog card.
     */
    &--is-featured {
      align-items: center;
      display: grid;

      #{$parent}__title-link {
        font-size: var(--text-xl);
      }

      #{$parent}__date {
        font-size: var(--text-s);
      }
    }

    @media screen and (min-width: 1024px) {
      &--is-featured {
        gap: var(--spacing-4xl);
        grid-template-columns: 5fr 7fr;
      }
    }

    // @media (prefers-color-scheme: dark) {
    //   color: var(--text-inverse);

    //   &__title-link {
    //     color: var(--text-inverse);
    //   }
    // }
  }
</style>
