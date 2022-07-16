<template>
  <div class="food-page">
     <nav class="navbar navbar-light bg-primary">
      <div class="container d-block p-0">
        <div class="col-md-6 ml-auto mr-auto p-0">
          <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
            <i class="mdi mdi-arrow-left"></i>
            <span class="ml-3" v-if="inputDate">
              {{ $Utils.dateFormat(new Date(inputDate), 'yyyy.M.d') }} 미밴드 데이터
            </span>
          </button>
        </div>        
      </div>
    </nav>
    <div class="container pt-3 pb-3">      
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="text-right mb-3">
            <a href="javascript:;" class="btn btn-link">
              <i class="mdi mdi-help-circle-outline"></i> 도움말
            </a>
          </div>
          <div class="card mb-3">            
            <div class="card-body p-2">
              <div class="row">
                <label class="col-md-6 col-4 col-form-label">
                  <i class="mdi mdi-walk"></i>
                  걸음수
                </label>
                <div class="col-md-6 col-8">
                  <div class="input-group">
                    <input type="number" ref="inputWalkCount" class="form-control underline text-center" v-model.trim="inputWalkCount">
                    <div class="input-group-append">
                      <span class="input-group-text bg-white no-border">
                        <small>걸음</small>
                      </span>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3">            
            <div class="card-header bg-white no-border">
              <i class="mdi mdi-sleep"></i>
              수면시간
            </div>
            <div class="card-body p-2">
              <div class="row mb-3">
                <label class="col-12 col-form-label">
                  취침시간
                </label>
                <div class="col-12">
                  <div class="row">
                    <div class="col pr-1">
                      <select class="form-control underline text-center" v-model="sleepForm.type">
                        <option v-for="(item, index) of timeTypeOption" :key="index" :value="item">
                          {{ item == 'am' ? '오전' : '오후' }}
                        </option>                        
                      </select>
                    </div>
                    <div class="col pr-1">                      
                      <select class="form-control underline text-center" ref="selectSleepHours" v-model.trim="sleepForm.hours">
                        <option value="">:: 시간 ::</option>
                        <option v-for="n in 12" :key="n" :value="n">
                          {{ n }}시
                        </option>
                      </select>
                    </div>
                    <div class="col pl-1">
                      <input type="number" v-model.trim="sleepForm.min" ref="inputSleepMin" class="form-control underline text-center" placeholder="분">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-12 col-form-label">
                  기상시간
                </label>
                <div class="col-12">
                  <div class="row">
                    <div class="col pr-1">
                      <select class="form-control underline text-center" v-model="awakeForm.type">
                        <option v-for="(item, index) of timeTypeOption" :key="index" :value="item">
                          {{ item == 'am' ? '오전' : '오후' }}
                        </option>
                      </select>
                    </div>
                    <div class="col pr-1">                      
                      <select class="form-control underline text-center" ref="awakeSleepHours"  v-model.trim="awakeForm.hours">
                        <option value="">:: 시간 ::</option>
                        <option v-for="n in 12" :key="n" :value="n">
                          {{ n }}시
                        </option>
                      </select>
                    </div>
                    <div class="col pl-1">
                      <input type="number" v-model.trim="awakeForm.min" ref="inputAwakeMin" class="form-control underline text-center" placeholder="분">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>         
          <div class="card mb-3">            
            <div class="card-body pl-2 pr-2 pt-2">
              <label class="col-form-label">
                <i class="mdi mdi-heart-circle"></i>
                지속 심박 영역
              </label>              
              <div class="row mb-3" v-for="(value, key) in heartBeatTimes" :key="key">
                <div class="col-form-label col-3 text-center">                      
                  {{ key }}
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="col pr-1">
                      <input type="number" class="form-control underline text-center" placeholder="시" v-model.trim="value.hours">
                    </div>
                    <div class="col pl-1">
                      <input type="number" class="form-control underline text-center" placeholder="분" v-model.trim="value.min">
                    </div>
                  </div>
                </div>                    
              </div>                           
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-white no-border">
              <i class="mdi mdi-heart-pulse"></i>
              심박수
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col pr-1">
                      <input type="number" class="form-control underline text-center" placeholder="최대">
                    </div>
                    <div class="col pl-1 pr-1">
                      <input type="number" class="form-control underline text-center" placeholder="최소">
                    </div>
                    <div class="col pl-1">
                      <input type="number" class="form-control underline text-center" placeholder="평균">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="card mb-3" v-if="!imgPreviewURL">
            <div class="card-body p-0">
              <button type="button" class="btn btn-block p-3" @click="$refs.inputUploader.click()">
                <i class="mdi mdi-cellphone-screenshot"></i>
                터치 후 사진을 선택해 주세요
              </button>
            </div>
          </div>
          <div class="card mb-3" v-else>
            <div class="card-body p-0">
              <button type="button" class="btn btn-block p-3" @click="$refs.inputUploader.click()">
                <img class="mb-2" :src="imgPreviewURL" style="max-height: 200px; margin: 0 auto;"/>
                <div class="text-center text-secondary">
                  다른 이미지를 선택하시려면<br>이미지를 터치해 주세요
                </div>
              </button>
            </div>
          </div> -->

          <div class="row mt-5">
            <div class="col-6 pr-1 ml-auto">
              <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6 pl-2 mr-auto">
              <button type="button" class="btn btn-block btn-primary" @click.stop="onClickComplete()">
                <i class="mdi mdi-check"></i> 완료
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <input ref="inputUploader" type="file" class="input-uploader" accept="image/*" @change="onChangeInputFile">
  </div>
