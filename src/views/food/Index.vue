<template>
  <div class="food-page">
     <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.push('/home')">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3" v-if="dailyFood">
                {{ $Utils.dateFormat(new Date(dailyFood.target_dt), 'yyyy.M.d') }}
                ({{ $Utils.dayOfWeek(new Date(dailyFood.target_dt)) }}요일)
                식단 데이터
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="pt-5"></div>
    <div class="container pt-3 pb-3">
      <div class="row" v-if="dailyFood">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="card mb-3" v-for="(value, key) in dailyFood.items" :key="key">
            <div class="card-header bg-white no-border">
              <div class="row">
                <div class="col-4 col-form-label">
                  <strong>{{ eatTypes[key] }} 식단</strong>
                </div>
                <div class="col-8 text-right">                                    
                  <div class="col-form-label text-danger" v-if="value.is_eating == 0">
                    먹지 않음
                  </div>                  
                </div>
              </div>
            </div>                        
            <div class="card-body pt-0" v-if="value.is_eating == null">
              <div v-if="value.items.length == 0">
                <button type="button" class="btn btn-block btn-secondary mb-1" @click="selectDoNotEat=key">
                  먹지 않았습니다
                </button>
                <router-link :to="`/food/menu?attid=${attainId}&fid=${dailyFood.food_id}&date=${dailyFood.target_dt}&type=${key}`" 
                 class="btn btn-block btn-primary">
                  메뉴를 추가하겠습니다
                </router-link>                  
              </div>                            
            </div>
            <div class="card-body pt-0" v-else-if="value.is_eating == 1">
              <div class="p-1 pl-3 pr-3" v-for="(item, index) of value.items" :key="index">
                <div class="row">
                  <div class="col-8">                      
                    {{ index + 1 }}.
                    <strong>{{ item.name }}</strong>
                  </div>
                  <div class="col-4">
                    <strong class="text-primary">{{ item.amount }}</strong> <small> {{ item.unit_nm }} </small>
                  </div>
                </div>
              </div>
            </div>            
          </div>          
        </div>
      </div>
      <div v-else class="pt-5 pb-5 text-center text-primary">
        <i class="mdi mdi-loading mdi-spin"></i>
      </div>
    </div>
    <confirm-modal v-if="doNotEatConfirmMsg" :msg="doNotEatConfirmMsg" @on-close="selectDoNotEat=null" @on-confirm="onDoNotEat()"/>
    <progress-modal v-if="progressMsg" :msg="progressMsg"/>
  </div>
</template>

<script>
export default {
  name: 'FoodIndexPage',
  data() {
    return {      
      attainId: null,
      eatTypes: this.$Constants.EatTypes,
      attainId: null,
      dailyFood: null,
      selectDoNotEat: null,
      progressMsg: null
    }
  },
  created() {
    this.attainId = this.$route.params.attainId    
    this.loadDailyFoods()
  },
  mounted() {
    localStorage.removeItem('selected_foods')
  },
  methods: {
    async onDoNotEat() {
      const eatType = this.selectDoNotEat
      this.selectDoNotEat = null
      const dFoodId = this.dailyFood.food_id
      const reqBody = {}
      reqBody[eatType] = 0
      this.selectDoNotEat = null
      this.progressMsg = '처리중...'
      let response = await this.$Api.patch(`/api/attains/${this.attainId}/foods/${dFoodId}`, reqBody) 
      this.progressMsg = null
      await this.loadDailyFoods()
      const toastMsg = `${this.$Constants.EatTypes[eatType]}이 먹지않음으로 처리되었습니다`
      this.$toasted.success(toastMsg)
    },
    async loadDailyFoods() {           
      let response = await this.$Api.get(`/api/attains/${this.attainId}/foods`)
      this.dailyFood = response.daily_food     
    }
  },
  computed: {
    doNotEatConfirmMsg() {
      if(!this.selectDoNotEat) return null
      return `<strong>${this.$Constants.EatTypes[this.selectDoNotEat]}을</strong> <span class='text-danger'>먹지않음</span> 으로 처리하시면 <br>변경이 불가능 합니다.<br>계속 진행하시겠습니까?`
    },
  }
}
</script>

<style lang="scss" scoped>
.card-header{
  border-radius: 0.25rem!important;
}
</style>