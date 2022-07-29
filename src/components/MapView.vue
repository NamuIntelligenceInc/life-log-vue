<template>
  <div class="map-view p-1">
    <div :id="mapContainerId" :style="{height: `${height}px`}"></div>
    <div class="row">
      <div class="col">
        <a target="_blank" class="btn btn-block" :href="`https://map.kakao.com/link/roadview/${lat},${lng}`">
          로드뷰
        </a>
      </div>
      <div class="col">
        <a target="_blank" :href="`https://map.kakao.com/link/map/${placeName},${lat},${lng}`" class="btn btn-block">
          길찾기
        </a>
      </div>
      <div class="col">
        <a target="_blank" :href="`https://map.kakao.com/link/search/${placeName}`" class="btn btn-block">
          크게보기
        </a>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapView',
  props: {
    placeName: {
      type: String,
      default: '나무인텔리전스'
    },
    address: {
      type: String,
      default: '나무인텔리전스 주소'
    },
    height: {
      type: Number,
      default: 300
    },
    lat: {
      type: Number,
      default: 35.1482745
    },
    lng: {
      type: Number,
      default: 126.9257647
    }
  },
  data() {
    return {
      mapContainerId: this.$Utils.genUUID()
    }
  },
  mounted() {
    this.initMap({lat: this.lat, lng: this.lng})
  },
  methods: {
    initMap ({lat, lng}) {      
      const mapContainer = document.getElementById(this.mapContainerId)
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
      }
      const map = new kakao.maps.Map(mapContainer, options)

      const imgSrc = '/images/marker.png',
            imgSize = new kakao.maps.Size(34, 34),
            imgOption = {offset: new kakao.maps.Point(7, 34)}

      const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption),            
            markerPosition  = new kakao.maps.LatLng(lat, lng)

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImg
      })
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map)
    }
  }
}
</script>