<template>
  <div class="bookmark-foods-selection bottom-sheets fixed-bottom bg-white" :style="{minHeight: `${screenHeight}px`}" :class="{'show': show}">
      <nav class="navbar navbar-light" ref="bookmarkNav">
        <div class="container d-block p-0">
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto p-0">
              <div class="row">
                <div class="col-8">                  
                  <button type="button" class="btn" @click="$router.go(-1)">
                    <i class="mdi mdi-close"></i>
                    <span class="ml-3">
                      <i class="mdi mdi-star"></i>
                      <strong>자주 먹는 음식</strong>
                    </span>
                  </button>
                </div>                
                <div class="col-4">
                  <button type="button" class="btn btn-block text-primary" @click="onClickComplete()">
                    <span class="badge badge-primary" v-if="Object.keys(newSelectedFoods).length">
                      {{ Object.keys(newSelectedFoods).length }}
                    </span>
                    완료
                  </button>
                </div>
              </div>
            </div>
          </div>        
        </div>
      </nav>
      <div class="container" :style="{height: `${scrollHeight}px`, overflowY: 'auto'}">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <p class="text-center">
              <small v-if="!isPreventSelect">
                <span class="text-primary">{{ selectableCount -  Object.keys(newSelectedFoods).length }}</span>개 더 선택 가능합니다
              </small>
              <small v-else>
                모두 선택하셨습니다. <span class="text-primary">완료</span> 버튼을 눌러주세요
              </small>
            </p>
            <ul class="list-group">
              <li class="list-group-item pt-1 pb-1" v-for="(item, index) of bookmarkList" :key="index">
                <div class="row">
                  <div class="col-10 pr-1">
                    <button type="button" class="btn btn-block text-left" 
                      :disabled="selectedFoods.indexOf(item.name) > -1" 
                      :class="{'text-secondary': selectedFoods[item.name]}"
                      @click="onClickToggleItem(item)">
                      <span>                        
                        {{ item.name }} 
                        <i class="mdi mdi-check text-primary" v-if="newSelectedFoods[item.name]"></i>
                      </span>
                      <small v-if="item.is_choiced" class="text-primary">
                        이미 선택됨
                      </small>
                    </button>
                  </div>
                  <div class="col-2 pl-1">
                    <button type="button" class="btn btn-lg text-secondary" @click="removeFood=item.name">
                      <i class="mdi mdi-close-circle"></i>
                    </button>
                  </div>
                </div>
              </li> 
            </ul>
          </div>
        </div>
      </div>
      <confirm-modal v-if="removeFood" :msg="`<strong class='text-primary'>'${removeFood}'</strong> 자주먹는 메뉴에서<br>삭제 하시겠습니까?`" @on-close="removeFood=null" @on-confirm="onConfirmRemove()"/>
    </div>
</template>

<script>

export default {
  name: 'BookmarkFoodsBottomSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    selectedFoods: {
      type: Array,
      default() {
        return []
      }
    },
    selectableCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scrollHeight: 0,
      newSelectedFoods: {},
      removeFood: null,      
    }
  },
  mounted() {
    const navHeight = this.$refs.bookmarkNav.clientHeight
    this.scrollHeight = this.screenHeight - navHeight
  },
  methods: {
    onClickToggleItem(foodData) {      
      if(this.newSelectedFoods[foodData.name]) {
        this.$delete(this.newSelectedFoods, foodData.name)
      }else{
        if(this.isPreventSelect){
          this.$toasted.error('더이상 선택할 수 없습니다')
        }else{
          this.$set(this.newSelectedFoods, foodData.name, foodData)
        }        
      }
    },
    onClickComplete() {
      this.$emit('on-append', this.$Utils.cloneObject(this.newSelectedFoods))
      this.$router.go(-1)
    },
    onConfirmRemove() {      
      this.$store.dispatch('removeBookmarkFood', this.removeFood)
      this.removeFood = null
    }
  },
  computed: {
    bookmarkList() {
      let bookmarkList = this.$store.getters['getBookmarkFoods']
      const resultList = Object.keys(bookmarkList).reduce((acc, key)=>{
        const isChoiced = (this.selectedFoods.indexOf(key) > -1) ? 1: 0
        const obj = bookmarkList[key]
        obj.is_choiced = isChoiced        
        acc.push(obj)
        return acc
      }, [])
      resultList.sort((a, b)=>a.is_choiced > b.is_choiced ? 1: -1)
      return this.$Utils.cloneObject(resultList)
    },
    isPreventSelect() {
      return (this.selectableCount - Object.keys(this.newSelectedFoods).length == 0)
    }
  },
  watch: {
    show(val){
      this.newSelectedFoods = {}
      if(val) {
        document.documentElement.style.overflowY = 'hidden'
      }else{
        document.documentElement.style.overflowY = 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bookmark-foods-selection{
  bottom: -1500px;
  transition: bottom .3s ease-in-out;
  &.show{    
    bottom: 0;
  }
}
</style>