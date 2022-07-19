<template>
  <div class="card mb-2" :class="{'success': payload.success}">
    <div class="card-header no-border">
      <div class="row">
        <div class="col-7 text-left pr-1">          
          <strong>{{ $Utils.dateFormat(new Date(payload.target_dt), 'M') }}</strong><small>월 </small>
          <strong>{{ $Utils.dateFormat(new Date(payload.target_dt), 'd') }}</strong><small>일</small>
          ( {{ $Utils.dayOfWeek(new Date(payload.target_dt)) }} )
          <span class="badge" v-if="diffDayTxt">{{ diffDayTxt  }}</span>
        </div>
        <div class="col-5 text-right pl-1">          
          <span v-if="payload.success">
            <i class="mdi mdi-check-all mr-1"></i>
            <strong>목표 달성!</strong>
          </span>
          <span v-else>
            <strong>남은 목표 <span class="text-primary">{{ missionCount.total - missionCount.success }}</span> 개</strong>
          </span>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <router-link v-for="(value, key) in dataList" :key="`${payload.target_dt}_${key}`" 
        :to="{path:`/${key}/add?date=${$Utils.dateFormat(new Date(payload.target_dt), 'yyyy-MM-dd')}`}" 
        class="btn btn-block mb-1" :class="{'success': value.success}">
        <div class="row">
          <div class="col-9 text-left">
            <i class="mdi" :class="[value.icon]"></i>
            {{ value.name }}
          </div>
          <div class="col-3 text-right">
            <i class="mdi mdi-check-bold" v-if="value.success"></i>
            <i class="mdi mdi-plus" v-else></i>
          </div>
        </div>
      </router-link>      
    </div>
    <div class="card-footer text-center" v-if="payload.success">
      <i class="mdi mdi-medal"></i>
      <strong>{{ $Utils.numberWithComma(payload.point) }}</strong> 포인트 획득!
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
      
    }
  },
  methods: {
    
  },
  computed: {
    dataList() {
      const dataMap = {
        daily: {
          name: '일일 데이터',
          icon: 'mdi mdi-calendar-check',         
        },
        food: {
          name: '식단 데이터',
          icon: 'mdi mdi-food-outline'
        },
        miband: {
          name: '미밴드 데이터',
          icon: 'mdi mdi-watch'
        }
      }
      return Object.keys(dataMap).reduce((acc, item)=>{
        acc[item] = dataMap[item]
        acc[item].success = this.payload[item]
        return acc
      }, {})
    },
    missionCount() {      
      const counting = {
        success: 0,
        total: 0
      }
      if(!this.dataList) return counting
      const dataKeys = Object.keys(this.dataList)
      const successCount = dataKeys.reduce((acc, item)=>{
        acc += (this.dataList[item].success) ? 1 : 0
        return acc
      }, 0)
      counting.success = successCount
      counting.total = dataKeys.length
      return counting
    },
    diffDayTxt() {      
      const diff = this.$Utils.diffDays(new Date(this.payload.target_dt), new Date())
      const absNum = (diff < -3) ? null : Math.abs(diff)
      if(!absNum) return null      
      let bgCls = 'bg-primary'

      return absNum
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
    .btn{
      color: $gray-600;
      &.success{
        color: $dark;
        font-weight: 600;
      }
    }
  }
}
</style>