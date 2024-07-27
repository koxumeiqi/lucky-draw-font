import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import svgIcon from '@/components/svgIcon/index.vue'
import '@/icons'

createApp(App).use(router)
  .use(ElementPlus)
  .component('svg-icon', svgIcon)
  .mount('#app')
