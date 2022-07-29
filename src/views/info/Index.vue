<template>
  <div class="info-index-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                {{ $route.query.title }}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-3 pb-5"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-3 text-white">
            <label class="col-4 col-form-label">
              검진일
            </label>
            <div class="col-8 col-form-label text-right">
              {{ $route.query.date }}
            </div>
          </div>
          <div class="row mb-3 text-white" v-if="placeInfo">
            <label class="col-4 col-form-label">
              검진장소
            </label>
            <div class="col-8 col-form-label text-right">
              <strong>{{ placeInfo.name }}</strong>
            </div>
          </div>
          <div class="card mb-3" v-if="placeInfo">
            <div class="card-body p-0">
              <div class="p-3">                                                
                <i class="mdi mdi-map-marker-outline"></i> {{ placeInfo.address }}
              </div>
              <map-view :lat="placeInfo.lat" :lng="placeInfo.lng"/>
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
        '광주 동구 I-PLEX': {
          name: '광주 동구 I-PLEX',
          address: '광주광역시 동구 동명동 143-78',
          lat: 35.1482745,
          lng: 126.9257647
        },
        '광주 첨단 테크노파크': {
          name: '광주 첨단 테크노파크',
          address: '광주광역시 북구 대촌동 958-3',
          lat: 35.229326,
          lng: 126.8618778
        },
        '광주 전남대병원': {
          name: '광주 전남대병원',
          address: '광주광역시 동구 제봉로 42',
          lat: 35.1416819,
          lng: 126.9220315
        },
        '광주 스마트인재개발원(동구)': {
          name: '광주 스마트인재개발원(동구)(x)',
          address: '주소',
          lat: 35.1482745,
          lng: 126.9257647
        },
        '광주 스마트인재개발원(남구)': {
          name: '광주 스마트인재개발원(남구)',
          address: '광주광역시 남구 송암로 60 광주CGI센터 2층',
          lat: 35.1104947,
          lng: 126.8777619
        },
        '광주 전남대학교': {
          name: '광주 전남대학교',
          address: '광주광역시 북구 용봉로 77',
          lat: 35.1761175,
          lng: 126.9058167
        },
        '서울 광화문 이루온아이앤에스': {
          name: '서울 광화문 이루온아이앤에스(x)',
          address: '주소',
          lat: 35.1482745,
          lng: 126.9257647
        },
        '서울 강남구 삼성동 나무기술': {
          name: '서울 강남구 삼성동 나무기술',
          address: '서울특별시 강남구 삼성로 531 고운빌딩',
          lat: 37.5093206,
          lng: 127.0548766
        },
        '서울 성동구 씨젠의료재단': {
          name: '서울 성동구 씨젠의료재단',
          address: '서울특별시 성동구 용답동 2-3',
          lat: 37.5644253,
          lng: 127.0551565
        },
        '경기 판교 이루온아이앤에스': {
          name: '경기 판교 이루온아이앤에스(x)',
          address: '주소',
          lat: 35.1482745,
          lng: 126.9257647
        },
        '부산 부산대병원': {
          name: '부산 부산대병원',
          address: '부산광역시 서구 구덕로 179',
          lat: 35.1004806,
          lng: 129.0190543
        },
        '전남 화순전남대병원': {
          name: '전남 화순전남대병원',
          address: '전남 화순군 화순읍 서양로 322 화순전남대학교병원',
          lat: 35.8468393,
          lng: 127.0023323
        },
        '전북 전북대병원': {
          name: '광주 동구 I-PLEX',
          address: '전라북도 전주시 덕진구 금암2동 건지로 20',
          lat: 35.8468393,
          lng: 127.1411151
        }
      }
    }
  },
  computed: {
    placeInfo() {
      const placeName = this.$route.query.place
      return this.placeList[placeName]
    }
  }
}
</script>