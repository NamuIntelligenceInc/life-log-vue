<template>
  <div class="card mb-2" :class="{'success': payload.success}">
    <div class="card-header no-border">
      <div class="row">
        <div class="col-7 text-left pr-1">          
          <strong>{{ parsedDate.month }}</strong><small>월 </small>
          <strong>{{ parsedDate.date }}</strong><small>일</small>
          ( {{ parsedDate.dow }} )
          <span v-if="diffDayBadge" v-html="diffDayBadge"></span>
        </div>
        <div class="col-5 text-right pl-1">          
          <span class="badge badge-success badge-rounded" v-if="currCardState == CardState.InProgress">
            진행중
          </span>
          <span class="badge badge-primary badge-rounded" v-else-if="currCardState == CardState.Success">
            목표달성!
          </span>
          <span class="badge badge-danger badge-rounded" v-else-if="currCardState == CardState.Fail">
            목표실패!
          </span>
        </div>
      </div>
    </div>
    <div v-if="payload.pid">
      <div class="card-body p-0">            
        <router-link class="btn btn-block mb-1 btn-mission" 
          v-for="(value, key) in editableDataList" :key="key"          
          :to="{path:`/${key}/${payload.pid}`}" :class="{'disabled': (value.state != ValueState.Success && payload.is_disable_day)}">
            <div class="row">
              <div class="col-6 text-left">
                <i :class="value.icon"></i> {{ value.name }}
              </div>
              <div class="col-6 text-right">
                <span v-if="value.state === ValueState.Null">
                  <span class="text-danger" v-if="payload.is_disable_day">
                    <i class="mdi mdi-progress-alert"></i> 입력마감
                  </span>
                  <span class="text-success" v-else>
                    <i class="mdi mdi-progress-clock"></i> 입력대기
                  </span>
                </span>                
                <span class="text-primary" v-else-if="value.state === ValueState.Success">
                  <i class="mdi mdi-check-bold"></i> 입력완료
                </span>                
                <span class="text-danger" v-else>
                  <i class="mdi mdi-close"></i> 목표실패
                </span>                
              </div>              
            </div>
        </router-link>        
      </div>
      <div class="card-footer bg-white pl-2">
        <div class="row">
          <div class="col-6 text-left">
            <i class="mdi mdi-watch"></i> 미밴드 데이터      
          </div>
          <div class="col-6 text-right">
            <span class="text-success" v-if="payload.miband === ValueState.Null">
              <i class="mdi mdi-progress-clock"></i> 관리자 확인중
            </span>
            <span class="text-danger" v-else-if="payload.miband === ValueState.Fail">
              <i class="mdi mdi-close"></i> 목표실패
            </span>
            <span class="text-primary" v-else>
              <i class="mdi mdi-check-bold"></i> 확인완료
            </span>
          </div>
        </div>        
      </div>      
    </div>    
    <div v-else class="card-body pt-1">
      <div v-if="payload.past_day_cnt < $Constants.EditableLimitDay">
        <div class="row mb-3">
          <div class="col-3">
            <div class="d-flex h-100 align-items-center">
              <img class="ic-zepp" src="/images/zepplife.webp"/>
            </div>
          </div>
          <div class="col-9 pl-0">
            <small>
            <strong>ZeppLife</strong> 앱을 켜지 않으시면<br>미밴드 데이터 확인이 되지 않습니다.
            <br><strong>시작 전 앱을 한번만 켜주세요.</strong>
            </small>
          </div>        
        </div>
        <button type="button" class="btn btn-block btn-outline-primary" :disabled="isStarting" @click="isStarting=true;$emit('on-start')">
          <span v-if="!isStarting">
            <i class="mdi mdi-check"></i> 시작하기
          </span>
          <span v-else>
            <i class="mdi mdi-loading mdi-spin"></i>
          </span>
        </button>
      </div>
      <div class="text-center p-3 text-secondary" v-else>
        아무것도 입력되지 않았습니다
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'DailyCard',
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
      ValueState: {
        Null: null,
        Success: 1,
        Fail: 0
      },
      CardState: {
        Standby: 0,
        InProgress: 1,
        Success: 2,
        Fail: 3
      },
      isStarting: false      
    }
  },
  created() {
    
  },
  methods: {
    
  },
  computed: {
    currCardState() {
      let cardState = this.CardState.Standby
      if(this.payload.pid) {        
        const checkValues = [
          this.payload.daily,
          this.payload.food,
          this.payload.miband
        ]        
        const checkObj = checkValues.reduce((acc, item)=>{
          acc.null_val += (item == null) ? 1 : 0
          acc.zero_val += (item == 0) ? 1: 0
          return acc
        }, {zero_val: 0, null_val: 0})
        
        if(checkObj.zero_val > 0) {
          cardState = this.CardState.Fail
        }else if(checkObj.null_val > 0) {
          if(this.payload.is_disable_day){
            if(this.payload.daily == 1 && this.payload.food == 1 && this.payload.miband == null){
              cardState = this.CardState.InProgress
            }else{
              cardState = this.CardState.Fail 
            }             
          }else{
            cardState = this.CardState.InProgress
          }
        }else {
          cardState = this.CardState.Success
        }        
      }else{
        if(this.payload.is_disable_day){          
          cardState = this.CardState.Fail         
        }else{
          cardState = this.CardState.Standby
        }
      }
      return cardState
    },
    parsedDate() {
      const targetDt = new Date(this.payload.target_dt)
      return {
        month: this.$Utils.dateFormat(targetDt, 'M'),
        date: this.$Utils.dateFormat(targetDt, 'd'),
        dow: this.$Utils.dayOfWeek(targetDt)
      }
    },
    editableDataList() {
      const dataMap = {
        daily: {
          name: '일일 데이터',
          icon: 'mdi mdi-calendar-check'
        },
        food: {
          name: '식단 데이터',
          icon: 'mdi mdi-food-outline'
        }
      }
      return Object.keys(dataMap).reduce((acc, item)=>{
        acc[item] = dataMap[item]
        acc[item].state = this.payload[item]        
        return acc
      }, {})
    },    
    diffDayBadge() {      
      const pastDayCnt = this.payload.past_day_cnt
      if(this.payload.is_disable_day) return null      
      else if(pastDayCnt == 0){
        return `<span class="badge badge-primary">오늘</span>`
      }else{
        return `<span class="badge ${(pastDayCnt == 1) ? 'badge-success' : 'badge-danger'}">${pastDayCnt}일전</span>`
      }
    }    
  },  
}
</script>

<style lang="scss" scoped>
.card{
  border-radius: 10px !important;
  border: 0 !important;    
  &.success{    
    background-color: $success;  
    .card-header{
      border: 0;
    }  
    .card-body{
      .btn.success{
        color: $dark;
      }
    }
  }
  .card-header{
    background-color: transparent;
  }
  .card-body{
    position: relative;
    .btn-mission{      
      &.success{
        color: $dark;
        font-weight: 600;
      }
    }
  }
  .ic-zepp{   
    width: 100%;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    border-radius: 0.25rem;
  }
}
</style>