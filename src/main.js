import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
//import UndrawUi from 'undraw-ui'
//import 'undraw-ui/dist/style.css'
import '@/styles/common.scss'
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')


