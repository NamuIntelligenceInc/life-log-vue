<template>
  <div class="error-page bg-primary d-flex align-items-center" :style="{height: `${screenHeight}px`}">
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="text-white text-center h1 mb-2">
            <div class="mb-1">
              <i class="mdi mdi-emoticon-dead-outline mr-2"></i>
              <small>오류발생</small>
            </div>            
          </div>          
          <div class="text-center text-white mb-5">
            <div v-if="errMessage">
              <strong v-if="errCode">
                [{{ errCode }}]
              </strong>
              {{ errMessage }}
            </div>
            <div v-else>
              알수없는 오류가 발생하였습니다
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-8 ml-auto mr-auto">
              <button type="button" class="btn btn-block btn-secondary mb-3" @click="$router.go(-1)">
                <i class="mdi mdi-arrow-left"></i> 뒤로가기
              </button>
            </div>
            <div class="col-md-6 col-8 ml-auto mr-auto">
              <button type="button" class="btn btn-block btn-success mb-3" @click="onClickHome()">
                <i class="mdi mdi-home-outline"></i> 홈으로
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
  name: 'ErrorPage',
  methods: {
    onClickHome() {
      this.$router.replace('/home').catch(()=>{})
    }
  },
  computed: {
    errCode() {
      return this.$route.params.errCode
    },
    errMessage() {
      return this.$Constants.ErrMessages[this.errCode]
    }
  } 
}
</script>