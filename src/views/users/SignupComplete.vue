<template>
  <div class="signup-page" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                회원가입 완료
              </strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-5 pb-5"></div>
    <div class="container">
      <div class="col-md-6 ml-auto mr-auto">
        <div class="text-center mb-5">
          <div class="welcome-message mb-5">
            <div class="h4">
              <strong class="text-primary">{{ $route.query.name }}</strong>님              
            </div>
            <div>
              <strong>만성질환 인공지능 학습데이터</strong> 연구사업에
              <br>참여해 주셔서 감사합니다
            </div>            
          </div>
          <div class="mb-3">
            혹시 <strong class="text-primary">건강위험평가(HRA)설문</strong>에 참여하셨나요?
          </div>
          <a target="_blank" class="btn btn-lg btn-block btn-link" :href="$Constants.HRALink">
            <i class="mdi mdi-hand-pointing-right"></i>
            지금 설문참여하기
          </a>
        </div>
        <div class="row">
          <div class="col-lg-4 col-6 pr-1 ml-auto">
            <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
              이전 화면
            </button>
          </div>
          <div class="col-lg-4 col-6 pl-1 mr-auto">
            <button type="button" class="btn btn-block btn-primary" @click="$router.push('/signin')">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignupCompletePage',
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  },
  computed: {    
    
  }
}
</script>

<style lang="scss" scoped>
.welcome-message{
  line-height: 1.5;
}
</style>