// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss',['@nuxtjs/google-adsense', {
    id: 'ca-pub-8150576152002690'
  }],]
})
