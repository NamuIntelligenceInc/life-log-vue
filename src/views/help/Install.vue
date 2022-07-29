<template>
  <div class="guide-install-page pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                앱 설치 방법
              </strong>
            </button>
          </div>
        </div>
      </div>      
    </nav>
    <div class="pb-5"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="card">
            <div class="card-header">
              <i class="mdi mdi-web"></i>
              안드로이드 일반 브라우져
            </div>
            <div class="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpInstallPage',
  data() {
    return {

    }
  }
}
</script>