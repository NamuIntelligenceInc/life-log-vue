<template>
  <div class="guide-install-page pl-2 pr-2 pb-2" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top m-0 bg-primary" ref="navbar">
      <div class="container d-block">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                도움말
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
          <router-link class="btn btn-block btn-link" :to="'/help/install'">
            Q1. 앱설치는 어떻게 하나요?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>