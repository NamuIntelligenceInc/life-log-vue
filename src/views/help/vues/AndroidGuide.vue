<template>
  <div class="android-guide-page">    
    <div class="row">
      <div class="col-md-6 ml-auto mr-auto">
        <div class="mb-3">
          <div class="mb-3">
            <strong>홈화면으로 이동</strong>한 뒤 그림과 같은 순서대로 버튼을 터치해 주세요
          </div>
          <img class="w-100 mb-3" src="/images/samsung_01.png"/>
          <img class="w-100 mb-3" src="/images/samsung_02.png"/>
          <img class="w-100 mb-3" src="/images/samsung_03.png"/>
          <img class="w-100 mb-3" src="/images/samsung_04.png"/>
          <img class="w-100 mb-5" src="/images/samsung_05.png"/>
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
  name: 'AndroidGuidePage'
}
</script>

<style lang="scss" scoped>
img{
  border: 1px solid #ddd;
}
</style>