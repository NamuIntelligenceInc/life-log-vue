<template>
  <div class="mypage-index-page" :style="{minHeight: `${screenHeight}px`}">
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
          <div class="h5">
            <i class="mdi mdi-account-plus-outline mr-1"></i>
            <strong>기본정보</strong>
          </div>
          <hr>
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
          <div class="row mb-2" v-if="userProfile.is_smoking">
            <label class="col-md-4 col-5 col-form-label">
              평균 흡연량
            </label>
            <div class="col-md-4 col-7">
              <select class="form-control underline" v-model="formData.smoking_amt" @change="updateUserInfo()">
                <option v-for="(value, key) in $Constants.Options.SmokingAmt" :key="key" :value="key">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <label class="col-md-4 col-5 col-form-label">
              평균 물섭취량
            </label>
            <div class="col-md-4 col-7">
              <select class="form-control underline" v-model="formData.water_amt" @change="updateUserInfo()">
                <option v-for="(value, key) in $Constants.Options.WaterAmt" :key="key" :value="key">
                  {{ value }} ({{ key }}ml)
                </option>
              </select>
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
  name: 'MypageIndexPage',
  components: {
    MapView
  },
  data() {
    return {
      formData: {
        smoking_amt: '',
        water_amt: ''
      }      
    }
  },
  created() {        
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      let response = await this.$Api.get('/api/users/information')
      const userinfo = response.userinfo      
      const formData = {
        smoking_amt: userinfo.daily_smoking_amt,
        water_amt: userinfo.daily_water_amt
      }
      this.formData = formData
    },
    async updateUserInfo() {
      const reqBody = {        
        daily_water_amt: this.formData.water_amt
      }
      if(this.userProfile.is_smoking) {
        reqBody.daily_smoking_amt = this.formData.smoking_amt
      }
      let response = await this.$Api.patch('/api/users', reqBody)
      this.$store.commit('updateUserProfile', reqBody)
      this.$toasted.success('사용자 정보가 업데이트 되었습니다')
    }
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