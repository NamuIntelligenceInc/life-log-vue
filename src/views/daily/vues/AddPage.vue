<template>
  <div class="daily-add-page">
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-3" v-if="userProfile.is_smoking">
            <label class="col-6 col-form-label">
              <i class="mdi mdi-smoke"></i>
              흡연량
            </label>
            <div class="col-6">
              <select class="form-control underline text-center" v-model="inputSmoke">
                <option v-for="(value, key) in smokeOption" :key="key" :value="key">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-md-6 col-form-label">
              <i class="mdi mdi-cup-water"></i>
              물섭취량 <span>(생수 500ml 기준)</span>
            </label>
            <div class="col-md-6 col-6 ml-auto">
              <select class="form-control underline text-center" v-model="inputWater">
                <option v-for="(value, key) in waterOption" :key="key" :value="key">                  
                  {{ value }} ({{key}}ml)
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-md-6 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              체중 <span>( 변화가 있다면 수정해 주세요 )</span>
            </label>
            <div class="col-md-6 col-6 ml-auto">
              <div class="row">
                <div class="col-8 pr-1">
                  <input type="number" ref="inputWeight" class="form-control underline text-center" v-model.trim="inputWeight">
                </div>
                <div class="col-4 col-form-label pl-1">Kg</div>
              </div>
            </div>
          </div>          
          <!-- <div class="row mb-5" v-if="userProfile.is_disease"> -->
          <div class="row mb-5">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>
            <div class="col-10 ml-auto mr-auto">
              <div class="row">
                <div class="col" v-for="(value, key) of inputMedicine" :key="key">
                  <button type="button" class="btn btn-block" :class="{'text-dark':!value, 'text-primary': value}" @click="$set(inputMedicine, key, !value)">
                    <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline': !value, 'mdi-checkbox-marked-circle': value}"></i>
                    {{ key }}
                  </button>
                </div>
              </div>
            </div>
          </div>          
          <div class="mb-5">
            <div class="row mb-2">
              <div class="col-8 col-form-label">
                <i class="mdi mdi-bottle-wine-outline"></i>
                음주를 하셨습니까?
              </div>
              <div class="col-4">
                <select class="form-control underline" v-model="selectIsDrinking">
                  <option v-for="(value, key) in $Constants.Selection.YN" :key="key" :value="value.val">
                    {{ value.text }}
                  </option>                  
                </select>
              </div>
            </div>            
            <div class="pt-3 pb-3" v-if="selectIsDrinking == $Constants.Selection.YN.Yes.val">
              <div class="mb-3" v-if="Object.values(drinkingMap).length > 0">
                <div class="card mb-2" v-for="(value, key) in drinkingMap" :key="key">
                  <div class="card-body pt-1 pb-1 pl-2 pr-2">
                    <div class="row">
                      <div class="col-9 text-left col-form-label">                      
                        <div class="pl-3">
                          <strong>{{ value.type }}</strong> <small>({{ $Constants.Options.DrinkAmt[value.amount] }})</small>
                        </div>
                      </div>
                      <div class="col-3">
                        <button type="button" class="btn btn-block" @click="$delete(drinkingMap, key)">
                          <i class="mdi mdi-close-circle text-secondary"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 mb-2 text-center" v-else>
                아래에 <span class="text-primary">+ 음주 추가</span> 버튼을<br>클릭해서 음주 내용을 추가해 주세요
              </div>                            
              <button type="button" class="btn btn-block btn-outline-primary" @click="showDrinkBSheet=true">
                <i class="mdi mdi-plus"></i> 음주 추가
              </button>
            </div>
          </div>
          <div class="mb-5">
            <div class="row mb-2">
              <div class="col-8 col-form-label">
                <i class="mdi mdi-weight-lifter"></i>
                운동을 하셨습니까?
              </div>
              <div class="col-4">                
                <select class="form-control underline" v-model="selectIsExercise">
                  <option v-for="(value, key) in $Constants.Selection.YN" :key="key" :value="value.val">
                    {{ value.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="pt-3 pb-3" v-if="selectIsExercise == $Constants.Selection.YN.Yes.val">
              <div class="mb-3" v-if="Object.values(exerciseMap).length > 0">
                <div class="card mb-2" v-for="(value, key) in exerciseMap" :key="key">
                  <div class="card-body pt-1 pb-1 pl-2 pr-2">
                    <div class="row">
                      <div class="col-9 text-left col-form-label">                      
                        <div class="pl-3">
                          <strong>{{ value.type }}</strong> <small>({{ value.level }} {{ exerciseMinutes[value.min] }})</small>
                        </div>
                      </div>
                      <div class="col-3">
                        <button type="button" class="btn btn-block" @click="$delete(exerciseMap, key)">
                          <i class="mdi mdi-close-circle text-secondary"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 mb-2 text-center" v-else>
                아래에 <span class="text-primary">+ 운동 추가</span> 버튼을<br>클릭해서 운동 내용을 추가해 주세요
              </div> 
              <button type="button" class="btn btn-block btn-outline-primary" @click="showExcBSheet=true">
                <i class="mdi mdi-plus"></i> 운동 추가
              </button>
            </div>
          </div>
          <div class="row mb-5" v-if="!isSaving">
            <div class="col-6 pr-1">
              <button type="button" class="btn btn-block btn-secondary" @click="$router.push('/home')">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6 pl-1">
              <button type="button" class="btn btn-block btn-primary" @click="onClickComplete()">
                <i class="mdi mdi-check"></i> 완료
              </button>
            </div>
          </div>
          <div class="mb-5 text-center text-primary" v-else>
            <i class="mdi mdi-loading mdi-spin"></i> 저장중...
          </div>
        </div>
      </div>
    </div>   
    <exercise-bottom-sheet :show="showExcBSheet" :selected-list="exerciseMap" @on-close="showExcBSheet=false" @on-complete="(data)=>{exerciseMap[data.type]=data;showExcBSheet=false}"/>
    <drink-bottom-sheet :show="showDrinkBSheet" :selected-list="drinkingMap" @on-close="showDrinkBSheet=false" @on-complete="(data)=>{drinkingMap[data.type]=data;showDrinkBSheet=false}"/>
    <confirm-modal v-if="saveConfirmMsg" :msg="saveConfirmMsg" @on-close="resultData=null" @on-confirm="onSave()"/>    
  </div>
</template>


<script>
import ExerciseBottomSheet from './ExerciseBSheet.vue'
import DrinkBottomSheet from './DrinkBSheet.vue'
export default {
  name: 'DailyAddPage',
  components: {
    ExerciseBottomSheet,
    DrinkBottomSheet
  },
  props: {
    date: {
      type: String,
      default: null
    }
  },
  data() {
    return {       
      exerciseMinutes: this.$Constants.Options.ExerciseMinutes,    
      smokeOption: this.$Constants.Options.SmokingAmt,
      waterOption: this.$Constants.Options.WaterAmt,
      inputMedicine: {
        '아침': false,
        '점심': false,
        '저녁': false
      },
      inputSmoke: '10',
      inputWater: '500',
      inputWeight: '80',
      selectIsDrinking: this.$Constants.Selection.YN.No.val,
      selectIsExercise: this.$Constants.Selection.YN.No.val,
      showExcBSheet: false,
      exerciseMap: {},
      showDrinkBSheet: false,
      drinkingMap: {},
      resultData: null,
      isSaving: false   
    }
  },
  created() {
    
  },
  methods: {    
    onClickComplete() {
      this.resultData = null
      if(this.inputWeight == ''){
        this.$toasted.error('체중을 입력해 주세요')
        this.$refs.inputWeight.focus()
        return false
      }
      const reqBody = {
        weight: this.inputWeight,
        water_amt: this.inputWater
      }
      // if(this.userProfile.is_smoking){
      //   reqBody.smoking_amt = this.inputSmoke
      // }
      // if(this.userProfile.is_disease) {
      //   reqBody.medic_morning = (this.inputMedicine['아침']) ? 1 : 0
      //   reqBody.medic_lunch = (this.inputMedicine['점심']) ? 1 : 0
      //   reqBody.medic_dinner = (this.inputMedicine['저녁']) ? 1 : 0
      // }
      reqBody.smoking_amt = this.inputSmoke
      reqBody.medi_morning = (this.inputMedicine['아침']) ? 1 : 0
      reqBody.medi_lunch = (this.inputMedicine['점심']) ? 1 : 0
      reqBody.medi_dinner = (this.inputMedicine['저녁']) ? 1 : 0


      const drinkingList = Object.values(this.drinkingMap)
      const exerciseList = Object.values(this.exerciseMap)
      
      if(this.selectIsDrinking == this.$Constants.Selection.YN.Yes.val) {        
        if(drinkingList.length == 0){
          this.$toasted.error('음주 내용을 추가해 주세요')
          return
        }
        reqBody.is_drinking = 1
        reqBody.drinking_list = drinkingList
      }else{
        reqBody.is_drinking = 0
      }

      if(this.selectIsExercise == this.$Constants.Selection.YN.Yes.val) {
        if(exerciseList.length == 0){
          this.$toasted.error('운동을 추가해 주세요')
          return
        }
        reqBody.is_exercise = 1
        reqBody.exercise_list = exerciseList
      }else{
        reqBody.is_exercise = 0
      }

      reqBody.target_dt = this.date
      console.log(reqBody)
      this.resultData = reqBody      
    },
    async onSave() {
      this.isSaving = true
      let response = await this.$Api.post(`/api/attains/daily`, this.resultData)
      this.isSaving = false
      this.resultData = null
      this.$emit('on-reload')
    },
    onClickCancel() {

    }
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    saveConfirmMsg() {
      if(!this.resultData) return null
      return `현재 입력하신 데이터는 완료 후<br><strong>수정이 불가능</strong> 합니다.<br>계속 진행하시겠습니까?`
    }
  }
}
</script>
