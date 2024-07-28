import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import svgIcon from '@/components/svgIcon/index.vue'
import VueLuckyCanvas from '@lucky-canvas/vue'
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'
import '@/icons'

createApp(App).use(router)
  .use(ElementPlus)
  .component('vue3ScrollSeamless', vue3ScrollSeamless)
  .use(VueLuckyCanvas)
  .component('svg-icon', svgIcon)
  .mount('#app')
