<template>
  <div class="ios-guide-page">    
    <div class="row">
      <div class="col-md-6 ml-auto mr-auto">
        <div class="mb-3">
          <div class="mb-3">
            1. 아이디 비번 입력 후 로그인.
            <br>2. 홈화면에서 새로고침 버튼 클릭 후 그림과 같이 진행해 주세요.
          </div>
          <img class="w-100 mb-3" src="/images/ios_01.png"/>
          <img class="w-100 mb-3" src="/images/ios_02.png"/>
          <img class="w-100 mb-3" src="/images/ios_03.png"/>
          <img class="w-100 mb-5" src="/images/ios_04.png"/> 
          <router-link :to="'/home'" type="button" class="btn btn-rounded btn-block btn-primary">
            지금 홈화면으로 이동
          </router-link>         
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IosGuidePage'
}
</script>

<style lang="scss" scoped>
img{
  border: 1px solid #ddd;
}
</style>