<template>
  <div class="home-page bg-primary pl-2 pr-2 pb-2">
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
                  <router-link :to="'/'" class="btn text-white">
                    <i class="mdi mdi-account-circle"></i> <small>마이페이지</small>
                  </router-link>
                </div>
                <div class="dropdown d-block d-md-none">
                  <button class="btn text-white" type="button" id="btnDropdownMenu" data-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-menu"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnDropdownMenu">
                    <router-link :to="'/'" class="dropdown-item">
                      <i class="mdi mdi-help-circle"></i> <small>도움말</small>
                    </router-link>
                    <router-link :to="'/'" class="dropdown-item">
                      <i class="mdi mdi-account-circle"></i> <small>마이페이지</small>
                    </router-link>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </nav>
    <div class="pb-3 mb-3" :style="{marginTop: `${navbarHeight}px`}">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <div class="p-3 text-white">
              <p>목표 종료까지 50일 남았습니다</p>
              <p>성공: 30일</p>
              <p>실패: 3일</p>
              <div class="row">
                <div class="col-6">
                  <div class="d-flex h-100 align-items-end">
                    <h4>누적포인트 </h4>
                  </div>
                </div>
                <div class="col-6 text-right">
                  <h2>
                    <animated-number
                      :value="'13000'"
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
          <div v-if="dateList">
            <daily-card v-for="(item, index) of dateList" :key="index" :payload="dailyData[item]"/>
          </div>          
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
      dateList: null,
      dailyData: null,      
      navbarHeight: 0
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(()=>{      
      this.navbarHeight = this.$refs.navbar.clientHeight          
    })
  },
  methods: {
    init() {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      this.dateList = this.generateDateList(yesterday, 30)      
      this.dailyData = this.loadDailyData(this.dateList)
    },
    generateDateList(start, count) {
      const daysOfYear = []
      const endDt = new Date(start)
      const startDt = new Date(endDt)
      startDt.setDate(startDt.getDate() - count)
      for (let d = new Date(startDt); d <= endDt; d.setDate(d.getDate() + 1)) {
          daysOfYear.push(this.$Utils.dateFormat(new Date(d), 'yyyy-MM-dd'))
      }
      return daysOfYear.reverse()
    },
    loadDailyData(dates) {
      return generatesDailyRows(dates)
    }
  },
  computed: {
    
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
