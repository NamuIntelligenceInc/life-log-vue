<template>
  <div class="card mb-3">
    <div class="card-body p-2">
      <div class="row mb-2">        
        <div class="col-9 pr-1">
          <button type="button" class="btn"
            @click="onClickBtnBookmark()">
            <i class="mdi h5" :class="{'mdi-star-plus-outline text-secondary': !isBookmarked, 'mdi-star-check text-success': isBookmarked}"></i>            
            <span class="ml-3">{{ payload.name }}</span>
          </button>          
        </div>
        <div class="col-3 text-right pl-1">
          <button type="button" class="btn text-secondary" @click="$emit('on-remove')">
            <i class="mdi mdi-close-circle"></i>
          </button>
        </div>                      
      </div>
      <div class="row">
        <div class="col-8">
          <div class="d-flex w-100 h-100 align-items-center justify-content-end">
            <span class="pr-1 text-primary">
              <strong>{{ payload.amount }}</strong>
            </span>
            <small>
              {{ payload.unit }}
              <span v-if="payload.unit_amt">( {{ payload.unit_amt * payload.amount }}g )</span>              
            </small>
          </div>
        </div>
        <div class="col-4 text-right">
          <button type="button" class="btn btn-sm btn-primary mr-2" @click="$emit('on-increase', -1)">
            <i class="mdi mdi-minus"></i>
          </button>
          <button type="button" class="btn btn-sm btn-primary" @click="$emit('on-increase', 1)">
            <i class="mdi mdi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodItem',
  props: {
    payload: {
      type: Object,
      default() {
        return {}
      }
    },
    isBookmarked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onClickBtnBookmark() {
      const toastMsg = `자주먹는 메뉴 ${(this.isBookmarked) ? '제외': '추가'} : '${this.payload.name}'`
      if(this.isBookmarked){
        this.$emit('on-remove-bookmark')
      }else{
        this.$emit('on-add-bookmark')
      }
      const toastMethod = (this.isBookmarked) ? this.$toasted.error : this.$toasted.success
      toastMethod(toastMsg)
    }
  }
}
</script>