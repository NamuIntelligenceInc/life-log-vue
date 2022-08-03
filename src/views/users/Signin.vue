<template>
  <div class="signin-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <div class="container pt-5">
      <div class="col-md-4 ml-auto mr-auto">
        <h1 class="text-white text-center mt-5 font-logo">
          LifeLog          
        </h1>
        <div class="text-center text-white mb-5">
          - 만성질환 인공지능 데이터 수집 -
        </div>
        <form>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text no-border bg-white">
                <i class="mdi mdi-account-outline"></i>
              </span>
            </div>
            <input type="email" class="form-control no-border text-center" v-model.trim="inputId" placeholder="로그인 아이디(nin00000@cu.com)">
          </div>
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span class="input-group-text no-border bg-white">
                <i class="mdi mdi-lock-outline"></i>
              </span>
            </div>
            <input type="password" class="form-control no-border text-center" v-model.trim="inputPwd" placeholder="비밀번호(생년월일 8 자리)" autocomplete="off" @keyup.enter="onClickSignin()">
          </div>
          <div class="text-white mb-4">
            테스트기간이 종료되었습니다.
            <br><strong>8월 3일 17시 10분 이전 가입 사용자</strong> 분들은
            <br>다시 가입 후 이용해주세요.
            <br>사용에 불편을 드려 대단히 죄송합니다
          </div>
          <a target="_blank" :href="$Constants.KakaoChatLink" class="text-left btn btn-block text-white pl-0">
            고객센터( 카카오톡 ) 바로가기 <i class="mdi mdi-hand-pointing-left"></i>
          </a>
          <div class="text-white mb-4">
            초기 회원가입 후 로그인해주세요
          </div>          
          <div class="row">
            <div class="col-6 pr-1">
              <router-link :to="'/signup'" class="btn btn-block bg-white text-primary">
                <i class="mdi mdi-account-plus-outline"></i> 회원가입
              </router-link>
            </div>
            <div class="col-6 pl-1">
              <button type="button" class="btn btn-block bg-white text-primary" @click="onClickSignin()">
                <i class="mdi mdi-check"></i> 로그인
              </button>
            </div>
          </div>
        </form>
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
      inputId: '',
      inputPwd: ''
    }
  },
  mounted() {
    this.$cookies.remove('token')
  },
  methods: {
    async onClickSignin() {
      if(this.inputId == ''){
        this.$toasted.error('아이디를 입력해 주세요')
        return
      }
      if(this.inputPwd == ''){
        this.$toasted.error('비밀번호를 입력해 주세요')
        return
      }
      const reqParams = {
        login_id: this.inputId,
        login_pwd: this.inputPwd
      }
      let response = await this.$Api.get('/api/users/signin', {params: reqParams})      
      if(!response.success){
        this.$toasted.error(response.message)
        return
      }      
      const profile = response.result.profile
      const token = response.result.token
      const tokenExp = response.result.token_exp

      this.$cookies.set('token', token, new Date(tokenExp))
      this.$store.commit('setUserProfile', profile)
      
      const redirectPage = this.$route.query.redirect || '/home'
      this.$router.replace(redirectPage)     
    }
  }
}
</script>
