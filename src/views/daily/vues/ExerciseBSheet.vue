<template>
  <div class="exercise-selection bottom-sheets fixed-bottom" :class="{'show': show}">
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
              <button type="button" class="btn btn-block" :class="{'text-primary': selectedList[item]}" v-for="(item, index) of exerciseTypes" :key="index" :disabled="selectedList[item]" @click="selectExercise.type = item; currExStep=ExerciseSteps.Level">
                <i v-if="selectedList[item]" class="mdi mdi-check-bold"></i>
                <strong>{{ item }}</strong>
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Level">
              <button type="button" class="btn btn-block" v-for="(item, index) of exerciseLevels" :key="index" @click="selectExercise.level = item; currExStep=ExerciseSteps.Minutes">
                <strong>{{ item }}</strong>
              </button>
            </div>
            <div v-if="currExStep == ExerciseSteps.Minutes">
              <button type="button" class="btn btn-block" v-for="(value, key) of exerciseMinutes" :key="key" @click="selectExercise.mins = key; $emit('on-complete', selectExercise)">
                <strong>{{ value }}</strong>
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
      exerciseTypes: this.$Constants.Options.ExerciseTypes,
      exerciseLevels: this.$Constants.Options.ExerciseLevels,
      exerciseMinutes: this.$Constants.Options.ExerciseMinutes,
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

<style lang="scss" scoped>

</style>