<template>
  <div class="food-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
     <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3" v-if="inputDate">
                {{ $Utils.dateFormat(new Date(inputDate), 'yyyy.M.d') }} 식단 데이터
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="pt-5"></div>
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="card mb-3" v-for="(value, key) in foodData" :key="key">
            <div class="card-header bg-white no-border">
              <div class="row">
                <div class="col-4 col-form-label">
                  <strong>{{ value.name }} 식단</strong>
                </div>
                <div class="col-8 text-right">                                    
                  <div class="col-form-label text-secondary" v-if="!value.foods">
                    먹지 않음
                  </div>
                  <div v-else>
                    <router-link v-if="value.foods.length > 0" :to="`/food/${inputDate}/add/${value.name}`" type="button" class="btn btn-sm btn-primary btn-rounded">
                      <i class="mdi mdi-plus"></i> 메뉴수정
                    </router-link>                  
                  </div>
                </div>
              </div>
            </div>                        
            <div class="card-body pt-0" v-if="value.foods">
              <div v-if="value.foods.length == 0">
                <button type="button" class="btn btn-sm btn-block btn-secondary mb-1" @click="selectDoNotEat=value.name">
                  먹지 않았습니다
                </button>
                <router-link :to="`/food/${inputDate}/add/${value.name}`" type="button" class="btn btn-block btn-sm btn-success">
                  메뉴를 추가하겠습니다
                </router-link>                  
              </div>
              <div v-else>
                <div class="p-1 pl-3 pr-3" v-for="(item, index) of value.foods" :key="index">
                  <div class="row">
                    <div class="col-9">
                      <i class="mdi mdi-subdirectory-arrow-right mr-2"></i>
                      <strong>{{ item.name }}</strong>
                    </div>
                    <div class="col-3">
                      <strong class="text-primary">{{ item.amount }}</strong> <small> 인분 </small>
                    </div>
                  </div>
                </div>
              </div>              
            </div>            
          </div>          
        </div>
      </div>
    </div>
    <confirm-modal v-if="doNotEatConfirmMsg" :msg="doNotEatConfirmMsg" @on-close="selectDoNotEat=null" @on-confirm="onDoNotEat()"/>
  </div>
</template>

<script>
export default {
  name: 'FoodIndexPage',
  data() {
    return {      
      inputDate: null,
      foodData: {
        morning: {
          name: '아침',          
          foods: [
            {
              name: '자장면',
              amount: 1
            }
          ]
        },
        lunch: {
          name: '점심',          
          foods: []
        },
        dinner: {
          name: '저녁',          
          foods: []
        },
        snack: {
          name: '간식',          
          foods: []
        }
      },
      selectDoNotEat: null
    }
  },
  created() {
    this.inputDate = this.$route.params.date
  },
  mounted() {
    
  },
  methods: {
    onDoNotEat() {
      this.selectDoNotEat = null
      this.foodData.lunch.foods = null
    }
  },
  computed: {
    doNotEatConfirmMsg() {
      if(!this.selectDoNotEat) return null
      return `${this.selectDoNotEat}을 <span class='text-danger'>먹지않음</span> 으로 처리하시면 <br>더이상 메뉴를 추가할 수 없습니다.<br>계속 진행하시겠습니까?`
    },
  }
}
</script>

<style lang="scss" scoped>
.card-header{
  border-radius: 0.25rem!important;
}
</style>