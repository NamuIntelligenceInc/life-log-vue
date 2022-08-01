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
          <div class="card-header bg-white no-border">
            <button type="button" class="btn btn-block pl-0 pr-0 text-left" @click="item.is_open = !item.is_open">              
              <div class="row">
                <div class="col-10 pr-1">
                   <span :class="{'font-weight-bold': item.is_open}">
                    {{ index + 1 }}.
                    {{ item.title }}
                  </span>                  
                </div>
                <div class="col-2 pl-1 text-right">
                  <i class="mdi" :class="{'mdi-plus': !item.is_open, 'mdi-minus': item.is_open}"></i>
                </div>
              </div>              
            </button>
          </div>
          <div class="card-body notice-description pt-0" :class="{'show': item.is_open}">
            <div v-html="item.description"></div>
            <div class="text-right">
              <small class="text-primary">
                <span v-if="getDiff(item.created_dt) == 0">
                  오늘
                </span>
                <span v-else>
                  {{ getDiff(item.created_dt) }} 일전
                </span>
              </small>
            </div>
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
      item.is_open = true
      acc.push(item)
      return acc
    }, [])    
  },
  methods: {    
    getDiff(dt) {
      return this.$Utils.diffDays(new Date(), new Date(dt))
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