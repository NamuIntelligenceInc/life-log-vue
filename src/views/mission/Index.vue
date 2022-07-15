<template>
  <div class="mission-index-page">
    <nav class="navbar navbar-light">
      <div class="container d-block">
        <div class="row">
          <div class="col-3">
            <button type="button" class="btn btn-block">
              <i class="mdi mdi-arrow-left"></i>
            </button>
          </div>
          <div class="col-6 col-form-label text-center">
            <h5>{{ inputDate }}</h5>
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <router-link :to="`/mission/${inputDate}/daily`" class="btn btn-lg btn-block btn-outline-secondary">
            <div class="row">
              <div class="col-9 text-left">
                <i class="mdi mdi-calendar-check"></i>
                일일 데이터
              </div>
              <div class="col-3 text-right">
                <i class="mdi mdi-checkbox-marked-circle-outline"></i>
              </div>
            </div>
          </router-link>
          <router-link :to="`/mission/${inputDate}/food`" class="btn btn-lg btn-block btn-outline-secondary">
            <div class="row">
              <div class="col-9 text-left">
                <i class="mdi mdi-food-outline"></i>
                식단 데이터
              </div>
              <div class="col-3 text-right">
                <i class="mdi mdi-checkbox-marked-circle-outline"></i>
              </div>
            </div>
          </router-link>
          <router-link :to="`/mission/${inputDate}/miband`" class="btn btn-lg btn-block btn-outline-secondary">
            <div class="row">
              <div class="col-9 text-left">
                <i class="mdi mdi-watch-export"></i>
                미밴드 데이터
              </div>
              <div class="col-3 text-right">
                <i class="mdi mdi-checkbox-marked-circle-outline"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionPage',
  data() {
    return {
      inputDate: null
    }
  },
  created() {
    this.inputDate = this.$route.params.day
  }
}
</script>
