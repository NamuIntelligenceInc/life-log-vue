<template>
  <div class="card mb-2" :class="{'success': payload.success}">
    <div class="card-header no-border">
      <div class="row">
        <div class="col-8 text-left">          
          <strong>{{ $Utils.dateFormat(new Date(payload.date), 'yyyy.MM.dd') }}</strong>
          <small>
            ({{ $Utils.dayOfWeek(new Date(payload.date)) }})
          </small>
        </div>
        <div class="col-4 text-right">          
          <span v-if="payload.success" class="flag success">
            <i class="mdi mdi-check"></i>
            미션성공
          </span>
          <span class="flag" v-else>
            남은 미션 {{ missionCount.total - missionCount.success }}
          </span>
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
          icon: 'mdi mdi-watch-export'
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
  .flag{
    display: flex;
    border-radius: 20px;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: .75rem;
    background-color: #ddd;    
    &.success{
      background-color: white;
      color: $success;
    }
  }
  &.success{
    color: white;
    background-color: $success;  
    .card-header{
      border: 0;
    }  
    .card-body{
      .btn.success{
        color: white;
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
        color: $success;
      }
    }
    
    .card-mask{
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, .8);
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      color: $gray-600;
      font-weight: 700;
    }
  }
}
</style>