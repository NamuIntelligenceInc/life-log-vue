<template>
  <div class="card mb-2" :class="{'success': payload.success}">
    <div class="card-header no-border">
      <div class="row">
        <div class="col-6 text-left">          
          <strong>{{ $Utils.dateFormat(new Date(payload.date), 'M') }}</strong><small>월 </small>
          <strong>{{ $Utils.dateFormat(new Date(payload.date), 'd') }}</strong><small>일</small>
          ( {{ $Utils.dayOfWeek(new Date(payload.date)) }} )
        </div>
        <div class="col-6 text-right">          
          <small v-if="payload.success">
            <i class="mdi mdi-check-all"></i>
            목표 달성!
          </small>
          <small v-else>
            남은 목표 <strong class="text-primary">{{ missionCount.total - missionCount.success }}</strong>개
            <span class="badge badge-danger ml-1" style="border-radius: 20px; padding: 0.25rem 0.5rem;">
              
            </span>
          </small>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <router-link v-for="(value, key) in dataList" :key="`${payload.date}_${key}`" 
        :to="`/${key}/${$Utils.dateFormat(new Date(payload.date), 'yyyy-MM-dd')}`" 
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
    date: {
      type: Date,
      default() {
        return new Date()
      }
    },
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
  created() {
    
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