<template>
  <div class="signup-page" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <strong class="ml-3">
                회원가입 및 기본정보 설정
              </strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-5 pb-5"></div>
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-4 ml-auto mr-auto">
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 로그인 아이디 ( 연구용 아이디 )
              <br><small class="text-danger">꼭 전달받은 미밴드(zepplife앱) 아이디를 입력해 주세요</small>
            </label>
            <div class="col-12">
              <input type="email" class="form-control underline text-center" v-model.trim="formData.login_id" placeholder="예시)nin00000@cu.com"/>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 생년월일 8자리
              <br><small>(생년월일은 비밀번호로 사용됩니다)</small>
            </label>
            <div class="col-12">
              <input type="number" class="form-control underline text-center" v-model.trim="formData.birth" placeholder="예시)19800301"/>
            </div>
          </div>          
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 연락처를 입력해 주세요<small> (숫자만 입력해 주세요)</small>
            </label>
            <div class="col-12">
              <input type="number" class="form-control underline text-center" v-model.trim="formData.phone" placeholder="예시)01012341234"/>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 이름을 입력해 주세요
            </label>
            <div class="col-12">
              <input type="text" class="form-control underline text-center" v-model.trim="formData.name" placeholder="예시)홍길동"/>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 몸무게를 입력해 주세요 <small>(숫자만 입력해 주세요)</small>
            </label>
            <div class="col-12">
              <input type="number" class="form-control underline text-center" v-model.trim="formData.weight" placeholder="예시)70"/>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              사용하시는 이메일을 입력해 주세요<br><small>(없다면 비워두셔도 됩니다)</small>
            </label>
            <div class="col-12">
              <input type="email" class="form-control underline text-center" v-model.trim="formData.email" placeholder="예시)abc@gmail.com"/>
            </div>
          </div>          
        </div>
        <div class="col-md-4 ml-auto mr-auto">
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 성별이 어떻게 되십니까?
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col" v-for="(value, key) of $Constants.Options.Gender" :key="key">
                  <button type="button" class="btn btn-block" 
                    :class="{'text-primary': (formData.gender == value), 'text-secondary' : (formData.gender != value)}" @click="formData.gender = value">
                    <i class="mdi mdi-check-bold"></i>
                    {{ key }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 만성질환(뇌졸중, 심장병, 고혈압, 당뇨병, 고지혈증, 폐결핵 등) 만성질환 관련 병력이 있으십니까?
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col" v-for="(value, key) of $Constants.Options.YN" :key="key">
                  <button type="button" class="btn btn-block" 
                    :class="{'text-primary': (formData.is_disease == value.val), 'text-secondary' : (formData.is_disease != value.val)}" @click="formData.is_disease = value.val">
                    <i class="mdi mdi-check-bold"></i>
                    {{ value.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3" v-if="formData.is_disease === $Constants.Options.YN.Yes.val">
            <label class="col-12 col-form-label">
              * 만성질환 관련 약을 복용하고 계십니까?
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col" v-for="(value, key) of $Constants.Options.YN" :key="key">
                  <button type="button" class="btn btn-block" 
                    :class="{'text-primary': (formData.is_medicine == value.val), 'text-secondary' : (formData.is_medicine != value.val)}" @click="formData.is_medicine = value.val">
                    <i class="mdi mdi-check-bold"></i>
                    {{ value.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 흡연을 하십니까?
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col" v-for="(value, key) of $Constants.Options.YN" :key="key">
                  <button type="button" class="btn btn-block" 
                    :class="{'text-primary': (formData.is_smoking == value.val), 'text-secondary' : (formData.is_smoking != value.val)}" @click="formData.is_smoking = value.val">
                    <i class="mdi mdi-check-bold"></i>
                    {{ value.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3" v-if="formData.is_smoking === $Constants.Options.YN.Yes.val">
            <label class="col-12 col-form-label">
              * 하루 흡연량은 어떻게 되십니까?
            </label>
            <div class="col-12">
              <select class="form-control underline" v-model="formData.daily_smoking_amt">
                <option v-for="(value, key) in smokingAmtOptions" :key="key" :value="key">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 하루 물 섭취량은 어떻게 되십니까?
            </label>
            <div class="col-12">
              <select class="form-control underline" v-model="formData.daily_water_amt">
                <option v-for="(value, key) in $Constants.Options.WaterAmt" :key="key" :value="key">
                  {{ value }} ( {{ key }}ml )
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              * 소속(모집)기관이 어떻게 되십니까?
              <br><small>(모집기관을 모르신다면 '기타'를 선택해 주세요)</small>
            </label>
            <div class="col-12">
              <select class="form-control underline" v-model="selectedOrgnzNm">
                <option value="">:: 소속기관선택 ::</option>
                <option v-for="(value, key) in orgnzRows" :key="key" :value="value.name">
                  {{ value.name }}
                </option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5" v-if="!isSaving">
        <div class="col-md-3 col-6 pr-1 ml-auto">
          <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
            <i class="mdi mdi-close"></i>
            취소
          </button>
        </div>
        <div class="col-md-3 col-6 pl-1 mr-auto">
          <button type="button" class="btn btn-block btn-primary" @click="onClickSave()">
            <i class="mdi mdi-check-bold"></i>
            회원가입
          </button>
        </div>
      </div>
      <div v-else class="p-3 text-center text-primary">
        <i class="mdi mdi-loading mdi-spin"></i> 회원가입 진행중...
      </div>
    </div>
    <confirm-modal v-if="saveData" :msg="'입력하신 정보대로<br>회원가입을 진행하시겠습니까?'" @on-close="saveData=null" @on-confirm="onClickSaveConfirm"/>
    <alert-modal v-if="errorMsg" :msg="`<span class='text-danger'>${errorMsg}</span>`" @on-confirm="errorMsg = null"/>
  </div>
</template>
<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      formData: {
        login_id: '',
        birth: '',      
        phone: '',
        name: '',
        weight: '',
        email: '',
        gender: this.$Constants.Options.Gender['남자'],
        is_medicine: this.$Constants.Options.YN.No.val,
        is_disease: this.$Constants.Options.YN.No.val,
        is_smoking: this.$Constants.Options.YN.No.val,
        daily_smoking_amt: '10',
        daily_water_amt: '250'        
      },      
      selectedOrgnzNm: '',
      orgnzRows: {},
      saveData: null,
      isSaving: false,
      errorMsg: null
    }
  },
  created() {    
    this.selectedOrgnzNm = this.$route.query.orgnz_nm || ''
    this.loadOrgnzRows()
  },
  methods: {
    async loadOrgnzRows() {
      let response = await this.$Api.get('/api/orgnz')
      const items = response.items      
      let itemsToMap = items.reduce((acc, item)=>{
        const obj = {
          id: item.pid,
          name: item.name
        }
        acc[obj.name] = obj
        return acc
      }, {})      
      this.orgnzRows = itemsToMap      
    },
    onClickSave() {
      const formData = this.$Utils.cloneObject(this.formData)
      if(formData.login_id == ''){
        this.$toasted.show('아이디를 입력해 주세요')
        return
      }
      if(formData.birth == ''){
        this.$toasted.show('생년월일을 입력해 주세요')
        return
      }      
      if(!this.isInvalidDate(formData.birth)){
        this.$toasted.show('생년월일이 제대로 입력되지 않았습니다')
        return
      }
      if(formData.phone == ''){
        this.$toasted.show('연락처를 입력해 주세요')
        return
      }
      if(formData.name == ''){
        this.$toasted.show('이름을 입력해 주세요')
        return
      }
      if(formData.weight == ''){
        this.$toasted.show('몸무게를 입력해 주세요')
        return
      }      

      if(this.selectedOrgnzNm == ''){
        this.$toasted.show('소속(모집)기관을 선택해 주세요')
        return
      }

      this.saveData = {
        login_id: formData.login_id,
        login_pwd: formData.birth,
        birth: this.$Utils.dateFormat(this.ymdToDate(formData.birth), 'yyyy-MM-dd'),
        phone: formData.phone,
        name: formData.name,
        weight: formData.weight,
        email: (formData.email == '') ? null : formData.email,
        gender: formData.gender,
        is_disease: formData.is_disease,
        is_medicine: formData.is_medicine,
        is_smoking: formData.is_smoking,
        daily_smoking_amt: (formData.is_smoking == this.$Constants.Options.YN.Yes.val) ? formData.daily_smoking_amt : null,
        daily_water_amt: formData.daily_water_amt,
        orgnz_id: (this.selectedOrgnzNm == '기타') ? this.orgnzRows['나무인텔리전스'].id : this.orgnzRows[this.selectedOrgnzNm].id
      }      
    },
    async onClickSaveConfirm() {
      const reqBody = this.$Utils.cloneObject(this.saveData)
      this.saveData = null
      this.isSaving = true
      let response = await this.$Api.post('/api/users/signup', reqBody)
      this.isSaving = false
      if(!response.success){
        this.errorMsg = response.message
      }
      this.$router.push({path: '/signup/complete', query: {name: reqBody.name}})
    },
    ymdToDate(inputDate) {
      if(inputDate.length != 8) return null
      const year = inputDate.substr(0,4)
      const month = inputDate.substr(4,2)      
      const date = inputDate.substr(6,2)
      return new Date(year, month, date)
    },
    isInvalidDate(inputDate) {      
      return this.$Utils.isDateVaild(this.ymdToDate(inputDate))
    }
  },
  computed: {    
    smokingAmtOptions() {
      const options = this.$Utils.cloneObject(this.$Constants.Options.SmokingAmt)
      delete options['0']
      return options
    }
  }
}
</script>