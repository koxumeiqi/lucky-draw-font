import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'nineDraw',
        component: () => import('../views/NineDrawView.vue')
      },
      {
        path: '/luckyWheelDraw',
        name: 'luckyWheelDraw',
        component: () => import('../views/LuckyWheelDrawView.vue')
      },
      {
        path: '/raffleBox',
        name: 'raffleBox',
        component: () => import('../views/RaffleBoxView.vue')
      }, {
        path: '/integralMallView',
        name: 'integralMallView',
        component: () => import('../views/IntegralMallView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
