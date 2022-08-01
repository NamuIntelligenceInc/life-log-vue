<template>
  <div class="guide-install-page pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                <span v-if="$route.query.device">
                  {{ $route.query.device.toUpperCase() }}
                </span>
                홈화면 추가 방법
              </strong>
            </button>
          </div>
        </div>
      </div>      
    </nav>
    <div class="pb-5 pt-5"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <android-guide v-if="deviceType == 'android'"/>
          <ios-guide v-else/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IosGuide from './vues/IosGuide.vue'
import AndroidGuide from './vues/AndroidGuide.vue'
export default {
  name: 'HelpInstallPage',
  components: {
    AndroidGuide,
    IosGuide
  },
  data() {
    return {
      
    }
  },
  computed: {
    deviceType() {
      return this.$route.query.device
    }
  }
}
</script>