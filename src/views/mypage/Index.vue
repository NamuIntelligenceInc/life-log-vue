<template>
  <div class="mypage-index-page">
    <nav class="navbar navbar-light bg-primary">
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
    <div class="container pt-5 pb-5">
      <div class="row" v-if="userProfile">
        <div class="col-md-6 ml-auto mr-auto">          
          <div class="row mb-2">
            <label class="col-3 col-form-label">
              이름
            </label>
            <div class="col-9 col-form-label">
              {{ userProfile.name }}
            </div>
          </div>          
          <div class="row mb-2">
            <label class="col-3 col-form-label">
              생년월일
            </label>
            <div class="col-9 col-form-label">
              {{ $Utils.dateFormat(new Date(userProfile.birth), 'yyyy.M.d') }}
            </div>
          </div>
          <div class="row mb-2">
            <label class="col-3 col-form-label">
              아이디
            </label>
            <div class="col-9 col-form-label">
              {{ userProfile.login_id }}
            </div>
          </div>          
          <div class="row mb-2">
            <label class="col-6 col-form-label">
              평균 흡연량
            </label>
            <div class="col-6">
              <select class="form-control underline" v-model="formData.smoking_amt">
                <option v-for="(value, key) in $Constants.Options.SmokingAmt" :key="key" :value="key">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <label class="col-6 col-form-label">
              평균 물섭취량
            </label>
            <div class="col-6">
              <select class="form-control underline" v-model="formData.water_amt">
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
export default {
  name: 'MypageIndexPage',
  data() {
    return {
      formData: {
        smoking_amt: '',
        water_amt: ''
      }
    }
  },
  created() {    
    this.formData = {
      smoking_amt: this.userProfile.daily_smoking_amt,
      water_amt: this.userProfile.daily_water_amt
    }
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    }
  },
  watch: {
    
  }
}
</script>