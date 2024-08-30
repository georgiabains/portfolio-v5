<template>
  <article
    v-if="blog.slug"
    class="blog-card"
    :class="{ 'blog-card--is-featured': isFeatured }"
  >
    <div
      v-if="blog.mainImage?.asset?.url"
      aria-hidden="true"
      class="blog-card__image"
    >
      <img :src="blog.mainImage.asset.url" alt="" />
    </div>

    <div class="blog-card__info">
      <header>
        <component :is="titleElement" class="blog-card__title">
          <a class="blog-card__title-link" :href="getSlug">
            <span v-text="blog.title" />

            <Icon name="custom:arrow-right" aria-hidden="true" />
          </a>
        </component>
      </header>

      <CustomPortableText class="blog-card__excerpt" :value="blog.excerpt" />

      <footer class="blog-card__footer">
        <time
          class="blog-card__date meta"
          :datetime="blog._createdAt"
          v-text="publishDate"
        />
      </footer>
    </div>
  </article>
</template>

<script setup>
  import { formatDate } from '../../utils'
  import CustomPortableText from '../../components/custom-portable-text'

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
    border: 1px solid var(--text-link);
    border-radius: var(--border-radius-m);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    height: 100%;
    padding: var(--spacing-m);
    position: relative;

    &:hover,
    &:focus {
      box-shadow: 0 0 0 var(--spacing-2xs);
      background-color: var(--background-on-hover-shade);
    }

    &:focus-within {
      box-shadow: 0 0 0 var(--spacing-2xs);
      background-color: var(--background-on-hover-shade);

      #{$parent}__title-link:focus {
        border-bottom: none;
        text-decoration: none;
      }
    }

    &__image {
      aspect-ratio: 16 / 9;
      border-bottom: 0;
      border-radius: var(--border-radius-s);
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
      flex-grow: 1;
      gap: var(--spacing-m);
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
      text-decoration: none;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      &:focus {
        text-decoration: underline;
      }
    }

    p {
      font-size: var(--text-s);
    }

    &__footer {
      margin-top: auto;
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

      p {
        font-size: var(--text-xs);
      }
    }
  }
</style>
