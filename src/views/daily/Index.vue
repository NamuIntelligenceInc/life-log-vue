<template>
  <div class="daily-add-page">
    <nav class="navbar navbar-light bg-primary">
      <div class="container d-block p-0">
        <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
          <i class="mdi mdi-arrow-left"></i>
          <span class="ml-3">
            {{ $Utils.dateFormat(new Date(inputDate), 'yy.M.d') }} 일일 데이터
          </span>
        </button>
      </div>
    </nav>
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="row mb-3">
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
            <label class="col-6 col-form-label">
              <i class="mdi mdi-cup-water"></i>
              물섭취량
            </label>
            <div class="col-6">
              <select class="form-control underline text-center" v-model="inputWater">
                <option v-for="(value, key) in waterOption" :key="key" :value="key">                  
                  {{ (key > '0') ? `${value} (${key}ml)` : value }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-md-6 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              체중 <small>(변화가 있다면 수정해 주세요)</small>
            </label>
            <div class="col-md-6 col-6 ml-auto">
              <div class="row">
                <div class="col-8 pr-1">
                  <input type="number" class="form-control underline text-center" v-model.trim="inputWeight">
                </div>
                <div class="col-4 col-form-label pl-1">Kg</div>
              </div>
            </div>
          </div>          
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-medical-bag"></i>
              복약여부
            </label>
            <div class="col-12">
              <div class="row">
                <div class="col" v-for="(value, key) of inputMedicine" :key="key">
                  <button type="button" class="btn btn-block" :class="{'text-secondary':!value, 'text-primary': value}" @click="$set(inputMedicine, key, !value)">
                    <i class="mdi" :class="{'mdi-checkbox-blank-circle-outline': !value, 'mdi-checkbox-marked-circle': value}"></i>
                    {{ key }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-12 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              음주량
            </label>
            <div class="col-12">
              <div class="row mb-3" v-for="(value, key) in inputDrunk" :key="key">
                <div class="col-6">
                  <input type="text" class="form-control underline text-center bg-white" :value="`${key} ${value} 잔`" :readonly="true">
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-6 pr-1">
                      <button type="button" class="btn btn-outline-primary btn-block btn-rounded">
                        <i class="mdi mdi-minus"></i>
                      </button>
                    </div>
                    <div class="col-6 pl-1">
                      <button type="button" class="btn btn-outline-primary btn-block btn-rounded">
                        <i class="mdi mdi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div class="row mb-2">
              <div class="col-6 col-form-label">
                <i class="mdi mdi-weight-lifter"></i>
                운동량
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-sm btn-block btn-outline-primary btn-rounded" @click="showExerciseBottomSheet=true">
                  <i class="mdi mdi-plus"></i> 운동추가
                </button>
              </div>
            </div>
            <div class="p-3" v-if="Object.keys(exerciseMap).length == 0">
              <div class="text-secondary text-center">
                운동을 하셨다면 '+ 운동추가'<br>버튼을 눌러 추가해 주세요
              </div>
            </div>
            <div class="pt-3 pb-3" v-else>
              <div class="card mb-1" v-for="(value, key) in exerciseMap" :key="key">
                <div class="card-body pt-1 pb-1 pl-2 pr-2">
                  <div class="row">
                    <div class="col-9 text-left col-form-label">                      
                      <strong>{{ value.type }}</strong> <small>({{ value.level }} {{ exerciseMinutes[value.min] }})</small>
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
          </div>
          <div class="row mb-5">
            <div class="col-6 pr-1">
              <button type="button" class="btn btn-block btn-secondary">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6 pl-1">
              <button type="button" class="btn btn-block btn-primary">
                <i class="mdi mdi-check"></i> 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>   
    <exercise-bottom-sheet :show="showExerciseBottomSheet" :selected-list="exerciseMap" @on-close="showExerciseBottomSheet=false" @on-complete="(data)=>{exerciseMap[data.type]=data;showExerciseBottomSheet=false}"/>
  </div>
</template>

<script>
import ExerciseBottomSheet from './vues/ExerciseBSheet.vue'
import { exerciseMinutes } from './vues/ExerciseBSheet.vue'
export default {
  name: 'DailyAddPage',
  components: {
    ExerciseBottomSheet
  },
  data() {
    return {
      inputDate: null,  
      exerciseMinutes: exerciseMinutes,    
      smokeOption: {
        '0':'피우지 않음',
        '10':'반갑 (10 개비)',
        '20':'한갑 (20 개비)',
        '30':'한갑 반 (30 개비)',
        '40':'두갑 (40 개비)',
      },
      waterOption: {        
        '250':'한 컵',
        '500':'두 컵',
        '500':'세 컵',
        '750':'네 컵',
      },
      inputMedicine: {
        '아침': false,
        '점심': false,
        '저녁': false
      },
      drunkTypes: ['소주','맥주','막걸리','양주'],
      drunkAmounts: {
        '0.5': '반병',
        '1': '한병',
        '1.5': '한병 반',
        '2': '두병',
        '2.5': '두병 반',
        '3': '세병',
        '3.5': '세병 반',
        '4': '네병',
        '4.5': '네병 반',
        '5': '5병 이상',
      },      
      inputDrunk: {
        '소주': 0,
        '맥주': 0
      },
      inputSmoke: '10',
      inputWater: '250',
      inputWeight: '80',
      showExerciseBottomSheet: false,
      exerciseMap: {}
    }
  },
  created() {
    this.inputDate = this.$route.params.date
  }
}
</script>


<style lang="scss" scoped>
.exercise-selection{
  bottom: -500px;
  transition: bottom .3s ease-in-out;
  &.show{
    bottom: 0px;
  }
}
</style>