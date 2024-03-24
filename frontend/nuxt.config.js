// https://nuxt.com/docs/api/configuration/nuxt-config
const sanityConfig = {
  projectId: process.env.NUXT_ENV_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-03-25'
}

const sitemapUrls = async () => {
  const sanityClient = require('@sanity/client');
  const client = await sanityClient({
    ...sanityConfig,
    useCdn: true,
  });

  const query = '*[_type == "post"] { slug, _updatedAt }';
  const blogposts= await client.fetch(query);

  return blogposts.map((post) => ({
    url: `/posts/${post.slug.current}`,
    lastmod: post._updatedAt,
    changefreq: 'weekly',
    priority: 0.8,
  }));
}

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  css: [
    // SCSS file in the project
    '@/assets/style/variables.scss',
    '@/assets/style/main.scss',
  ],
  modules: [
    'nuxt-icons',
    '@nuxtjs/sanity',
    '@nuxtjs/sitemap'
  ],
  sanity: {...sanityConfig},
  sitemap: {
    urls: sitemapUrls,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/mixins.scss" as *;',
        },
      },
    },
  }
})
