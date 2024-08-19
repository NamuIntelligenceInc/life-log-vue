<template>
  <div class="food-page">
     <nav class="navbar navbar-light bg-primary">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3" v-if="inputDate">
                {{ $Utils.dateFormat(new Date(inputDate), 'yyyy.M.d') }}
                ({{ $Utils.dayOfWeek(new Date(inputDate)) }}요일)                
                <span v-if="inputType">
                  {{ $Constants.EatTypes[inputType] }} 식사
                </span>
                <small>메뉴 등록</small>
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row">
            <div class="col-6 pr-1">              
              <router-link class="btn btn-block" :to="`/food/search`">
                <i class="mdi mdi-cloud-search-outline"></i> 검색
              </router-link>
            </div>
            <div class="col-6 pl-1">              
              <router-link class="btn btn-block" :to="`/food/bookmark`">
                <i class="mdi mdi-star"></i> 자주
                <span class="badge badge-success">
                  {{ Object.keys(bookmarkedFoods).length }}
                </span>
              </router-link>
            </div>            
          </div>
          <hr>          
          <div style="min-height: 300px">
            <div v-if="Object.keys(choicedFoods).length > 0">
              <div>
                <small>                  
                  <strong><i class="mdi mdi-star-plus-outline"></i> 버튼</strong>을 을 누르시면 자주먹는 메뉴에 추가됩니다
                </small>                  
                <br><i class="mdi mdi-plus-box text-primary"></i>, <i class="mdi mdi-minus-box text-primary"></i> 
                <small>버튼으로 양을 조절하신 후
                <span class="text-primary">하단에 완료</span>버튼을 눌러주세요
                </small>
              </div>                              
              <food-item 
                v-for="(value, key) in choicedFoods" :key="key"
                :payload="value"
                :is-bookmarked="bookmarkedFoods[value.name] ? true: false"
                @on-remove="()=>{removeChoicedItemKey=value.name}"
                @on-add-bookmark="()=>{$store.dispatch('addBookmarkFood', value)}"
                @on-remove-bookmark="()=>{$store.dispatch('removeBookmarkFood', value.name)}"
                @on-increase="(incVal)=>{onClickAmtControl(value, incVal)}"/>            
            </div>
            <div v-else class="p-3 text-center text-secondary">
              <i class="mdi mdi-information"></i>
              식사하신 음식을 등록해 주세요
              <br>최대 {{maxChioceCount}}개까지 등록 가능합니다
            </div>
          </div>
          <div class="row mt-5 mb-5" v-if="!isSaving">
            <div class="col-6 pr-1">
              <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6 pl-1">
              <button type="button" class="btn btn-block btn-primary" 
                :disabled="Object.keys(choicedFoods).length == 0" @click="onClickComplete()">
                <i class="mdi mdi-check"></i> 완료
              </button>
            </div>
          </div>
          <div v-else class="mt-5 mb-5 text-center text-primary">
            <i class="mdi mdi-loading mdi-spin"></i> 등록중...
          </div>
        </div>
      </div>
    </div>    
    <confirm-modal v-if="removeChoicedItemKey" :msg="`<strong class='text-primary'>${removeChoicedItemKey}</strong> 메뉴를 제외하시겠습니까?`" 
      @on-close="removeChoicedItemKey=null" @on-confirm="$delete(choicedFoods, removeChoicedItemKey);removeChoicedItemKey=null"/>    
    <confirm-modal v-if="saveConfirmMsg" :msg="saveConfirmMsg" @on-close="saveConfirmMsg=null" @on-confirm="onSave()"/>    
  </div>
</template>

<script>
import FoodItem from './vues/FoodItem.vue'
export default {
  name: 'FoodAddPage',
  components: {    
    FoodItem    
  },
  data() {
    return {
      attainId: null,
      foodId: null,
      maxChioceCount: this.$Constants.SelectedFoodsLimit,
      inputDate: null,
      inputType: null,
      foodKeyword: null,
      choicedFoods: {},      
      saveConfirmMsg: null,
      isSaving: false,
      removeChoicedItemKey: null,
      isCanRouteLeave: true,            
    }
  },
  created() {
    this.attainId = this.$route.query.attid
    this.foodId = this.$route.query.fid
    this.inputDate = this.$route.query.date
    this.inputType = this.$route.query.type
  },
  mounted() {
    this.$store.dispatch('loadBookmarkFoods')
    this.loadSavedFoods()
  },  
  methods: {
    loadSavedFoods() {
      let foods = localStorage.getItem('selected_foods')
      foods = (foods) ? JSON.parse(foods) : {}
      this.choicedFoods = foods
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
      const saveFoods = Object.values(this.choicedFoods)
      if(saveFoods.length == 0){
        this.$toasted.error('등록할 음식이 없습니다')
        return
      }
      this.saveConfirmMsg = `식사 메뉴는 등록 후<br><strong>수정이 불가능</strong>합니다<br>식사 메뉴를 등록하시겠습니까?`
    },
    async onSave() {
      this.saveConfirmMsg = null
      const saveFoods = Object.values(this.choicedFoods)      
      this.isSaving = true
      let response = await this.$Api.post(`/api/attains/${this.attainId}/foods/${this.foodId}/${this.inputType}`, {foods: saveFoods})
      this.isSaving = false
      if(!response.success) {
        this.$toasted.error(response.message)
        return
      }
      this.$toasted.success('식사 메뉴가 등록되었습니다')
      this.$router.go(-1)
    },        
  },
  computed: {
    bookmarkedFoods() {
      return this.$store.getters['getBookmarkFoods']
    }    
  },
  watch: {
    choicedFoods(val) {
      localStorage.setItem('selected_foods', JSON.stringify(val))
    }
  }
}
</script>