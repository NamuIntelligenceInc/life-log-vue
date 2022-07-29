<template>
  <div class="mypage-index-page" :style="{minHeight: `${screenHeight}px`}">
    <nav class="navbar navbar-light bg-primary fixed-top">
      <div class="container d-block p-0">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto p-0">
            <div class="row">
              <div class="col-3">
                <button type="button" class="btn text-left text-white" @click="$router.go(-1)">
                  <i class="mdi mdi-arrow-left"></i>              
                </button>
              </div>
              <div class="col-6 col-form-label text-white text-center">
                <i class="mdi mdi-bell-alert"></i>
                공지사항
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="pt-3 pb-5"></div>
    <div class="container pt-3 pb-3">
      <div class="col-md-6 ml-auto mr-auto p-0">        
        <div class="card mb-3" v-for="(item, index) of noticeList" :key="index">
          <div class="card-header bg-white" :class="{'no-border': !item.is_open}">
            <button type="button" class="btn btn-block pl-0 pr-0 text-left" @click="item.is_open = !item.is_open">              
              <span :class="{'text-primary': item.is_open}">
                {{ index + 1 }}.
                {{ item.title }}
              </span>
              <small class="text-secondary">
                <span v-if="getDiff(item.created_dt) == 0">
                  오늘
                </span>
                <span v-else>
                  {{ getDiff(item.created_dt) }} 일전
                </span>
              </small>              
            </button>
          </div>
          <div class="card-body notice-description" :class="{'show': item.is_open}">
            <div v-html="item.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoticeList from '@/assets/notification.js'
export default {
  name: 'NoticeIndexPage',  
  data() {
    return {
      noticeList: null
    }
  },
  created() {    
    this.noticeList = NoticeList.reduce((acc, item)=>{
      item.is_open = false
      acc.push(item)
      return acc
    }, [])
    this.noticeList[0].is_open = true
  },
  methods: {    
    getDiff(dt) {
      return this.$Utils.diffDays(new Date(dt), new Date())
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>
.notice-description{
  padding: 0;
  height: 0;
  &.show{
    padding: 1rem;
    height: auto;
  }
}
</style>