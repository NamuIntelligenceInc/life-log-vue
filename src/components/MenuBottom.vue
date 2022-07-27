<template>
  <div class="menu-bottom bottom-sheets fixed-bottom" :class="{'show': show}">
    <div class="container p-0">
      <div class="col-md-6 ml-auto mr-auto p-0">
        <div class="card">
          <div class="card-header text-right pb-0 pt-1 bg-white no-border">
            <button type="button" class="btn" @click="$router.go(-1)">
              <i class="mdi mdi-close"></i> 닫기
            </button>
          </div>
          <div class="card-body pt-1">
            <div class="list-group">
              <a href="javascript:;" class="list-group-item list-group-item-action" @click="onClickMove('/help')">
                <i class="mdi mdi-help-circle-outline"></i> 도움말
              </a>
              <a href="javascript:;" class="list-group-item list-group-item-action" @click="onClickMove('/mypage')">
                <i class="mdi mdi-account-circle-outline"></i> 마이페이지
              </a>
              <a target="_blank" :href="$Constants.KakaoChatLink" class="list-group-item list-group-item-action">
                <i class="mdi mdi-chat-processing-outline"></i> 고객센터( 카카오톡 )
              </a>
              <a target="_blank" :href="`tel:${managerPhoneNumber}`" class="list-group-item list-group-item-action" :class="{'disabled': !managerPhoneNumber}">
                <i class="mdi mdi-phone-in-talk"></i> 고객센터( 전화 )
                <div v-if="!managerPhoneNumber">
                  <small class="text-secondary">(담당자가 배정되지 않았습니다)</small>
                </div>
              </a>
              <a href="javascript:;" class="list-group-item list-group-item-action" @click="onClickLogout()">
                <i class="mdi mdi-logout"></i> 로그아웃
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBottom',
  props: {
    show: {
    type: Boolean,
      default: false
    },
  },
  data() {
    return {

    }
  },
  created() {
    
  },
  methods: {
    onClickMove(path) {
      setTimeout(()=>{
        this.$router.push(path)
      }, 300)
      this.$router.go(-1)
    },
    onClickLogout() {
      setTimeout(()=>{
        this.$cookies.remove('token')
        window.location.reload()  
      }, 300)
      this.$router.go(-1)      
    }
  },
  watch: {
    show(val){      
      if(val) {
        document.documentElement.style.overflowY = 'hidden'
      }else{
        document.documentElement.style.overflowY = 'auto'
      }
    }    
  },
  computed: {
    userProfile() {
      return this.$store.getters['getUserProfile']
    },
    managerPhoneNumber() {
      if(!this.userProfile) return null
      const orgnzNm = this.userProfile.orgnz_nm
      const isDisease = this.userProfile.is_disease
      const managerId = `${orgnzNm}-${isDisease}`      
      return this.$Constants.Managers[managerId]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bottom{
  .card{
    background-color: white;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    box-shadow: 0 -1px rgba(0,0,0,.075) !important;
    overflow: hidden;
    .list-group-item{
      text-align: center;
      border-color: transparent;
    }
  }
}
</style>