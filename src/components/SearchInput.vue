<template>
  <div class="search-input">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text no-border bg-white">
          <i class="mdi mdi-cloud-search-outline"></i>
        </span>
      </div>
      <input type="text" class="form-control underline text-center" :placeholder="placeholder" @input="onInputValue">      
    </div>
    <div class="list-group" v-if="searchResults.length > 0">
      <a href="javascript:;" class="list-group-item list-group-item-action">
        The current link item
      </a>
      <a href="javascript:;" class="list-group-item list-group-item-action">A second link item</a> 
      <a href="javascript:;" class="list-group-item list-group-item-action">A third link item</a>
      <a href="javascript:;" class="list-group-item list-group-item-action">A fourth link item</a>              
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
      searchResults: []
    }
  },
  methods: {
    onInputValue(evt) {
      this.inputKeyword = evt.target.value
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
    display: none;
    &.show{
      display: block;
    }
  }
}
</style>