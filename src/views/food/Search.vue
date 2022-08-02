<template>
  <div class="foods-search-page fixed-top bg-white" :style="{minHeight: `${screenHeight}px`}">
      <nav class="navbar navbar-light food-navbar" ref="foodSearchNav">
        <div class="container d-block p-0">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto p-0">
              <div class="row">
                <div class="col-2 pr-0">
                  <button type="button" class="btn btn-block" @click="$router.go(-1)">
                    <i class="mdi mdi-close"></i>                    
                  </button>
                </div>
                <div class="col-7 pr-0 pl-0">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text no-border bg-white">
                        <i class="mdi mdi-cloud-search-outline"></i>
                      </span>
                    </div>
                    <input type="search" ref="inputKeyword" class="form-control underline text-center" placeholder="음식명을 입력해 주세요" @input="onInputValue">
                  </div>
                </div>                
                <div class="col-3 pl-0 col-form-label">
                  <button type="button" class="btn btn-sm btn-block text-primary" @click="onClickComplete()">
                    <span class="badge badge-primary" v-if="Object.keys(selectedFoods).length > 0">
                      {{ Object.keys(selectedFoods).length }}
                    </span>
                    완료
                  </button>
                </div>
              </div>               
            </div>
          </div>        
        </div>
      </nav>
      <div class="container search-results">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-1">            
            <div v-if="searchResults">
              <div class="list-group" v-if="searchResults.length > 0">
                <a href="javascript:;" class="list-group-item list-group-item-action text-center" v-for="(item, index) of searchResults" :key="index" @click="onClickSelectItem($Utils.cloneObject(item))">
                  <span v-if="!item.is_input" v-html="hightLightText(inputKeyword, item.name)"></span>
                  <span v-else>
                    <strong>'{{ item.name }}'</strong> 등록하기
                  </span>
                </a>      
              </div>
            </div>            
            <div v-else>
              <div class="text-center pb-1 pt-1">
                <small v-if="selectableCount - Object.keys(selectedFoods).length > 0">
                  <span class="text-primary">{{ selectableCount - Object.keys(selectedFoods).length }}</span>개 선택가능합니다
                </small>
                <small v-else>
                  메뉴를 모두 선택하셨습니다. 상단의 <span class="text-primary">완료</span> 버튼을 눌러주세요
                </small>
              </div>
              <div class="selected-results">
                <button type="button" class="btn btn-sm btn-rounded btn-primary m-1" 
                  v-for="(value, key) in selectedFoods" :key="key" @click="$delete(selectedFoods, key)">
                  <span class="pr-3">{{ value.name }}</span> <i class="mdi mdi-close"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
</template>

<script>

export default {
  name: 'SearchFoodsPage',  
  data() {
    return {      
      inputKeyword: '',
      searchRows: [],
      alreadySelected: {},
      selectedFoods: {}     
    }
  },
  mounted() {    
    this.loadAlreadySelectedFoods()
    this.$refs.inputKeyword.focus()
  },
  methods: {
    loadAlreadySelectedFoods() {
      let foods = localStorage.getItem('selected_foods')
      foods = (foods) ? JSON.parse(foods) : {}
      this.alreadySelected = foods
    },  
    async loadSearchRows() {
      const reqParams = {
        keyword: this.inputKeyword
      }
      let response = await this.$Api.get('/api/foods', {params: reqParams})
      this.searchRows = response.foods
    },    
    onInputValue(evt) {
      this.inputKeyword = evt.target.value
      if(this.inputKeyword.length < 1) {
        this.searchRows = []
        return
      }
      this.loadSearchRows()
    },
    onClickSelectItem(data) {
      if((this.selectableCount - this.selectedFoods.length) <= 0){
        this.searchRows = []
        this.inputKeyword = ''
        this.$refs.inputKeyword.value = ''
        this.$toasted.error('더 선택 할 수 없습니다')
        return
      }

      data.name = data.name.replace(/ /g, '')      
      if(this.selectedFoods[data.name] || this.alreadySelected[data.name]) {
        this.searchRows = []
        this.inputKeyword = ''
        this.$refs.inputKeyword.value = ''
        this.$toasted.error(`'${data.name}' 이미 선택된 음식 입니다`)
        return
      }

      this.selectedFoods[data.name] = this.$Utils.cloneObject(data)
      this.inputKeyword = ''
      this.$refs.inputKeyword.value = ''
      this.searchRows = []
      this.$refs.inputKeyword.focus()
    },
    hightLightText(searchTxt, rawTxt) {
      if(searchTxt == '') return rawTxt
      const pattern = new RegExp(searchTxt, 'gi')
      return rawTxt.replace(pattern, `<strong class='text-primary'>${searchTxt}</strong>`)
    },
    onClickComplete() {      
      const selectedFoods = Object.keys(this.selectedFoods).reduce((acc, item)=>{
        const food = this.selectedFoods[item]
        delete food.is_input
        delete food.count
        food.amount = 1
        acc[item] = food
        return acc
      }, {})
      const saveFoods = Object.assign(this.alreadySelected, selectedFoods)      
      localStorage.setItem('selected_foods', JSON.stringify(saveFoods))
      this.$router.go(-1)
    }
  },
  computed: {
    searchResults() {
      if(this.inputKeyword == '') {
        return null
      }      
      const searchRows = this.searchRows.reduce((acc, item)=>{        
        item.is_input = false
        acc.push(item)
        return acc
      }, [])      
      
      let isContainKeyword = searchRows.reduce((acc, item)=>{
        if(acc) return acc
        acc = (item.name == this.inputKeyword)        
        return acc
      }, false)      
      if(isContainKeyword) return searchRows
      searchRows.push({name: this.inputKeyword, unit: '인분', is_input: true})           
      return searchRows
    },
    latestFoods() {
      return this.$store.getters['getLatestFoods']
    },    
    selectableCount() {
      const alreadySelectedCnt = Object.keys(this.alreadySelected).length      
      return this.$Constants.SelectedFoodsLimit - alreadySelectedCnt
    }
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>
.foods-search-page{  
  // top: 2000px;
  // transition: bottom .3s ease-in-out;
  // &.show{    
  //   top: 0;
  // }  
  .selected-results{
    overflow: auto;
    white-space: nowrap;
    padding: .5rem;
    .btn{
      display: inline-block;
    }
  }
}
</style>