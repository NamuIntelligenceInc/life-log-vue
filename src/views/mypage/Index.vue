<template>
  <div class="mypage-index-page bg-primary" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3">
                마이페이지
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-3 pb-5"></div>
    <div class="container pt-3 pb-3">
      <div class="row" v-if="userProfile">
        <div class="col-md-6 ml-auto mr-auto">          
          <div class="card mb-3">
            <div class="card-header bg-white">
              <i class="mdi mdi-account-plus-outline mr-1"></i>
              <strong>기본정보</strong>
            </div>
            <div class="card-body">
              <div class="row mb-2">
                <label class="col-3 col-form-label">
                  이름
                </label>
                <div class="col-9 col-form-label">
                  {{ userProfile.name }}
                </div>
              </div>          
              <div class="row mb-2">
                <label class="col-4 col-form-label">
                  생년월일
                </label>
                <div class="col-8 col-form-label">
                  {{ $Utils.dateFormat(new Date(userProfile.birth), 'yyyy.M.d') }}
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-4 col-form-label">
                  아이디
                </label>
                <div class="col-8 col-form-label">
                  {{ userProfile.login_id }}
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-4 col-form-label">
                  시작체중
                </label>
                <div class="col-8 col-form-label">
                  {{ userProfile.weight }} <small>Kg</small>
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-5 col-form-label">
                  평균 흡연량
                </label>
                <div class="col-7">
                  <select class="form-control underline" v-model="formData.smoking_amt">
                    <option v-for="(value, key) in $Constants.Options.SmokingAmt" :key="key" :value="key">
                      {{ value }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-2">
                <label class="col-5 col-form-label">
                  평균 물섭취량
                </label>
                <div class="col-7">
                  <select class="form-control underline" v-model="formData.water_amt">
                    <option v-for="(value, key) in $Constants.Options.WaterAmt" :key="key" :value="key">
                      {{ value }} ({{ key }}ml)
                    </option>
                  </select>
                </div>
              </div>              
            </div>
          </div>          
          <!-- <div class="card mb-3">
            <div class="card-body p-0">
              <div class="pl-3 pr-3 pt-1">
                <div class="row">
                  <label class="col-6 col-form-label">
                    1차 검진일
                  </label>
                  <div class="col-6 text-right col-form-label">
                    2022.07.29
                  </div>
                </div>
                <div class="row">
                  <label class="col-3 col-form-label">
                    <i class="mdi mdi-map-marker-outline"></i>
                    장소
                  </label>
                  <div class="col-9 text-right col-form-label">
                    광주광역시 동구 동명동 143-78
                  </div>
                </div>
              </div>
              <map-view/>
            </div>
          </div>
          <div class="card mb-3" v-if="secUserExam">
            <div class="card-header bg-white no-border pb-0">
              <div class="row">
                <label class="col-6 col-form-label">
                  2차 검진일
                </label>
                <div class="col-6 text-right col-form-label">
                  2022.07.29
                </div>
              </div>
              <div class="row">
                <label class="col-3 col-form-label">
                  <i class="mdi mdi-map-marker-outline"></i>
                  장소
                </label>
                <div class="col-9 text-right col-form-label">
                  광주광역시 동구 동명동 143-78
                </div>
              </div>
            </div>
            <div class="card-body p-0">              
              <map-view/>
            </div>            
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapView from '@/components/MapView.vue'
export default {
  name: 'MypageIndexPage',
  components: {
    MapView
  },
  data() {
    return {
      formData: {
        smoking_amt: '',
        water_amt: ''
      },
      userInfo: {
        first_ex_dt: null,
        sec_ex_dt: null
      }
    }
  },
  created() {    
    this.formData = {
      smoking_amt: this.userProfile.daily_smoking_amt,
      water_amt: this.userProfile.daily_water_amt
    }
  },
  methods: {
   
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    firstUserExam() {
      return null
    },
    secUserExam() {
      return null
    }
  },
  watch: {
    
  }
}
</script>