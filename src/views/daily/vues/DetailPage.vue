<template>
  <div class="daily-add-page">
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-3">
            <label class="col-4 col-form-label">
              <i class="mdi mdi-smoke"></i>
              흡연량
            </label>
            <div class="col-8" v-if="userProfile.is_smoking">              
              <input type="text" class="form-control underline text-center bg-white text-primary" :readonly="true" :value="`${labelOptions.SmokingAmt[payload.smoking_amt.toString()]}`">
            </div>
            <div class="col-8 col-form-label text-center text-secondary" v-else>
              비흡연자 입니다
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-4 col-form-label">
              <i class="mdi mdi-cup-water"></i>
              물섭취량
            </label>
            <div class="col-8">
              <input type="text" class="form-control underline text-center bg-white text-primary" :readonly="true" :value="`${labelOptions.WaterAmt[payload.water_amt.toString()]} (${payload.water_amt})ml`">
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-4 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              체중 
            </label>
            <div class="col-8 ml-auto">
              <input type="text" class="form-control underline text-center bg-white text-primary" :readonly="true" :value="`${payload.weight} Kg`">
            </div>
          </div>          
          <div class="row mb-3" v-if="userProfile.is_medicine">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>            
            <div class="col-12">
              <table class="table table-bordered text-center">
                <colgroup>
                  <col width="33%"/>
                  <col width="33%"/>
                  <col width=""/>
                </colgroup>
                <thead>
                  <tr>
                    <th>아침</th>
                    <th>점심</th>
                    <th>저녁</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline text-primary': payload.medi_morning, 'mdi-close text-danger': !payload.medi_morning}"></i>
                    </td>
                    <td>
                      <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline text-primary': payload.medi_lunch, 'mdi-close text-danger': !payload.medi_lunch}"></i>
                    </td>
                    <td>
                      <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline text-primary': payload.medi_dinner, 'mdi-close text-danger': !payload.medi_dinner}"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-4 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>
            <div class="col-8 col-form-label text-center text-secondary">
              복약중 아님
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-6 col-form-label">
              <i class="mdi mdi-sleep"></i>
              총 수면시간
            </label>
            <div class="col-6 text-center col-form-label">              
              <strong class="text-primary">
                {{ sleepTime.hours }}<small class="mr-1">시간</small>
                <span v-if="sleepTime.mins">{{ sleepTime.mins }}<small>분</small></span>
              </strong>              
            </div>            
          </div>
          <table class="table table-bordered text-center mb-3">            
            <thead>
              <tr>
                <th>취침</th>
                <th>기상</th>                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>                      
                  {{ bedTime.hours }}
                  {{ bedTime.mins }}<small>분</small>
                </td>
                <td>   
                  {{ awakeTime.hours }}                   
                  {{ awakeTime.mins }}<small>분</small>
                </td>                
              </tr>
            </tbody>
          </table>
                    
          <div class="mb-3">
            <div class="row mb-2">
              <label class="col-4 col-form-label">
                <i class="mdi mdi-bottle-wine-outline"></i>
                음주여부
              </label>
              <div class="col-8 col-form-label">
                <span class="text-secondary" v-if="!payload.is_drinking">
                  음주를 하지 않으셨습니다
                </span>
              </div>
            </div>
            <div v-if="payload.drinking_list">
              <div class="pl-3 mb-2" v-for="(item, index) of payload.drinking_list" :key="index">
                <i class="mdi mdi-circle-medium"></i>
                <strong class="text-primary">{{ item.name }}</strong>
                <span class="text-primary ml-2">{{ labelOptions.DrinkAmt[item.amount.toString()] }}</span>을
                섭취하셨습니다
              </div>              
            </div>
          </div>
          <div class="mb-3">
            <div class="row mb-2">
              <label class="col-4 col-form-label">
                <i class="mdi mdi-weight-lifter"></i>
                운동여부
              </label>
              <div class="col-8 col-form-label">
                <span class="text-secondary" v-if="!payload.is_exercise">
                  운동을 하지 않으셨습니다
                </span>
              </div>
            </div>            
            <div v-if="payload.exercise_list">
              <div class="pl-3 mb-2" v-for="(item, index) of payload.exercise_list" :key="index">
                <i class="mdi mdi-circle-medium"></i>
                <strong class="text-primary">{{ item.name }}</strong> - <strong>{{ item.level }}</strong>로
                <span class="ml-2 text-primary">{{ labelOptions.ExerciseMinutes[item.minutes.toString()] }}</span>
                동안 진행하셨습니다
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>    
  </div>
</template>


<script>
export default {
  name: 'DailyDetailPage',  
  props: {
    payload: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {       
      labelOptions: this.$Constants.Options
    }
  },
  created() {    
    
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    bedTime() {
      const dt = new Date(this.payload.bed_ts * 1000)
      return {        
        hours: this.$Utils.getSeepHoursLabel(dt.getHours()),
        mins: dt.getMinutes()
      }
    },
    awakeTime() {
      const dt = new Date(this.payload.awake_ts * 1000)
      return {        
        hours: this.$Utils.getSeepHoursLabel(dt.getHours()),
        mins: dt.getMinutes()
      }
    },
    sleepTime() {
      const bedTime   = new Date(this.payload.bed_ts * 1000)
      const awakeTime = new Date(this.payload.awake_ts * 1000)
      const diffMins = this.$Utils.diffMins(awakeTime, bedTime)      
      const resultHours = Math.floor(diffMins / 60)
      return {
        hours: resultHours,
        mins: diffMins - (resultHours * 60)
      }
    }
  },
  watch: {
    
  }
}
</script>


<style lang="scss" scoped>
.table{
  th, td{
    vertical-align: middle;
    padding: .5rem;
  }
}
</style>