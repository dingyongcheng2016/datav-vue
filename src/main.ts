import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// import router from './router'
import store from './store'
// import dataV from '@jiaminghi/data-view'
import VueCountTo from '@/components/VueCountTo/vue-countTo.vue'

createApp(App)
    .use(store)
    // .use(router)
    // .use(dataV)
    .component('CountTo', VueCountTo)
    .mount('#app')
