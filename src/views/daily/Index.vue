<template>
  <div class="daily-add-page">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.push('/home')">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3">
                {{ $Utils.dateFormat(new Date(inputDate), 'yy.M.d') }} 일일 데이터
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="pt-5"></div>
    <div class="pt-5 pb-5 text-center" v-if="!dailyData">
      <i class="mdi mdi-loading mdi-spin text-primary"></i>
    </div>
    <detail-page v-else-if="dailyData.pid" :payload="dailyData"/>
    <add-page v-else :date="inputDate" @on-reload="loadDailyInput()"/>    
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
      inputDate: null,      
      dailyData: null
    }
  },
  created() {
    this.inputDate = this.$route.query.date
    this.loadDailyInput()
  },
  methods: {
    async loadDailyInput() {
      let response = await this.$Api.post('/api/attains', {date: this.inputDate})
      const attainId = response.attain_id      
      response = await this.$Api.get(`/api/attains/${attainId}/daily`)      
      this.dailyData = response.daily || {}      
    },        
  }
}
</script>


<style lang="scss" scoped>
</style>