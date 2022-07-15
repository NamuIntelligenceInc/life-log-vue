<template>
  <div class="signin-page bg-primary" :style="{height: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-4 ml-auto mr-auto">
            <div class="row">
              <div class="col-2">
                <button type="button" class="btn btn-block text-white">
                  <i class="mdi mdi-arrow-left"></i>
                </button>
              </div>
              <div class="col-8 col-form-label text-center text-white">
                참여자 확인 및 회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="col-md-4 ml-auto mr-auto">        
        <p class="text-white mb-3">
          참여자 확인을 위해 연락처 인증을 진행합니다.
        </p>        
        <div class="input-group mb-3">          
          <input type="text" class="form-control no-border text-center" placeholder="연락처를 입력해 주세요">
          <div class="input-group-append">
            <button class="btn btn-success" type="button">
              인증번호 발송
            </button>
          </div>
        </div>

        <div class="input-group mb-5">          
          <input type="text" class="form-control no-border text-center" placeholder="전달 받으신 인증번호를 입력해 주세요.">
        </div>      
        <button type="button" class="btn btn-block bg-white text-primary">
          <i class="mdi mdi-check"></i> 인증하기
        </button>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      screenHeight: 0
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight
  }
}
</script>
