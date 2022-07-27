import AlertModal from '@/components/modals/Alert'
import ConfirmModal from '@/components/modals/Confirm'
import ProgressModal from '@/components/modals/Progress'
import MenuBottom from '@/components/MenuBottom'
import Utils from './utils'
import Constants from './constants'
import { Api } from './http'
export default {
  install(Vue) {    
    Vue.component('alert-modal', AlertModal)
    Vue.component('confirm-modal', ConfirmModal)
    Vue.component('progress-modal', ProgressModal)
    Vue.component('menu-bottom', MenuBottom)
    Vue.prototype.$Utils = Utils
    Vue.prototype.$Constants = Constants
    Vue.prototype.$Api = Api
  }
}