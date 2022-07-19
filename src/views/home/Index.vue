<template>
  <div class="home-page bg-primary pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="row">
              <div class="col-md-6 col-9">
                <a class="navbar-brand" href="javascript:;">
                  Life Log
                </a>
              </div>
              <div class="col-md-6 col-3">
                <div class="text-right d-md-block d-none">                  
                  <router-link :to="'/'" class="btn text-white">
                    <i class="mdi mdi-help-circle"></i> <small>도움말</small>
                  </router-link>
                  <router-link :to="'/mypage'" class="btn text-white">
                    <i class="mdi mdi-account-circle"></i> <small>마이페이지</small>
                  </router-link>
                </div>
                <div class="dropdown d-block d-md-none">
                  <button class="btn text-white" type="button" id="btnDropdownMenu" data-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-menu"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnDropdownMenu">
                    <router-link :to="'/'" class="dropdown-item">
                      <i class="mdi mdi-help-circle-outline"></i> <small>도움말</small>
                    </router-link>
                    <router-link :to="'/mypage'" class="dropdown-item">
                      <i class="mdi mdi-account-circle-outline"></i> <small>마이페이지</small>
                    </router-link>
                    <a href="javascript:;" class="dropdown-item" @click="onClickLogout()">
                      <i class="mdi mdi-logout"></i> 로그아웃
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </nav>
    <div class="pb-3 mb-3" :style="{marginTop: `${navbarHeight}px`}">
      <div class="container" v-if="userStatus">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <div class="p-3 text-white">
              <p>목표 종료까지 <strong>{{ userStatus.remain_day }}</strong>일 남았습니다</p>
              <p>성공 <strong>{{ userStatus.succ_cnt }}</strong> 일</p>
              <p>실패 <strong>{{ userStatus.passed_day - userStatus.succ_cnt }}</strong> 일</p>
              <div class="row">
                <div class="col-6">
                  <div class="d-flex h-100 align-items-end">
                    <h4>누적포인트 </h4>
                  </div>
                </div>
                <div class="col-6 text-right">
                  <h2>
                    <animated-number
                      :value="userStatus.succ_cnt * 4000"
                      :round="1"
                      :formatValue="$Utils.numberWithComma"
                      :duration="500"/>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">          
          <div v-if="dailyAttainList">
            <daily-card v-for="(item, index) of dailyAttainList" :key="index" :payload="item"/>
          </div>
          <h4 class="p-3 text-center text-white" v-if="isLoadMore">
            <i class="mdi mdi-loading mdi-spin"></i>
          </h4>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import { generatesDailyRows } from '@/assets/dummy.js'
import DailyCard from './vues/DailyCard.vue'
export default {
  name: 'HomePage',
  components: {
    DailyCard,
    AnimatedNumber
  },
  data() {
    return {
      DATE_COUNT: 100,
      dailyAttainList: null,      
      navbarHeight: 0,
      userStatus: null,
      isLoadMore: false,
    }
  },
  created() {
    this.init()
    this.loadUserStatus()
  },
  mounted() {
    this.$nextTick(()=>{      
      this.navbarHeight = this.$refs.navbar.clientHeight          
    })
    window.onscroll=(el)=>{
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
      const clientHeight = document.documentElement.clientHeight      
      if(scrollTop + clientHeight >= scrollHeight) {        
        this.onLoadMore()
      }
    }

    console.log(this.isAllLoaded)
  },
  methods: {
    async init() {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const dateList = this.generateDateList(yesterday, this.DATE_COUNT)      
      this.dailyAttainList = await this.loadDailyAttainRows(dateList)      
    },
    generateDateList(start, count) {
      const limitDt = this.userProfile.start_dt      
      const dateList = []
      const startDt = new Date(start)
      const endDt = new Date(start)
      endDt.setDate(endDt.getDate() - count)
      for (let d = new Date(startDt); d > endDt; d.setDate(d.getDate() - 1)) {
        const dateYmd = this.$Utils.dateFormat(new Date(d), 'yyyy-MM-dd')
        if(dateYmd <= limitDt) break;
        dateList.push(dateYmd)
      }
      return dateList
    },
    async loadUserStatus() {
      let response = await this.$Api.get('/api/users/status')
      this.userStatus = response.status
    },
    async loadDailyAttainRows(dates) {
      const reqParams = {
        start_dt: dates[dates.length - 1],
        end_dt: dates[0]
      }
      let response = await this.$Api.get('/api/attains', {params: reqParams})      
      const dataMap = response.attains.reduce((acc, item)=>{
        acc[item.target_dt] = item
        return acc
      }, {})

      return dates.reduce((acc, item)=>{
        const emptyObj = {
          pid: null,
          attain_ts: null,
          target_dt: item,
          daily: 0,
          food: 0,
          miband: 0          
        }
        acc.push(dataMap[item] || emptyObj)
        return acc
      }, [])
      
    },
    async onLoadMore() {      
      if(this.isAllLoaded || this.isLoadMore) return
      this.isLoadMore = true
      let lastDt = this.dateList[this.dateList.length - 1]
      lastDt = new Date(lastDt)
      lastDt.setDate(lastDt.getDate() - 1)
      const appendDateList = this.generateDateList(lastDt, this.DATE_COUNT)
      console.log(appendDateList)
    },
    onClickLogout() {
      this.$cookies.remove('token')
      window.location.reload()
    },    
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },

    isAllLoaded() {      
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const startDt = new Date(this.userProfile.start_dt)
      const diff = this.$Utils.diffDays(yesterday, startDt)
      const loadedSize = (this.dailyAttainList) ? this.dailyAttainList.length : 0      
      return (diff + 1) == loadedSize
    }
  }
}
</script>

<style lang="scss" scoped>
// .items-container{
//   padding: 20px;
//   background-color: aliceblue;
//   border-radius: 20px;
// }
</style>
