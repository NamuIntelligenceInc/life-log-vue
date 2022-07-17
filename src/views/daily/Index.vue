<template>
  <div class="daily-add-page">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
              <i class="mdi mdi-arrow-left"></i>
              <span class="ml-3">
                {{ $Utils.dateFormat(new Date(inputDate), 'yy.M.d') }} 일일 데이터
              </span>
            </button>
          </div>
        </div>        
      </div>
    </nav>
    <div class="pt-5"></div>
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
              <button type="button" class="btn btn-sm btn-block btn-outline-primary" @click="showDrinkBSheet=true">
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
              <button type="button" class="btn btn-sm btn-block btn-outline-primary" @click="showExcBSheet=true">
                <i class="mdi mdi-plus"></i> 운동 추가
              </button>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-6 pr-1">
              <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
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
    <exercise-bottom-sheet :show="showExcBSheet" :selected-list="exerciseMap" @on-close="showExcBSheet=false" @on-complete="(data)=>{exerciseMap[data.type]=data;showExcBSheet=false}"/>
    <drink-bottom-sheet :show="showDrinkBSheet" :selected-list="drinkingMap" @on-close="showDrinkBSheet=false" @on-complete="(data)=>{drinkingMap[data.type]=data;showDrinkBSheet=false}"/>
  </div>
</template>

<script>
import ExerciseBottomSheet from './vues/ExerciseBSheet.vue'
import DrinkBottomSheet from './vues/DrinkBSheet.vue'
import { exerciseMinutes } from './vues/ExerciseBSheet.vue'
export default {
  name: 'DailyAddPage',
  components: {
    ExerciseBottomSheet,
    DrinkBottomSheet
  },
  data() {
    return {
      inputDate: null,  
      exerciseMinutes: exerciseMinutes,    
      smokeOption: this.$Constants.Options.SmokingAmt,
      waterOption: this.$Constants.Options.WaterAmt,
      inputMedicine: {
        '아침': false,
        '점심': false,
        '저녁': false
      },      
      inputSmoke: '10',
      inputWater: '250',
      inputWeight: '80',
      selectIsDrinking: this.$Constants.Selection.YN.No.val,
      selectIsExercise: this.$Constants.Selection.YN.No.val,
      showExcBSheet: false,
      exerciseMap: {},
      showDrinkBSheet: false,
      drinkingMap: {}
    }
  },
  created() {
    this.inputDate = this.$route.params.date
    console.log(this.selectIsDrinking)
  },
  watch: {
    
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