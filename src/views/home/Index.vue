<template>
  <div class="home-page bg-primary pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary nav-divider" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="row">
              <div class="col-6">
                <a class="navbar-brand font-logo" href="javascript:;">
                  LifeLog
                </a>
              </div>
              <div class="col-6 text-right">
                <button class="btn text-white" type="button" @click="onClickOpenMenu()">
                  메뉴 <i class="mdi" :class="{'mdi-menu': !openMenu, 'mdi-close': openMenu}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="pb-4 pt-5"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto p-0">
          <router-link class="btn btn-block btn-link text-white text-left" :to="'/notice'">
            <i class="mdi mdi-information"></i>
            9월 8일 공지사항 입니다 <i class="mdi mdi-hand-pointing-left"></i> 클릭
          </router-link>
          <div class="p-3 text-white" v-if="userProfile">
            <div class="mb-2">미션 종료까지 <strong>{{ remainDays }}</strong>일 남았습니다</div>
            <router-link :to="`/mypage/rewards`" class="btn btn-block text-white" v-if="sumUserRewards != null">
              <div class="row">
                <div class="col-6 pr-1">
                  <div class="d-flex h-100 align-items-end">
                    <h5 class="mb-0">총 참여 보상금 </h5>
                  </div>
                </div>
                <div class="col-6 text-right pl-1">
                  <h5 class="mb-0">
                    <animated-number
                      :value="sumUserRewards"
                      :round="1"
                      :formatValue="$Utils.numberWithComma"
                      :duration="500"/>&nbsp;
                      <small>원</small>
                  </h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div> 
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">          
          <router-link v-if="firstExInfo" :to="`/info?title=1차 임상검사&date=${firstExInfo.date}&place=${firstExInfo.place}`" class="btn btn-block mb-3" 
            :class="{'btn-success': (firstExInfo.remain_day > 3), 'btn-danger': (firstExInfo.remain_day <= 3) }">
            <div v-if="firstExInfo.remain_day > 0">
              <p class="mb-1">1차 임상검사까지 <strong>{{ firstExInfo.remain_day }}일</strong> 남았습니다.</p>
              <i class="mdi mdi-hand-pointing-right"></i> 터치 후 임상검사정보를 확인해 주세요
            </div>
            <div v-else>
              <p>
                오늘은 1차임상검사 당일입니다.
                터치 하셔서 임상검사정보 확인 후 꼭 임상검사에 참여해 주세요
              </p>
              <i class="mdi mdi-hand-pointing-up"></i> 클릭
            </div>            
          </router-link>
          <router-link v-if="secExInfo" :to="`/info?title=2차 임상검사&date=${secExInfo.date}&place=${secExInfo.place}`" class="btn btn-block mb-3" 
            :class="{'btn-success': (secExInfo.remain_day > 3), 'btn-danger': (secExInfo.remain_day <= 3) }">
            <div v-if="secExInfo.remain_day > 0">
              <p class="mb-1">2차 임상검사까지 <strong>{{ secExInfo.remain_day }}일</strong> 남았습니다.</p>
              <i class="mdi mdi-hand-pointing-right"></i> 터치 후 임상검사정보를 확인해 주세요
            </div>
            <div v-else>
              <p>
                오늘은 2차임상검사 당일입니다.
                터치 하셔서 임상검사정보 확인 후 꼭 임상검사에 참여해 주세요
              </p>
              <i class="mdi mdi-hand-pointing-up"></i> 클릭
            </div>            
          </router-link>
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
      sumUserRewards: null,      
    }
  },
  created() {
    this.init()
    this.loadUserRewards()    
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

      const itemDt = new Date(startDt)
      while(this.$Utils.dateFormat(itemDt, 'yyyy-MM-dd') <= this.$Utils.dateFormat(endDt, 'yyyy-MM-dd')){
        const dateYmd = this.$Utils.dateFormat(new Date(itemDt), 'yyyy-MM-dd')
        dateList.push(dateYmd)
        itemDt.setDate(itemDt.getDate() + 1)
      }
      
      return dateList.reverse()
    },
    async loadUserRewards() {
      let response = await this.$Api.get('/api/users/rewards')         
      const rewards = response.rewards
      this.sumUserRewards = Object.keys(rewards).reduce((acc, item)=>{
        acc += rewards[item]
        return acc
      }, 0)
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
        acc[item].is_disable_day = (diffNum >= this.$Constants.EditableLimitDay)
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
    remainDays() {
      if(!this.userProfile) return 0
      return this.$Utils.diffDays(new Date(this.userProfile.end_dt), new Date())
    },
    firstExInfo() {
      if(!this.userProfile || !this.userProfile.first_ex_dt) return null
      const targetDt = new Date(this.userProfile.first_ex_dt)
      const targetPlace = this.userProfile.first_ex_place      
      if(!targetDt || !targetPlace) return null
      const diff = this.$Utils.diffDays(targetDt, new Date())      
      if(!(diff >= 0 && diff <= 7)) return null
      return {
        date: this.userProfile.first_ex_dt,
        remain_day: diff,
        place: targetPlace    
      }
    },
    secExInfo() {
      if(!this.userProfile || !this.userProfile.sec_ex_dt) return null
      const targetDt = new Date(this.userProfile.sec_ex_dt)
      const targetPlace = this.userProfile.sec_ex_place      
      if(!targetDt || !targetPlace) return null
      const diff = this.$Utils.diffDays(targetDt, new Date())      
      if(!(diff >= 0 && diff <= 7)) return null
      return {
        date: this.userProfile.sec_ex_dt,
        remain_day: diff,
        place: targetPlace    
      }
    }   
  }
}
</script>

<style lang="scss" scoped>

</style>
