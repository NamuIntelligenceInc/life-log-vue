<template>
  <div class="food-page">
     <nav class="navbar navbar-light bg-primary">
      <div class="container d-block">
        <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
          <i class="mdi mdi-arrow-left"></i>
          <span class="ml-3" v-if="inputDate">
            {{ $Utils.dateFormat(new Date(inputDate), 'yy.M.d') }} 
            <span v-if="inputType">
              {{ inputType }}
            </span>
            등록
          </span>
        </button>
      </div>
    </nav>
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">          
          <search-input :placeholder="'음식명을 입력해 주세요'"/>
          <div v-if="Object.keys(choicedFoods).length > 0">
            <div class="card mb-3" v-for="(value, key) in choicedFoods" :key="key">
              <div class="card-body p-1">
                <div class="row">
                  <div class="col-2">
                    <button type="button" class="btn btn-sm text-secondary" @click="removeChoicedItemKey=key">
                      <i class="mdi mdi-minus-circle mr-2"></i>                    
                    </button>
                  </div>
                  <div class="col-10">                    
                    <div class="row">
                      <div class="col-xl-5 col-12">
                        <strong>{{ value.name }}</strong>
                      </div>
                      <div class="col-xl-4 col-6">
                        <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                          <span class="pl-3 pr-3 text-primary" style="width: 80px;">{{ value.amount }}</span>
                          <small class="text-secondary">인분</small>
                        </div>
                      </div>
                      <div class="col-xl-3 col-6 text-right">
                        <button type="button" class="btn btn-sm btn-primary mr-2" @click="onClickAmtControl(value, -1)">
                          <i class="mdi mdi-minus"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-primary" @click="onClickAmtControl(value, 1)">
                          <i class="mdi mdi-plus"></i>
                        </button>
                      </div>
                    </div>                    
                  </div>                  
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-3 text-center text-secondary">
            <i class="mdi mdi-information"></i>
            음식명을 검색하여 추가해 주세요
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <button type="button" class="btn btn-block btn-outline-secondary">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-block btn-outline-primary" 
                :disabled="Object.keys(choicedFoods).length == 0" @click="onClickComplete()">
                <i class="mdi mdi-check"></i> 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>    
    <confirm-modal v-if="removeChoicedItemKey" :msg="`<strong class='text-primary'>${removeChoicedItemKey}</strong> 메뉴를 제외하시겠습니까?`" 
      @on-close="removeChoicedItemKey=null" @on-confirm="$delete(choicedFoods, removeChoicedItemKey);removeChoicedItemKey=null"/>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
export default {
  name: 'FoodAddPage',
  components: {
    SearchInput
  },
  data() {
    return {
      inputDate: null,
      inputType: null,
      foodKeyword: null,      
      searchResults: [
        '자장면',
        '소불고기볶음밥'
      ],
      choicedFoods: {
        '자장면': {
          name: '자장면',
          amount: 1
        }
      },
      removeChoicedItemKey: null,
      isCanRouteLeave: true
    }
  },
  created() {
    this.inputDate = this.$route.params.date
    this.inputType = this.$route.params.type
  },
  mounted() {
    
  },
  beforeRouteLeave(to, from, next) {
    if(this.isCanRouteLeave){
      return next()
    }
    
    if (confirm('이 사이트에서 나가시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.')) {
      next()
    }else{
      window.history.pushState(null, null, null)
    }
  },
  methods: {    
    onChangeFoodItem(evt) {
      const value = evt.target.value
      if(value == '') return
      let foodName = value.trim().replace(/ /g, '')
      const foodItem = {
        name: foodName,
        amount: 0.5        
      }
      this.$set(this.choicedFoods, foodName, foodItem)      
      evt.target.value = ''
      this.foodKeyword = ''
    },
    onInputFoodItem(evt) {
      this.foodKeyword = evt.target.value
    },
    onClickAmtControl(data, val) {
      let nextAmt = data.amount + (0.5 * val)
      if(nextAmt < 0.5) {
        this.removeChoicedItemKey = data.name
        return
      }

      data.amount = nextAmt
    },
    onClickComplete() {
      this.isCanRouteLeave = true
      this.$router.go(-1)
    }
  },
  computed: {
    
  }
}
</script>