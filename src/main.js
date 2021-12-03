import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

sessionStorage.token = null


createApp(App).use(store).use(router).mount('#app')
