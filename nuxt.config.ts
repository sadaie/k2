export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: '石高算出機 弐 by 家臣和歌集',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'あなたの石高を算出します'
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@sadaie_p' },
      { hid: 'og:url', name: 'og:url', content: 'https://kokudaka2.matsuri-hi.me/' },
      { hid: 'og:title', name: 'og:title', content: '石高算出機 弐 by 家臣和歌集' },
      { hid: 'og:description', name: 'og:description', content: 'あなあたの石高を算出します' },
      { hid: 'og:image', name: 'og:image', content: 'https://matsuri-hi.me/card_image.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/svg+xml', size: 'any', href: '/favicon.svg' },
      { rel: 'mask-icon', href: 'favicon_black.svg', color: '#5abfb7' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/node_modules/uikit/dist/css/uikit.css' },
    '@/assets/css/custom.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/uikit.ts', ssr: false }],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    sass: ['~/assets/sass/style.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}
