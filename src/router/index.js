import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Index.vue')
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: () => import('@/views/users/Signin.vue')
  },
  {
    path: '/signup',
    name: 'Signin',
    component: () => import('@/views/users/Signup.vue')
  },
  {
    path: '/mission/:day',
    name: 'Mission',
    component: () => import('@/views/mission/Index.vue')
  },
  {
    path: '/daily/:date',
    name: 'DailyIndex',
    component: () => import('@/views/daily/Index.vue')
  },
  {
    path: '/food/:date',
    name: 'FoodsIndex',
    component: () => import('@/views/food/Index.vue')
  },
  {
    path: '/food/:date/add/:type',
    name: 'FoodsAdd',
    component: () => import('@/views/food/Add.vue')    
  },
  {
    path: '/miband/:date',
    name: 'MibandIndex',
    component: () => import('@/views/miband/Index.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
