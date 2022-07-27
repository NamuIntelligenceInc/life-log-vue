<template>
  <div class="daily-add-page">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.push('/home')">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3" v-if="dailyData">
                {{ $Utils.dateFormat(new Date(dailyData.target_dt), 'yyyy.M.d') }} 일일 데이터
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="pt-5"></div>
    <div>
      <div class="pt-5 pb-5 text-center" v-if="!dailyData">
        <i class="mdi mdi-loading mdi-spin text-primary"></i>
      </div>
      <div v-else>
        <detail-page v-if="dailyData.daily_id" :payload="dailyData"/>
        <add-page v-else :attain-id="Number(attainId)" :date="dailyData.target_dt" @on-reload="loadDailyInput()"/>    
      </div>      
    </div>    
  </div>
</template>

<script>
import DetailPage from './vues/DetailPage.vue'
import AddPage from './vues/AddPage.vue'
export default {
  name: 'DailyPage',
  components: {
    DetailPage,
    AddPage
  },
  data() {
    return {
      attainId: null,          
      dailyData: null
    }
  },
  created() {
    this.attainId = this.$route.params.attainId    
    this.loadDailyInput()
  },
  methods: {
    async loadDailyInput() {      
      let response = await this.$Api.get(`/api/attains/${this.attainId}/daily`)            
      this.dailyData = response.daily || {}      
    },        
  }
}
</script>


<style lang="scss" scoped>
</style>