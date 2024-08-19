<template>
  <div class="mypage-index-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light fixed-top nav-divider">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3">
                참여 보상내역
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-3 pb-5"></div>
    <div class="container pt-3 pb-3">
      <div class="col-md-6 ml-auto mr-auto p-0 text-white">
        <div class="p-5 text-center" v-if="!rewards">
          <i class="mdi mdi-loading mdi-spin"></i>
        </div>
        <div v-else>
          <div class="pt-3 pb-5 text-center">
            <h5> 
              <i class="mdi mdi-trophy"></i>
              총 참여 보상금
              <animated-number
                :value="sumRewardAmt"
                :round="1"
                :formatValue="$Utils.numberWithComma"
                :duration="500"/>
              &nbsp;<small>원</small>
            </h5>
          </div>
          <div class="row mb-2" v-for="(value, key) in rewards" :key="key">
            <label class="col-7 col-form-label pr-0">
              <i class="mdi mdi-rhombus-medium"></i>
              {{ key }}
            </label>
            <div class="col-5 text-right col-form-label pl-0">
              <i class="mdi mdi-plus"></i>
              <animated-number
                :value="value"
                :round="1"
                :formatValue="$Utils.numberWithComma"
                :duration="500"/> <small>원</small>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from 'animated-number-vue'
export default {
  name: 'RewardPage',
  components: {
    AnimatedNumber
  },
  data() {
    return {
      LabelMap: {
        'daily_reward': '일일 데이터 성공보상',
        'first_ex_reward': '1차 검진 참여보상',
        'sec_ex_reward': '2차 검진 참여보상',
        'month8_reward': '1차 개근 보상',
        'month9_reward': '2차 개근 보상',
        'month10_reward': '3차 개근 보상',
        'more80_reward': '달성율 80% 달성 보상',        
      },
      rewards: null
    }
  },
  created() {        
    this.loadUserRewards()    
  },
  methods: {
    async loadUserRewards() {
      let response = await this.$Api.get('/api/users/rewards')      
      let rewards = response.rewards          
      rewards = Object.keys(rewards).reduce((acc, item)=>{
        const key = this.LabelMap[item]        
        acc[key] = rewards[item]
        return acc
      }, {})
      this.rewards = rewards      
    }
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    sumRewardAmt() {
      return Object.keys(this.rewards).reduce((acc, item)=>{
        acc += this.rewards[item]
        return acc
      }, 0)
    }
  },
  watch: {
    
  }
}
</script>