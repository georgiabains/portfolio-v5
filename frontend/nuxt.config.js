// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    // SCSS file in the project
    '~/assets/style/main.scss', // you should add main.scss somewhere in your app
  ],
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: process.env.NUXT_ENV_PROJECT_ID,
    apiVersion: '2022-03-25'
  },
})
