<template>
  <div class="drinking-selection bottom-sheets fixed-bottom" :class="{'show': show}">
      <div class="container p-0">
        <div class="card">
          <div class="card-header bg-primary">
            <div class="row">
              <div class="col-9 text-white">
                <div class="col-form-label" v-if="currDrinkStep == DrinkSteps.Type">
                  음주 종류
                </div>                
                <div v-else>
                  <button type="button" class="btn text-white text-left pt-1 pb-1" @click="currDrinkStep = DrinkSteps.Type">
                    <i class="mdi mdi-arrow-left"></i>
                    {{ selectDrink.type }}
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
            <div v-if="currDrinkStep == DrinkSteps.Type">
              <button type="button" class="btn btn-block" :class="{'text-primary': selectedList[item]}" v-for="(item, index) of drinkTypes" :key="index" :disabled="selectedList[item]" @click="selectDrink.type = item; currDrinkStep=DrinkSteps.Amount">
                <i v-if="selectedList[item]" class="mdi mdi-check-bold"></i>
                <strong>{{ item }}</strong>
              </button>
            </div>
            <div v-else>
              <button type="button" class="btn btn-block" v-for="(item, index) in drunkAmount" :key="index" @click="selectDrink.amount = Number(item.amount); $emit('on-complete', selectDrink)">
                <strong>{{ item.name }}</strong>
              </button>
            </div>            
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export const DrinkSteps = {
  Type: 1,
  Amount: 2  
}

export default {
  name: 'DrinkBottomSheet',
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
      DrinkSteps: DrinkSteps,
      currDrinkStep: DrinkSteps.Type,      
      drinkTypes: this.$Constants.Options.DrinkTypes,      
      selectDrink: {}
    }
  },
  created() {    
  },
  methods: {
    onComplete() {      
      $emit('on-close');
    }
  },
  computed: {
    drunkAmount() {
      const amtOptions = this.$Constants.Options.DrinkAmt
      return Object.keys(amtOptions).sort().reduce((acc, item)=>{
        const obj = {
          name: amtOptions[item],
          amount: item
        }
        acc.push(obj)
        return acc
      }, [])
    }
  },
  watch: {
    show(val) {
      this.selectDrink = {}
      this.currDrinkStep = DrinkSteps.Type
    }
  }
}
</script>