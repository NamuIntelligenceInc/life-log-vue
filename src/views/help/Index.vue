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
          <div class="card">
            <div class="card-header bg-white no-border">
              1. 홈화면 추가를 통해서 앱을 설치하시면 더 편리하게 이용하실수 있습니다
            </div>
            <div class="card-body pt-0">
              <router-link class="btn btn-block btn-link text-left" :to="'/help/install?device=android'">                
                1. 안드로이드 홈화면 추가
              </router-link>
              <router-link class="btn btn-block btn-link text-left" :to="'/help/install?device=ios'">                
                2. 아이폰 홈화면 추가
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>