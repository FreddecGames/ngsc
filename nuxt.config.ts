//---
export default defineNuxtConfig({
    //---
    ssr: false,
    //---
    app: {
        head: {
            title: 'NG Space Company',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            description: 'Incremental space game about resource mining, interstellar exploration and system conquests.',
        }
    },
    //---
    css: [ 'bootstrap/dist/css/bootstrap.min.css', '@fortawesome/fontawesome-svg-core/styles.css', '~/assets/styles.css' ],
    //---
    modules: [
        //---
        [ '@nuxtjs/i18n', {
            lazy: true,
            legacy: false,
            langDir: 'locales',
            defaultLocale: 'en',
            fallbackLocale: 'en',
            locales: [
                { code:'en', file:'en.json',  },
            ],
            detectBrowserLanguage: {
                useCookie: true,
                redirectOn: 'root',
            },
        }],
        //---
        [ '@pinia/nuxt', {
            autoImports: [ 'defineStore', [ 'defineStore', 'definePiniaStore' ] ],
        }],
        //---
        [ 'nuxt-gtag', {
            id:'G-Q1C1RTM5F4',
        }],
    ],
})
