<template>
  <div class="exercise-selection fixed-bottom" :class="{'show': show}">
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
                    <i class="mdi mdi-arrow-left"></i> {{ selectExercise.type }}
                  </button>
                </div>
                <div v-else>
                  <button type="button" class="btn text-white text-left pt-1 pb-1" @click="currExStep = ExerciseSteps.Level">
                    <i class="mdi mdi-arrow-left"></i>
                    {{ selectExercise.type }} {{ selectExercise.level }}
                  </button>
                </div>
              </div>
              <div class="col-3">
                <button type="button" class="btn btn-block text-white" @click="$emit('on-close')">
                  <i class="mdi mdi-close"></i>
                </button>
              </div>
            </div>                        
          </div>
          <div class="card-body" style="height: 300px; overflow: auto;">
            <div v-if="currExStep == ExerciseSteps.Type">
              <button type="button" class="btn btn-block" :class="{'text-success': selectedList[item]}" v-for="(item, index) of exerciseTypes" :key="index" :disabled="selectedList[item]" @click="selectExercise.type = item; currExStep=ExerciseSteps.Level">
                <i v-if="selectedList[item]" class="mdi mdi-check"></i>
                {{ item }}
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Level">
              <button type="button" class="btn btn-block" v-for="(item, index) of exerciseLevels" :key="index" @click="selectExercise.level = item; currExStep=ExerciseSteps.Minutes">
                {{ item }}
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Minutes">
              <button type="button" class="btn btn-block" v-for="(value, key) of exerciseMinutes" :key="key" @click="selectExercise.min = key; $emit('on-complete', selectExercise)">
                {{ value }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export const ExerciseSteps = {
  Type: 1,
  Level: 2,
  Minutes: 3
}

export default {
  name: 'ExerciseBottomSheet',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    selectedList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ExerciseSteps: ExerciseSteps,
      currExStep: ExerciseSteps.Type,
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
      selectExercise: {}
    }
  },
  created() {

  },
  methods: {
    onComplete() {      
      $emit('on-close');
    }
  },
  watch: {
    show(val) {
      this.selectExercise = {}
      this.currExStep = ExerciseSteps.Type
    }
  }
}
</script>