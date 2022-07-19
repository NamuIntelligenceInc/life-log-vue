<template>
  <div class="daily-add-page">
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-3">
            <label class="col-6 col-form-label">
              <i class="mdi mdi-smoke"></i>
              흡연량
            </label>
            <div class="col-6">              
              <input type="text" class="form-control underline text-center bg-white" :readonly="true" :value="`${labelOptions.SmokingAmt[payload.smoking_amt.toString()]}`">
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-6 col-form-label">
              <i class="mdi mdi-cup-water"></i>
              물섭취량
            </label>
            <div class="col-6">
              <input type="text" class="form-control underline text-center bg-white" :readonly="true" :value="`${labelOptions.WaterAmt[payload.water_amt.toString()]} ml`">
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-6 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              체중 
            </label>
            <div class="col-md-6 col-6 ml-auto">
              <input type="text" class="form-control underline text-center bg-white" :readonly="true" :value="`${payload.weight} Kg`">
            </div>
          </div>          
          <div class="row mb-5">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>
            <div class="col-10 ml-auto mr-auto">
              <div class="row">
                <div class="col" v-for="(value, key) in medicData" :key="key" :class="{'text-primary': value}">
                  <i class="mdi" :class="{'mdi-close': !value, 'mdi-check-bold': value}"></i>
                  {{ key }}
                </div>
              </div>
            </div>
          </div>          
          <div class="mb-5">
            <div class="row mb-2">
              <div class="col-8 col-form-label">
                <i class="mdi mdi-bottle-wine-outline"></i>
                음주여부
              </div>
              <div class="col-4 col-form-label">
                <span v-if="!payload.is_drinking">
                  음주안함
                </span>
              </div>
            </div>
            <div v-if="payload.drinking_list">
              <div class="pl-3 mb-2" v-for="(item, index) of payload.drinking_list" :key="index">
                {{ index + 1 }}.
                <strong>{{ item.name }}</strong>
                <span class="text-primary ml-2">{{ labelOptions.DrinkAmt[item.amount.toString()] }}</span>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div class="row mb-2">
              <div class="col-8 col-form-label">
                <i class="mdi mdi-weight-lifter"></i>
                운동여부
              </div>
              <div class="col-4">                
                <span v-if="!payload.is_exercise">
                  운동안함
                </span>
              </div>
            </div>            
            <div v-if="payload.exercise_list">
              <div class="pl-3 mb-1" v-for="(item, index) of payload.exercise_list" :key="index">
                {{ index + 1 }}.
                <strong>{{ item.name }}</strong> {{ item.level }}
                <span class="ml-2 text-primary">{{ labelOptions.ExerciseMinutes[item.minutes.toString()] }}</span>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
    <div class="fixed-bottom pb-3">
      <div class="container">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="row">
              <div class="col-md-6 ml-auto mr-auto">
                <a class="btn btn-block btn-primary btn-rounded" href="http://pf.kakao.com/_qNVtb/chat">
                KaKao 고객센터 연결
              </a>
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
    console.log(this.payload)
  },
  computed: {
    medicData() {
      return {
        '아침': this.payload.medi_morming,
        '점심': this.payload.medi_lunch,
        '저녁': this.payload.medi_dinner
      }
    }
  },
  watch: {
    
  }
}
</script>
