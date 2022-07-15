import AlertModal from '@/components/modals/Alert'
import ConfirmModal from '@/components/modals/Confirm'
import ProgressModal from '@/components/modals/Progress'
import NavBottom from '@/components/NavBottom'
import Utils from './utils'

export default {
  install(Vue) {    
    Vue.component('alert-modal', AlertModal)
    Vue.component('confirm-modal', ConfirmModal)
    Vue.component('progress-modal', ProgressModal)
    Vue.component('nav-bottom', NavBottom)
    Vue.prototype.$Utils = Utils
  }
}