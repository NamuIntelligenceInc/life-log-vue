<template>
  <div class="food-page">
     <nav class="navbar navbar-light bg-primary">
      <div class="container d-block">
        <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
          <i class="mdi mdi-arrow-left"></i>
          <span class="ml-3" v-if="inputDate">
            {{ $Utils.dateFormat(new Date(inputDate), 'yyyy.M.d') }} 미밴드 데이터
          </span>
        </button>
      </div>
    </nav>
    <div class="container pt-3 pb-3">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="card mb-3">            
            <div class="card-body p-2">
              <div class="row">
                <label class="col-md-6 col-4 col-form-label">
                  <i class="mdi mdi-walk"></i>
                  걸음수
                </label>
                <div class="col-md-6 col-8">
                  <div class="input-group">
                    <input type="number" class="form-control underline text-center">
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
                <label class="col-3 col-form-label pr-1">
                  <small>취침시간</small>
                </label>
                <div class="col-9 pl-1">
                  <div class="row">
                    <div class="col pr-1">
                      <select class="form-control underline text-center" v-model="inputSleepHours">
                        <option v-for="(item, index) of sleepHoursOption" :key="index" :value="item">
                          {{ (item < 8) ? `새벽 ${item}` : `저녁 ${item}` }} 시
                        </option>
                      </select>
                    </div>
                    <div class="col pl-1">
                      <input type="number" v-model.trim="inputSleepMin" class="form-control underline text-center" placeholder="분">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label class="col-3 col-form-label pr-1">
                  <small>기상시간</small>
                </label>
                <div class="col-9 pl-1">
                  <div class="row">
                    <div class="col pr-1">
                      <select class="form-control underline text-center" v-model="inputAwakeHours">
                        <option v-for="(item, index) of sleepHoursOption" :key="index" :value="item">
                          {{ (item < 8) ? `새벽 ${item}` : `저녁 ${item}` }} 시
                        </option>
                      </select>
                    </div>
                    <div class="col pl-1">
                      <input type="number" v-model.trim="inputAwakeMin" class="form-control underline text-center" placeholder="분">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card mb-3">            
            <div class="card-body p-2">
              <div class="row">
                <label class="col-12 col-form-label">
                  <i class="mdi mdi-watch-vibrate"></i>
                  미밴드 착용시간
                </label>
                <div class="col-12">
                  <div class="row">
                    <div class="col">
                      <select class="form-control underline text-center" v-model="inputSleepHours">
                        <option v-for="n in 24" :key="n" :value="n-1">
                          {{ n - 1 }} 시간
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <input type="number" v-model.trim="inputSleepMin" class="form-control underline text-center" placeholder="분" maxlength="2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="card mb-3">            
            <div class="card-body pl-2 pr-2 pt-2">
              <div class="row">
                <label class="col-12 col-form-label">
                  <i class="mdi mdi-heart-pulse"></i>
                  심박수
                </label>
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

          <div class="card mb-3" v-if="!imgPreviewURL">
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
          </div>

          <div class="row mt-5">
            <div class="col-6 pr-1 ml-auto">
              <button type="button" class="btn btn-block btn-secondary" @click="$router.go(-1)">
                <i class="mdi mdi-close"></i> 취소
              </button>
            </div>
            <div class="col-6 pl-2 mr-auto">
              <button type="button" class="btn btn-block btn-primary">
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
export default {
  name: 'MibandIndexPage',
  data() {
    return {
      sleepHoursOption: [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23, 24],
      inputDate: null,

      inputSleepHours: '0',
      inputSleepMin: '',
      inputAwakeHours: '0',
      inputAwakeMin: '',

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
    }
  },
  destroy() {
    if(this.imgPreviewURL){
      URL.revokeObjectURL(this.imgPreviewURL)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-uploader{
  position: fixed;
  bottom: -1000px;
}
</style>