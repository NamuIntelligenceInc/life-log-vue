<template>
  <div class="search-input">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text no-border bg-white">
          <i class="mdi mdi-cloud-search-outline"></i>
        </span>
      </div>
      <input type="search" ref="inputKeyword" class="form-control underline text-center" :placeholder="placeholder" @input="onInputValue">      
    </div>
    <div class="list-group" v-if="searchResults.length > 0">
      <a href="javascript:;" class="list-group-item list-group-item-action" v-for="(item, index) of searchResults" :key="index" @click="onClickSelectItem(item.name)">
        <strong>
          {{ item.name }}
        </strong>
      </a>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String, 
      default: ''
    }
  },
  data() {
    return {
      inputKeyword: '',
      searchRows: []
    }
  },
  created() {
    
  },
  methods: {
    onInputValue(evt) {
      this.inputKeyword = evt.target.value
      if(this.inputKeyword == '') {
        this.searchRows = []
        return
      }
      this.loadSearchRows()
    },
    loadSearchRows() {
      setTimeout(()=>{
        this.searchRows = [
          '감자','고구마','자장면'
        ]
        console.log(this.searchRows)
      }, 300)
    },
    onClickSelectItem(data) {      
      this.inputKeyword = ''
      this.searchRows = []
      this.$refs.inputKeyword.value = ''
      this.$emit('on-selected', data)
    }
  },
  computed: {
    searchResults() {
      if(this.inputKeyword == '') return []
      const searchRows = this.searchRows.reduce((acc, item)=>{
        const obj = {
          name: item,
          is_input: false
        }
        acc.push(obj)
        return acc
      }, [])
      if(this.searchRows.indexOf(this.inputKeyword) > -1) return searchRows
      searchRows.push({name: this.inputKeyword, is_input: true})      
      return searchRows
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input{
  position: relative;
  .list-group{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
    border-radius: 2px !important;
    border: 1px solid $gray-500;
    .list-group-item{
      border: 0;
    }
  }
}
</style>