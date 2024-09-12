<template>
  <article
    v-if="blog.slug"
    class="blog-card"
    :class="{ 'blog-card--is-featured': isFeatured }"
  >
    <div v-if="blog.mainImage" aria-hidden="true" class="blog-card__image">
      <img
        alt=""
        v-bind="{
          ...getImageProps({
            image: blog.mainImage,
            maxWidth: 900,
            sizes: `(max-width: 320px) 320w, (max-width: 400px) 400w, (max-width: 500px) 500w, (max-width: 640px) 640w, (max-width: 768px) 768w, (max-width: 900px) 900w, (max-width: 1024px) 100vw, (max-width: 1921px) 500w, 25vw`,
          }),
        }"
      />
    </div>

    <div class="blog-card__info">
      <div class="blog-card__top">
        <component :is="titleElement" class="blog-card__title">
          <NuxtLink
            class="blog-card__title-link"
            :to="{ name: 'blog-slug', params: { slug } }"
          >
            {{ blog.title }}
          </NuxtLink>
        </component>

        <div class="meta">
          <SanityContent v-if="isFeatured" :blocks="blog.excerpt" />
        </div>
      </div>

      <footer class="blog-card__footer">
        <ul v-if="blog.tags" class="blog-card__tags list--unstyled meta">
          <li
            v-for="(tag, index) in blog.tags"
            :key="index"
            class="blog-card__tag"
          >
            <Icon
              v-if="index > 0"
              class="blog-card__separator"
              name="custom:circle"
              filled
            />
            {{ tag.title }}
          </li>
        </ul>

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
  import getImageProps from '../../composables/get-image-props'

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
  const slug = computed(() => {
    return props.blog.slug.current
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
      aspect-ratio: 16 / 10;
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
      gap: var(--spacing-l);
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

    &__top {
      display: grid;
      gap: var(--spacing-xs);
    }

    &__footer {
      margin-top: auto;
    }

    &__tags {
      display: flex;
    }

    &__tag {
      display: flex;
      align-items: center;
    }

    &__separator {
      margin-inline: var(--spacing-xs);
      height: var(--icon-xs);
      width: var(--icon-xs);
    }

    /**
     * Featured blog card.
     */
    &--is-featured {
      display: grid;

      #{$parent}__info {
        justify-content: space-between;
        height: 100%;
      }

      #{$parent}__title-link {
        font-size: var(--text-m);
      }
    }

    @media screen and (min-width: 1024px) {
      &--is-featured {
        gap: var(--spacing-xl);
        grid-template-columns: 3fr 4fr;
      }

      &__top {
        gap: var(--spacing-m);
      }

      &__footer {
        font-size: var(--text-xs);
      }
    }
  }
</style>
