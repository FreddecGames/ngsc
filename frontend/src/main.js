import { createApp } from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/styles.css'

import { store } from './store'

import i18n from './i18n.js'

import VueGtag from 'vue-gtag'

import App from './App.vue'

createApp(App)
    .use(store)
    .use(i18n)
    .use(VueGtag, { config: { id:'G-Q1C1RTM5F4' } })
    .mount('#app')