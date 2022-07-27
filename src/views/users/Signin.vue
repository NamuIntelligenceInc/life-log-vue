<template>
  <div class="signin-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <div class="container pt-5">
      <div class="col-md-4 ml-auto mr-auto">
        <h1 class="text-white text-center mt-5 font-logo">
          LifeLog          
        </h1>
        <div class="text-center text-white mb-5">
          - 라이프 로그 -
        </div>
        <form>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text no-border bg-white">
                <i class="mdi mdi-account-outline"></i>
              </span>
            </div>
            <input type="text" class="form-control no-border text-center" v-model.trim="inputId" placeholder="연락처를 입력해 주세요">
          </div>

          <div class="input-group mb-5">
            <div class="input-group-prepend">
              <span class="input-group-text no-border bg-white">
                <i class="mdi mdi-lock-outline"></i>
              </span>
            </div>
            <input type="password" class="form-control no-border text-center" v-model.trim="inputPwd" placeholder="비밀번호를 입력해 주세요" autocomplete="off">
          </div>                
          <button type="button" class="btn btn-block bg-white text-primary" @click="onClickSignin()">
            <i class="mdi mdi-check"></i> 로그인
          </button>
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
