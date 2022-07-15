<template>
  <div class="signin-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <div class="container pt-5">
      <div class="col-md-4 ml-auto mr-auto">
        <h1 class="text-white text-center mb-5 mt-5">LifeLog</h1>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text no-border bg-white">
              <i class="mdi mdi-account-outline"></i>
            </span>
          </div>
          <input type="text" class="form-control no-border text-center" placeholder="연락처를 입력해 주세요" maxlength="11">
        </div>

        <div class="input-group mb-5">
          <div class="input-group-prepend">
            <span class="input-group-text no-border bg-white">
              <i class="mdi mdi-lock-outline"></i>
            </span>
          </div>
          <input type="password" class="form-control no-border text-center" placeholder="비밀번호를 입력해 주세요">
        </div>                
        <button type="button" class="btn btn-block bg-white text-primary">
          <i class="mdi mdi-check"></i> 로그인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SigninPage',
  components: {
    
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log(this.screenHeight)
  }
}
</script>
