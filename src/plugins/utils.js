import { isValid, format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns'
const koDays = ['일','월','화','수','목','금','토']
import ShortId from 'short-unique-id'
import cloneDeep from 'lodash.clonedeep'
export default {
  isDateVaild: isValid,
  dateFormat: format,
  dayOfWeek(day) {
    return koDays[day.getDay()]
  },
  numberWithComma(number) {       
    const parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')    
  },
  onInputNumberLimitLen(evt) {
    const value = evt.target.value    
    const maxLen = evt.target.getAttribute('maxlength')
    if(value == '' || !maxLen) return        
    evt.target.value = value.slice(0, maxLen)
  },
  diffDays(dt1, dt2) {
    const dt1Ymd = format(dt1, 'yyyy-MM-dd')
    const dt2Ymd = format(dt2, 'yyyy-MM-dd')
    return differenceInDays(new Date(dt1Ymd), new Date(dt2Ymd))
  },
  diffHours: differenceInHours,
  diffMins: differenceInMinutes,
  cloneObject: cloneDeep,
  reverseKeyValue(obj) { 
    let resultObj = cloneDeep(obj)
    return Object.keys(resultObj).reduce((acc, item)=>{
      const value = resultObj[item]
      acc[value] = item
      return acc
    }, {})
  },
  genUUID() {
    return new ShortId({length: 10})
  },
  getSeepHoursLabel(hours) {
    if(hours >=0 && hours <=5){
      return `새벽 ${hours}시`
    }else if(hours >= 6 && hours <= 10){
      return `아침 ${hours}시`
    }else if(hours >= 11 && hours <= 17){
      return `낮 ${(hours > 12 ? (hours - 12) : hours)}시`
    }else{
      return `밤 ${(hours > 12 ? (hours - 12) : hours)} 시`
    }
  }
}