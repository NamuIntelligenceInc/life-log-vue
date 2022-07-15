<template>
  <div class="nav-bottom fixed-bottom bg-white">
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row">
            <div class="col">
              <router-link :to="'/home'" class="btn btn-lg btn-block text-primary">
                <i class="mdi mdi-home"></i>
                <div><small>홈</small></div>
              </router-link>
            </div>
            <!-- <div class="col">
              <router-link :to="'/'" class="btn btn-lg btn-block text-primary">
                <i class="mdi mdi-calendar-plus"></i>
              </router-link>
            </div> -->
            <div class="col">
              <router-link :to="'/'" class="btn btn-lg btn-block text-primary">
                <i class="mdi mdi-account-circle"></i>
                <div><small>마이페이지</small></div>
              </router-link>
            </div>
            <div class="col">
              <router-link :to="'/'" class="btn btn-lg btn-block text-primary">
                <i class="mdi mdi-help-circle"></i>
                <div><small>도움말</small></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bottom{
  box-shadow: 0px 0px 0.125rem rgba(0, 0, 0, .3);
  small{
    font-size: 0.8rem;
  }
}
</style>