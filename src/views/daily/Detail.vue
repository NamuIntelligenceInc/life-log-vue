<template>
  <div class="daily-add-page">
    <nav class="navbar navbar-light bg-primary">
      <div class="container d-block">
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
            <label class="col-6 col-form-label">
              <i class="mdi mdi-weight-kilogram"></i>
              체중 <small>(변화가 있다면 수정해 주세요)</small>
            </label>
            <div class="col-6">
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
                <button type="button" class="btn btn-sm btn-block btn-outline-primary btn-rounded" @click="exerciseItem={};currExStep=ExerciseSteps.Type;showExerciseBottomSheet=true">
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
          <div class="row">
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
    <div class="exercise-selection fixed-bottom" :class="{'show': showExerciseBottomSheet}">
      <div class="container p-0">
        <div class="card">
          <div class="card-header bg-primary">
            <div class="row">
              <div class="col-9 text-white">
                <div class="col-form-label" v-if="currExStep == ExerciseSteps.Type">
                  운동선택
                </div>
                <div v-else-if="currExStep == ExerciseSteps.Level">
                  <button type="button" class="btn text-white text-left pt-1 pb-1" @click="currExStep = ExerciseSteps.Type">
                    <i class="mdi mdi-arrow-left"></i> {{ exerciseItem.type }}
                  </button>
                </div>
                <div v-else>
                  <button type="button" class="btn text-white text-left pt-1 pb-1" @click="currExStep = ExerciseSteps.Level">
                    <i class="mdi mdi-arrow-left"></i>
                    {{ exerciseItem.type }} {{ exerciseItem.level }}
                  </button>
                </div>
              </div>
              <div class="col-3">
                <button type="button" class="btn btn-block text-white" @click="showExerciseBottomSheet=false">
                  <i class="mdi mdi-close"></i>
                </button>
              </div>
            </div>                        
          </div>
          <div class="card-body" style="height: 300px; overflow: auto;">
            <div v-if="currExStep == ExerciseSteps.Type">
              <button type="button" class="btn btn-block" :class="{'text-success': exerciseMap[item]}" v-for="(item, index) of exerciseTypes" :key="index" :disabled="exerciseMap[item]" @click="exerciseItem.type = item; currExStep=ExerciseSteps.Level">
                <i v-if="exerciseMap[item]" class="mdi mdi-check"></i>
                {{ item }}
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Level">
              <button type="button" class="btn btn-block" v-for="(item, index) of exerciseLevels" :key="index" @click="exerciseItem.level = item; currExStep=ExerciseSteps.Minutes">
                {{ item }}
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Minutes">
              <button type="button" class="btn btn-block" v-for="(value, key) of exerciseMinutes" :key="key" @click="exerciseItem.min = key; exerciseMap[exerciseItem.type] = exerciseItem; showExerciseBottomSheet=false;">
                {{ value }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ExerciseSteps = {
  Type: 1,
  Level: 2,
  Minutes: 3
}
export default {
  name: 'DailyAddPage',
  data() {
    return {
      inputDate: null,
      exerciseTypes: [
        '걷기, 달리기',
        '수영',
        '웨이트(근력운동)',
        '요가,필라테스',
        '사이클(자전거)',
        '골프 등 정적 스포츠',
        '배드민턴 등 동적 스포츠',
        '기타'
      ],
      exerciseLevels: ['저강도','중강도','고강도'],
      exerciseMinutes: {
        '30':'30분',
        '60':'1시간',
        '90':'1시간 반',
        '120':'2시간',
        '150':'2시간 반',
        '180':'3시간',
      },
      exerciseItem: {},
      ExerciseSteps: ExerciseSteps,
      currExStep: ExerciseSteps.Type,
      smokeOption: {
        '0':'피우지 않음',
        '10':'반갑 (10 개비)',
        '20':'한갑 (20 개비)',
        '30':'한갑 반 (30 개비)',
        '40':'두갑 (40 개비)',
      },
      waterOption: {
        '':'마시지 않음',
        '250':'반컵',
        '500':'한컵',
        '500':'한컵 반',
        '750':'두컵 반',
      },
      inputMedicine: {
        '아침': false,
        '점심': false,
        '저녁': false
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