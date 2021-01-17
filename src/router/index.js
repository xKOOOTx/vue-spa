import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'create',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List')
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('../views/Task')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
