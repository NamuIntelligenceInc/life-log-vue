import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const userAuthenticate = (to, from , next)=> {
  const userInfo = store.state.user_profile
  const token = window.$cookies.get('token')  
  if(!token) {
    next({path: '/signin', query: {redirect: to.fullPath}})
  }else if(!userInfo) {
    next({path: '/authenticate', query: {redirect: to.fullPath}})
  }else{
    next()
  }
}


const routes = [
  {
    path: '/',
    name: 'Index',
    beforeEnter: (to, from, next) => {
      next('/home')
    },
  },,
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Index.vue'),
    beforeEnter: userAuthenticate
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/users/Signin.vue')
  },  
  {
    path: '/daily/add',
    name: 'DailyIndex',
    component: () => import('@/views/daily/Index.vue'),
    beforeEnter: userAuthenticate
  },
  {
    path: '/food/add',
    name: 'FoodsIndex',
    component: () => import('@/views/food/Index.vue'),
    beforeEnter: userAuthenticate
  },
  {
    path: '/food/menu',
    name: 'FoodsAdd',
    component: () => import('@/views/food/Add.vue'),
    beforeEnter: userAuthenticate   
  },
  {
    path: '/miband/:date',
    name: 'MibandIndex',
    component: () => import('@/views/miband/Index.vue'),
    beforeEnter: userAuthenticate
  },
  {
    path: '/mypage',
    name: 'MypageIndex',
    component: () => import('@/views/mypage/Index.vue'),
    beforeEnter: userAuthenticate
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: () => import('@/views/Authenticate.vue')    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
