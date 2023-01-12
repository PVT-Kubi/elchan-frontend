import { createRouter, createWebHistory } from 'vue-router'
import BViewVue from '@/views/BView.vue'
import AutViewVue from '@/views/AutView.vue'
import DzViewVue from '@/views/DzView.vue'
import ElekViewVue from '@/views/ElekView.vue'
import ProViewVue from '@/views/ProView.vue'
import InfViewVue from '@/views/InfView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'general',
      component: BViewVue
    },
    {
      path: '/b/',
      name: 'b',
      component: BViewVue
    },
    {
      path: '/pro/',
      name: 'pro',
      component: ProViewVue
    },
    {
      path: '/elek/',
      name: 'elek',
      component: ElekViewVue
    },
    {
      path: '/aut/',
      name: 'aut',
      component: AutViewVue
    },
    {
      path: '/dz/',
      name: 'dz',
      component: DzViewVue
    },
    {
      path: '/inf/',
      name: 'inf',
      component: InfViewVue
    }
  ]
})

export default router
