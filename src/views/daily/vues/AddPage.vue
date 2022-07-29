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
              <select class="form-control underline text-center text-primary" v-model="inputSmoke">
                <option v-for="(value, key) in smokeOption" :key="key" :value="key">
                  {{ value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-md-6 col-form-label">
              <i class="mdi mdi-cup-water"></i>
              물섭취량 <span>( 생수 500ml 기준 )</span>
            </label>
            <div class="col-md-6 col-6 ml-auto">
              <select class="form-control underline text-center text-primary" v-model="inputWater">
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
                  <input type="number" ref="inputWeight" class="form-control underline text-center text-primary" v-model.trim="inputWeight">
                </div>
                <div class="col-4 col-form-label pl-1">Kg</div>
              </div>
            </div>
          </div>
          <div class="row mb-5" v-if="userProfile.is_medicine">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>
            <div class="col-10 ml-auto mr-auto">
              <div class="row">
                <div class="col p-1" v-for="(value, key) of inputMedicine" :key="key">
                  <button type="button" class="btn btn-block" :class="{'text-dark':!value, 'text-primary': value}" @click="$set(inputMedicine, key, !value)">
                    <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline': !value, 'mdi-checkbox-marked-circle-outline': value}"></i>
                    {{ key }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              취침시간
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col pr-1">
                  <select class="form-control underline text-center" v-model="bedForm.type" @change="bedForm.hours='';awakeForm.hours=''">
                    <option v-for="(item, index) of Object.keys(bedOptions)" :key="index" :value="item">
                      {{ item }}
                    </option>                        
                  </select>
                </div>
                <div class="col pr-1 pl-1">                      
                  <select class="form-control underline text-center" ref="selectBedHours" v-model.trim="bedForm.hours">
                    <option value="">:: 시간 ::</option>
                    <option v-for="(item, index) of bedOptions[bedForm.type]" :key="index" :value="item">
                      {{ $Utils.getSeepHoursLabel(item) }}
                    </option>
                  </select>
                </div>
                <div class="col pl-1">
                  <select class="form-control underline text-center" ref="selectBedMins" v-model.trim="bedForm.mins">                    
                    <option v-for="(item, index) of getMinsOptions" :key="index" :value="item">
                      {{ item }} 분
                    </option>
                  </select>                  
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              기상시간
            </label>
            <div class="col-12">
              <div class="row">                
                <div class="col pr-1">                      
                  <select class="form-control underline text-center"
                    ref="awakeHours" 
                    v-model.trim="awakeForm.hours"
                    :disabled="getAwakeHoursOptions.length == 0">
                    <option value="">:: 시간 ::</option>
                    <option v-for="(item, index) in getAwakeHoursOptions" :key="index" :value="item">
                      {{ $Utils.getSeepHoursLabel(item) }}
                    </option>
                  </select>
                </div>
                <div class="col pl-1">                  
                  <select class="form-control underline text-center" ref="selectAwakeMins" 
                    :disabled="getAwakeHoursOptions.length == 0"
                    v-model.trim="awakeForm.mins">                    
                    <option v-for="(item, index) of getMinsOptions" :key="index" :value="item">
                      {{ item }} 분
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-sleep"></i>
              총 수면시간 <small v-if="!sleepTime">(취침시간과 기상시간을 모두 입력해 주세요)</small>
            </label>
            <div class="col-md-8 col-6 text-right ml-auto">
              <div class="form-control underline">
                <span v-if="sleepTime">
                  <strong class="text-primary">{{ sleepTime.hours }}</strong>
                  <small>시간</small>&nbsp;
                  <strong class="text-primary">{{ sleepTime.mins }}</strong>
                  <small>분</small>&nbsp;
                </span>                
              </div>              
            </div>            
          </div>          
          <div class="mb-5">
            <div class="row mb-2">
              <label class="col-6 col-form-label">
                <i class="mdi mdi-bottle-wine-outline"></i>
                음주를 하셨습니까?
              </label>
              <div class="col-6">
                <button class="btn btn-sm m-1" 
                  v-for="(value, key) in $Constants.Options.YN" :key="key"
                  :class="{'text-primary': (selectIsDrinking == value.val)}" @click="selectIsDrinking = value.val">
                  <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline': selectIsDrinking != value.val, 'mdi-checkbox-marked-circle-outline': selectIsDrinking == value.val}"></i>
                  {{ value.text }}
                </button>
              </div>
            </div>            
            <div class="pt-3 pb-3" v-if="selectIsDrinking == $Constants.Options.YN.Yes.val">
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
              <label class="col-6 col-form-label">
                <i class="mdi mdi-weight-lifter"></i>
                운동을 하셨습니까?
              </label>
              <div class="col-6">                
                <button class="btn btn-sm m-1" 
                  v-for="(value, key) in $Constants.Options.YN" :key="key"
                  :class="{'text-primary': (selectIsExercise == value.val)}" @click="selectIsExercise = value.val">
                  <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline': selectIsExercise != value.val, 'mdi-checkbox-marked-circle-outline': selectIsExercise == value.val}"></i>
                  {{ value.text }}
                </button>                
              </div>
            </div>
            <div class="pt-3 pb-3" v-if="selectIsExercise == $Constants.Options.YN.Yes.val">
              <div class="mb-3" v-if="Object.values(exerciseMap).length > 0">
                <div class="card mb-2" v-for="(value, key) in exerciseMap" :key="key">
                  <div class="card-body pt-1 pb-1 pl-2 pr-2">
                    <div class="row">
                      <div class="col-9 text-left col-form-label">                                              
                        <div class="pl-3">
                          <strong>{{ value.type }}</strong> <small>({{ value.level }} {{ exerciseMinutes[value.mins] }})</small>
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
    attainId: {
      type: Number,
      default: null
    },
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
      inputSmoke: '',
      inputWater: '',
      inputWeight: '',

      bedOptions: {
        '어제': [24,23,22,21,20,19,18,17,16,15,14,13],
        '오늘': [1,2,3,4,5,6,7,8,9,10,11,12]
      },
      bedForm: { 
        type: '어제',       
        hours: '',
        mins: '0'
      },
      awakeForm: {        
        hours: '',
        mins: '0'
      },

      selectIsDrinking: this.$Constants.Options.YN.No.val,
      selectIsExercise: this.$Constants.Options.YN.No.val,
      showExcBSheet: false,
      exerciseMap: {},
      showDrinkBSheet: false,
      drinkingMap: {},
      resultData: null,
      isSaving: false,
      
    }
  },
  created() {
    this.inputSmoke = this.userProfile.daily_smoking_amt || ''
    this.inputWater = this.userProfile.daily_water_amt || ''
    this.inputWeight = localStorage.getItem('latest_weight') || this.userProfile.weight
  },
  methods: {    
    onClickComplete() {
      this.resultData = null
      if(this.inputWeight == ''){
        this.$toasted.error('체중을 입력해 주세요')
        this.$refs.inputWeight.focus()
        return false
      }

      if(!this.sleepTime) {
        this.$toasted.error('취침시간과 기상시간을 모두 입력해 주세요')
        return false
      }

      const reqBody = {
        weight: this.inputWeight,
        water_amt: this.inputWater,
        bed_ts: this.$Utils.dateFormat(this.bedDate, 'yyyy-MM-dd HH:mm:00'),
        awake_ts: this.$Utils.dateFormat(this.awakeDate, 'yyyy-MM-dd HH:mm:00')
      }

      if(this.userProfile.is_smoking){
        reqBody.smoking_amt = this.inputSmoke
      }

      if(this.userProfile.is_medicine){
        reqBody.medi_morning = (this.inputMedicine['아침']) ? 1 : 0
        reqBody.medi_lunch = (this.inputMedicine['점심']) ? 1 : 0
        reqBody.medi_dinner = (this.inputMedicine['저녁']) ? 1 : 0
      }

      const drinkingList = Object.values(this.drinkingMap)
      const exerciseList = Object.values(this.exerciseMap)
      
      if(this.selectIsDrinking == this.$Constants.Options.YN.Yes.val) {        
        if(drinkingList.length == 0){
          this.$toasted.error('음주 내용을 추가해 주세요')
          return
        }
        reqBody.is_drinking = 1
        reqBody.drinking_list = drinkingList
      }else{
        reqBody.is_drinking = 0
      }

      if(this.selectIsExercise == this.$Constants.Options.YN.Yes.val) {
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
      
      this.resultData = reqBody      
    },
    async onSave() {
      localStorage.setItem('latest_weight', this.inputWeight)
      this.isSaving = true
      let response = await this.$Api.post(`/api/attains/${this.attainId}/daily`, this.resultData)
      this.isSaving = false
      this.resultData = null
      this.$emit('on-reload')
    }       
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    saveConfirmMsg() {
      if(!this.resultData) return null
      return `현재 입력하신 데이터는 완료 후<br><strong>수정이 불가능</strong> 합니다.<br>계속 진행하시겠습니까?`
    },
    bedDate() {
      let bedType  = this.bedForm.type
      let bedHours = this.bedForm.hours
      let bedMins  = this.bedForm.mins
      if(bedHours == '' || bedMins == '') return null      
      const bedDt  = new Date(this.date)
      if(bedType == '어제'){
        bedDt.setDate(bedDt.getDate() - 1)
      }
      bedDt.setHours(Number(bedHours))
      bedDt.setMinutes(Number(bedMins))
      return bedDt
    },
    awakeDate() {
      let awakeHours = this.awakeForm.hours
      let awakeMins  = this.awakeForm.mins
      if(awakeHours == '' || awakeMins == '') return null      
      const awakeDt  = new Date(this.date)
      awakeDt.setHours(Number(awakeHours))
      awakeDt.setMinutes(Number(awakeMins))
      return awakeDt
    },
    sleepTime() {
      if(this.bedDate == null || this.awakeDate == null) return null
      const diffMins = this.$Utils.diffMins(this.awakeDate, this.bedDate)      
      const resultHours = Math.floor(diffMins / 60)
      return {
        hours: resultHours,
        mins: diffMins - (resultHours * 60)
      }
    },    
    getAwakeHoursOptions() {
      if(!this.bedDate) return []
      let hours = []
      for(let i=1; i<=23; i++) {
        hours.push(i)
      }
      const bedType = this.bedForm.type
      const startHours = Number(this.bedForm.hours)
      if(bedType == '오늘'){
        hours = hours.reduce((acc, item)=>{
          if(item <= startHours) return acc
          acc.push(item)
          return acc
        }, [])
      }      
      return hours
    },
    getMinsOptions() {
      let mins = []
      for(let i=0; i<=50; i+=10) {
        mins.push(i)
      }
      return mins
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
