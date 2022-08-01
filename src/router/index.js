import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import StartPage from '@/views/Start.vue'
import HomeIndexPage from '@/views/home/Index.vue'
import SigninPage from '@/views/users/Signin.vue'
import SignupPage from '@/views/users/Signup.vue'
import SignupCompletePage from '@/views/users/SignupComplete.vue'
import DailyIndexPage from '@/views/daily/Index.vue'
import FoodIndexPage from '@/views/food/Index.vue'
import FoodAddPage from '@/views/food/Add.vue'
import MypageIndexPage from '@/views/mypage/Index.vue'
import InfoIndexPage from '@/views/info/Index.vue'
import AuthenticatePage from '@/views/Authenticate.vue'
import HelpIndexPage from '@/views/help/Index.vue'
import HelpInstallPage from '@/views/help/Install.vue'
import NoticeIndexPage from '@/views/notice/Index.vue'
import ErrorPage from '@/views/Error.vue'

Vue.use(VueRouter)

const userAuthenticate = (to, from , next)=> {
  const userProfile = store.state.user_profile
  if(!userProfile){
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
      const userProfile = store.state.user_profile      
      if(!userProfile){
        next({path: '/authenticate', query: {redirect: '/home'}})
      }else{
        next({path: '/home'})
      }      
    },
  },
  {
    path: '/start',
    name: 'Start',
    component: StartPage,
    beforeEnter(to, from , next) {
      const userProfile = store.state.user_profile
      const token = window.$cookies.get('token')
      if(!token) {
        next({path: '/signin'})
      }else if(!userProfile) {
        next({path: '/authenticate', query: {redirect: to.fullPath}})
      }else{
        if(userProfile.start_dt) {
          next({path: '/home'})
        }else{
          next()
        }
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeIndexPage,
    beforeEnter(to, from , next) {
      const userProfile = store.state.user_profile
      if(!userProfile){
        next({path: '/authenticate', query: {redirect: to.fullPath}})
      }else{
        if(!userProfile.start_dt){
          next({path: '/start'})
        }else{
          next()
        }
      }        
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/signup/complete',
    name: 'SignupComplete',
    component: SignupCompletePage
  },
  {
    path: '/notice',
    name: 'NoticeIndex',
    component: NoticeIndexPage,
    beforeEnter: userAuthenticate
  },
  {
    path: '/daily/:attainId(\\d+)',
    name: 'DailyIndex',
    component: DailyIndexPage,
    beforeEnter: userAuthenticate
  },  
  {
    path: '/food/:attainId(\\d+)',
    name: 'FoodsIndex',
    component: FoodIndexPage,
    beforeEnter: userAuthenticate
  },
  {
    path: '/food/menu',
    name: 'FoodsAdd',
    component: FoodAddPage,
    beforeEnter: userAuthenticate   
  },  
  {
    path: '/mypage',
    name: 'MypageIndex',
    component: MypageIndexPage,
    beforeEnter: userAuthenticate
  },
  {
    path: '/info',
    name: 'InfoIndex',
    component: InfoIndexPage,
    beforeEnter: userAuthenticate
  },
  {
    path: '/help',
    name: 'HelpIndexPage',
    component: HelpIndexPage
  },
  {
    path: '/help/install',
    name: 'HelpInstallPage',
    component: HelpInstallPage
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: AuthenticatePage
  },
  {
    path: '/error/:errCode',
    name: 'Error',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
