<template>
  <div class="start-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <div style="padding-top: 5%"></div>
    <transition name="fade">
      <div class="container" v-if="show">
        <h1 class="text-white text-center">LifeLog</h1>
        <div class="text-white mb-5 text-center"> - Your dilay record -</div>
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto text-white">
            <h4 class="mb-3 text-center" style="font-weight: 400;">
              안녕하세요. <strong>{{ userProfile.name }}</strong>님
            </h4>
            <p class="mb-5 text-center">
              지금 시작하기를 누르시고
              <br><strong>{{ userProfile.name }}</strong>님의 하루를 기록해 보세요
            </p>
            <div class="text-center">
              <button type="button" class="btn btn-success" @click="onClickStart()" v-if="!isProcessing">
                <i class="mdi mdi-check"></i> 기록 시작하기
              </button>
              <div class="p-3 text-white" v-else>
                <i class="mdi mdi-loading mdi-spin"></i> 잠시만 기다려주세요...
              </div>
            </div>
          </div>
        </div>      
      </div>
    </transition>    
  </div>
</template>
<script>
export default {
  name: 'StartPage',
  data() {
    return {
      show: false,
      isProcessing: false
    }
  },
  mounted() {
    setTimeout(()=>{
      this.show = true
    }, 500)
  },
  methods: {
    async onClickStart() {
      const startDt = new Date()
      const endDt = new Date(startDt)
      endDt.setDate(endDt.getDate() + 90)
      const reqBody = {
        start_dt: this.$Utils.dateFormat(startDt, 'yyyy-MM-dd'),
        end_dt: this.$Utils.dateFormat(endDt, 'yyyy-MM-dd')
      }
      this.isProcessing = true
      let response = await this.$Api.patch(`/api/users`, reqBody)
      this.isProcessing = false
      const profile = response.profile
      this.$store.commit('setUserProfile', profile)
      this.$router.replace('/home')
    }
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    }
  }
}
</script>