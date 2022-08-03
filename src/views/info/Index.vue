<template>
  <div class="info-index-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary fixed-top nav-divider">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <div class="row">
              <div class="col-8">
                <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
                  <i class="mdi mdi-arrow-left"></i>
                  <strong class="ml-3">
                    {{ $route.query.title }} 정보
                  </strong>
                </button>
              </div>
              <div class="col-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-3 pb-5"></div>
    <div class="container pb-5">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-2 text-white">
            <label class="col-4 col-form-label">
              검진일
            </label>
            <div class="col-8 col-form-label text-right">
              {{ $Utils.dateFormat(new Date($route.query.date),'yyyy년 M월 d일') }}
            </div>
          </div>
          <div class="row mb-2 text-white">
            <label class="col-4 col-form-label">
              검진시간
            </label>
            <div class="col-8 col-form-label text-right">
              09:00 ~ 16:00
            </div>
          </div>
          <div v-if="placeInfo">
            <div class="row mb-2 text-white">
              <label class="col-4 col-form-label">
                검진기관
              </label>
              <div class="col-8 col-form-label text-right">
                <strong>{{ placeInfo.name }}</strong>
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body p-0">
                <div class="p-3">                                                
                  <i class="mdi mdi-map-marker-outline"></i> {{ placeInfo.address }}
                </div>
                <map-view :lat="placeInfo.lat" :lng="placeInfo.lng"/>
              </div>
            </div>
            <a v-if="placeInfo.phone" target="_blank" :href="`tel:${placeInfo.phone}`" class="btn btn-block btn-success mb-3">
              <i class="mdi mdi-phone-in-talk"></i> <strong>{{ placeInfo.name }}</strong> 담당자 연결
            </a>
          </div> 
          <div class="p-3 text-center text-white" v-else>
            {{ $route.query.title }} 위치정보를 찾을 수 없습니다.
            <br>고객센터에 문의해 주세요
          </div>
          <div class="row">
            <div class="col-6 pr-1">
              <a target="_blank" :href="$Constants.KakaoChatLink" class="btn btn-block btn-success">
                <i class="mdi mdi-chat-question"></i> 카톡문의
              </a>
            </div>
            <div class="col-6 pl-1">
              <a target="_blank" :href="`tel:${managerPhoneNumber}`" class="btn btn-block btn-success" :class="{'disabled': !managerPhoneNumber}">
                <i class="mdi mdi-phone-in-talk"></i>
                전화문의                
              </a>
            </div>
          </div>        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MapView from '@/components/MapView.vue'
export default {
  name: 'InfoPage',
  components: {
    MapView
  },
  data() {
    return {
      placeList: {
        '광화문 이루온아이앤에스': {
          name: '광화문 이루온아이앤에스',
          address: '서울 종로구 새문안로 92 오피시아 빌딩 17층 1711호',
          lat: 37.5696602,
          lng: 126.9748903,
          phone: '01045604353'
        },
        '나무기술계열사': {
          name: '나무기술계열사',
          address: '서울 강남구 삼성로 531 고운빌딩 4층 (참나무 회의실)',
          lat: 37.5094585,
          lng: 127.0547742,
          phone: '01022709658'
        },
        '씨젠의료재단': {
          name: '씨젠의료재단',
          address: '서울 성동구 천호대로 320 3층 회의실',
          lat: 37.5643413,
          lng: 127.0551248,
          phone: '01045861663'
        },
        '판교 이루온아이앤에스': {
          name: '판교 이루온아이앤에스',
          address: '경기 성남시 분당구 대왕판교로 660 유스페이스1 A동 905호',
          lat: 37.4003183,
          lng: 127.1066904,
          phone: '01068803310'
        },
        '전북대학교병원': {
          name: '전북대학교병원',
          address: '전북 전주시 덕진구 건지로 20',
          lat: 35.8471872,
          lng: 127.1405894,
          phone: null
        },
        '전남대학교병원': {
          name: '전남대학교병원',
          address: '광주 동구 제봉로 42 전남대학교병원 명학회관 1층',
          lat: 35.1416819,
          lng: 126.9220315,
          phone: '01068635161'
        },
        '전남대학교': {
          name: '전남대학교',
          address: '광주 북구 용봉로 77 전남대학교 자연과학대학 3호관 101호',
          lat: 35.1763614,
          lng: 126.9044061,
          phone: '01032619683'
        },
        '나무인텔리전스': {
          name: '나무인텔리전스',
          address: '광주 동구 동계천로 150 I-PLEX 별관 아돌레카페 IR룸',
          lat: 35.1482745,
          lng: 126.9257647,
          phone: '01023050704'
        },
        '광주테크노파크': {
          name: '광주테크노파크',
          address: '광주 북구 추암로 249 융합기술본부 의료산업지원센터',
          lat: 35.2320651,
          lng: 126.8651519,
          phone: '01062918421'
        },
        '동구 스마트인재개발원': {
          name: '동구 스마트인재개발원',
          address: '광주 동구 예술길 31-15 광주아트센터 4층 D강의장',
          lat: 35.1498595,
          lng: 126.9198297,
          phone: '01092227369'
        },
        '남구 스마트인재개발원': {
          name: '남구 스마트인재개발원',
          address: '광주 남구 송암로 60 광주CGI센터 2층 4강의장',
          lat: 35.1107911,
          lng: 126.8773435,
          phone: '01092227369'
        },
        '화순전남대병원': {
          name: '화순전남대병원',
          address: '전남 화순군 화순읍 서양로 322',
          lat: 35.060188,
          lng: 127.0023323,
          phone: '01068635161'
        },
      },      
    }
  },
  computed: {
    placeInfo() {
      const placeName = this.$route.query.place
      return this.placeList[placeName]
    },
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    managerPhoneNumber() {
      if(!this.userProfile) return null
      const orgnzNm = this.userProfile.orgnz_nm
      const isDisease = this.userProfile.is_disease
      const managerId = `${orgnzNm}-${isDisease}`      
      return this.$Constants.Managers[managerId]
    }
  }
}
</script>