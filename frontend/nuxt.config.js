// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  css: [
    // SCSS file in the project
    '~/assets/style/main.scss', // you should add main.scss somewhere in your app
  ],
  modules: [
    'nuxt-icons',
    '@nuxtjs/sanity',
  ],
  sanity: {
    projectId: process.env.NUXT_ENV_SANITY_PROJECT_ID,
    apiVersion: '2022-03-25'
  },
})