</template>

<script>

const TimeTypes = {
  PM: 'pm',
  AM: 'am'
}


export default {
  name: 'MibandIndexPage',
  data() {
    return {            
      inputDate: null,
      timeTypeOption: Object.values(TimeTypes),
      inputWalkCount: '',
      sleepForm: {
        type: TimeTypes.PM,
        hours: '',
        min: ''
      },
      awakeForm: {
        type: TimeTypes.AM,
        hours: '',
        min: ''
      },

      heartBeatTimes: {
        '휴식': {
          hours: '',
          min: ''
        },
        '워밍업': {
          hours: '',
          min: ''
        },
        '집중훈련': {
          hours: '',
          min: ''
        }
      },


      inputFile: null,
      imgPreviewURL: null
    }
  },
  created() {    
    this.inputDate = this.$route.params.date
  },
  methods: {    
    onChangeInputFile(evt) {
      const files = evt.target.files
      if(files.length == 0) return
      let selectedFile = files[0]
      if(this.imgPreviewURL){
        URL.revokeObjectURL(this.imgPreviewURL)
      }
      this.imgPreviewURL = URL.createObjectURL(selectedFile)
    },
    onClickComplete() {
      if(this.sleepForm.hours == ''){
        this.$refs.selectSleepHours.focus()
        this.$toasted.error('수면시간의 (시간)을 선택해 주세요')
        return
      }
      if(this.sleepForm.min == ''){
        this.$refs.inputSleepMin.focus()
        this.$toasted.error('수면시간의 (분)을 선택해 주세요')
        return
      }
      
      if(!(Number(this.sleepForm.min) >= 0 && Number(this.sleepForm.min) <= 59)){
        this.$refs.inputSleepMin.focus()
        this.$toasted.error('수면시간의 (분)은 0부터 59까지만 입력해 주세요')
        return
      }

      if(this.awakeForm.hours == ''){
        this.$refs.awakeSleepHours.focus()
        this.$toasted.error('기상시간의 (시간)을 선택해 주세요')
        return
      }
      if(this.awakeForm.min == ''){
        this.$refs.inputAwakeMin.focus()
        this.$toasted.error('기상시간의 (분)을 선택해 주세요')
        return
      }
      if(!(Number(this.awakeForm.min) >= 0 && Number(this.awakeForm.min) <= 59)){
        this.$refs.inputSleepMin.focus()
        this.$toasted.error('기상시간의 (분)은 0부터 59까지만 입력해 주세요')
        return
      }

      const stdDate = new Date(this.inputDate)
      const sleepDt = new Date(stdDate)
      const awakeDt = new Date(stdDate)

      if(this.sleepForm.type == TimeTypes.PM) {
        sleepDt.setDate(sleepDt.getDate() - 1)
        sleepDt.setHours(Number(this.sleepForm.hours + 12))
      }else{
        sleepDt.setHours(Number(this.sleepForm.hours))
      }      
      sleepDt.setMinutes(Number(this.sleepForm.min))

      if(this.awakeForm.type == TimeTypes.PM) {        
        awakeDt.setHours(Number(this.awakeForm.hours + 12))
      }else{
        awakeDt.setHours(Number(this.awakeForm.hours))
      }     
      awakeDt.setMinutes(Number(this.awakeForm.min))

      const sleepDtValue = this.$Utils.dateFormat(sleepDt, 'yyyy-MM-dd HH:mm')
      const awakeDtValue = this.$Utils.dateFormat(awakeDt, 'yyyy-MM-dd HH:mm')
      console.log(sleepDtValue)
      console.log(awakeDtValue)
      
      const sleepTime = this.$Utils.diffMins(awakeDt, sleepDt)
      console.log(sleepTime)
    },
  },
  destroy() {
    if(this.imgPreviewURL){
      URL.revokeObjectURL(this.imgPreviewURL)
    }
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
.input-uploader{
  position: fixed;
  bottom: -1000px;
}
</style>