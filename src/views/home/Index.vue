<template>
  <div class="home-page bg-primary pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="row">
              <div class="col-9">
                <a class="navbar-brand" href="javascript:;">
                  Life Log
                </a>
              </div>
              <div class="col-3">
                <button class="btn text-white" type="button" @click="onClickOpenMenu()">
                  <i class="mdi" :class="{'mdi-menu': !openMenu, 'mdi-close': openMenu}"></i>
                </button>                
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
              <p>미션 종료까지 <strong>{{ userStatus.remain_day }}</strong>일 남았습니다</p>              
              <div class="row">
                <div class="col-6">
                  <div class="d-flex h-100 align-items-end">
                    <h4>누적포인트 </h4>
                  </div>
                </div>
                <div class="col-6 text-right">
                  <h2>
                    <animated-number
                      :value="userStatus.succ_cnt * $Constants.DailyRewardPrice"
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
            <daily-card v-for="(value, key) of dailyAttainList" :key="key" 
              :payload="value"
              @on-start="onClickStart(key)"/>
          </div>          
        </div>
      </div>
    </div>
    <menu-bottom :show="openMenu"/>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
import DailyCard from './vues/DailyCard.vue'
import MenuBottom from '../../components/MenuBottom.vue'
export default {
  name: 'HomePage',
  components: {
    DailyCard,
    AnimatedNumber,
    MenuBottom
  },
  data() {
    return {      
      dailyAttainList: null,      
      navbarHeight: 0,
      userStatus: null,      
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
  },
  methods: {
    async init() {
      let endDt = new Date()
      const todayYmd = this.$Utils.dateFormat(endDt, 'yyyy-MM-dd')
      if(todayYmd > this.userProfile.end_dt){
        endDt = new Date(this.userProfile.end_dt)
      }      
      const dateList = this.generateDateList(this.userProfile.start_dt, endDt)      
      this.dailyAttainList = await this.loadDailyAttainRows(dateList)      
    },
    generateDateList(start, end) {
      const dateList = []      
      const startDt = new Date(start)
      const endDt = new Date(end)
      for (let d = new Date(startDt); d <= endDt; d.setDate(d.getDate() + 1)) {
        const dateYmd = this.$Utils.dateFormat(new Date(d), 'yyyy-MM-dd')        
        dateList.push(dateYmd)
      }
      return dateList.reverse()
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
          target_dt: item,
          daily: null,
          food: null,
          miband: null       
        }
        acc[item] = dataMap[item] || emptyObj
        const diffNum = Math.abs(this.$Utils.diffDays(new Date(item), new Date()))
        acc[item].past_day_cnt = diffNum
        acc[item].is_disable_day = (diffNum >= 3)
        return acc
      }, {})      
    },    
    async onClickStart(targetDt) {      
      let response = await this.$Api.post('/api/attains', {date: targetDt})
      const dailyAttain = response.daily_attain
      const diffNum = this.$Utils.diffDays(new Date(dailyAttain.target_dt), new Date())
      dailyAttain.past_day_cnt = Math.abs(diffNum)
      this.$set(this.dailyAttainList, targetDt, dailyAttain)
    },    
    onClickOpenMenu() {
      if(this.openMenu) {
        this.$router.go(-1)
      }else{
        this.$router.push({path: this.$route.path, query: this.$route.query, hash: '#menu'})
      }
    }   
  },
  computed: {
    openMenu() {
      const bookmarkHash = this.$route.hash
      if(!bookmarkHash) return false
      return bookmarkHash == '#menu'
    },
    userProfile() {
      return this.$store.getters['getUserProfile']
    },    
    isAllLoaded() {            
      const startDt = new Date(this.userProfile.start_dt)
      const diff = this.$Utils.diffDays(new Date(), startDt)
      const loadedSize = (this.dailyAttainList) ? Object.keys(this.dailyAttainList).length : 0      
      return (diff + 1) == loadedSize
    }    
  }
}
</script>

<style lang="scss" scoped>

</style>
