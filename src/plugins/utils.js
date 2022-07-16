import { isValid, format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns'
const koDays = ['일','월','화','수','목','금','토']
import cloneDeep from 'lodash.clonedeep'
export default {
  isDateVaild: isValid,
  dateFormat: format,
  dayOfWeek(day) {
    return koDays[day.getDay()]
  },
  numberWithComma(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  },
  onInputNumberLimitLen(evt) {
    const value = evt.target.value    
    const maxLen = evt.target.getAttribute('maxlength')
    if(value == '' || !maxLen) return    
    console.log(value.slice(0, maxLen))
    evt.target.value = value.slice(0, maxLen)
  },
  diffDays: differenceInDays,
  diffHours: differenceInHours,
  diffMins: differenceInMinutes,
  cloneObject: cloneDeep
}