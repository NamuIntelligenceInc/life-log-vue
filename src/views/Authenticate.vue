<template>
  <div class="authenticate-page d-flex justify-content-center align-items-center bg-primary" :style="{height: `${screenHeight}px`}">
    <div>
      <h1 class="text-white text-center mt-5 font-logo">
        LifeLog          
      </h1>
      <h4 class="text-white">
        <i class="mdi mdi-loading mdi-spin mr-2"></i> <small>사용자 확인중...</small>
      </h4>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AuthenticatePage',
  data() {
    return {
      
    }
  },
  mounted() {    
    this.checkAuthenticate()
  },
  methods: {
    async checkAuthenticate() {      
      const token = this.$cookies.get('token')
      if(!token) {
        this.$router.replace({path: '/signin', query: this.$route.query})        
      }else{
        let response = await this.$Api.get('/api/users/profile')
        if(!response){          
          this.$router.replace({path: '/signin', query: this.$route.query}) 
        }else{
          const profile = response.profile
          const token = response.reset_token
          const tokenExp = response.token_exp

          this.$cookies.set('token', token, new Date(tokenExp))
          this.$store.commit('setUserProfile', profile)        
          const redirectPage = this.$route.query.redirect || '/home'
          this.$router.replace(redirectPage) 
        }        
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
