
function getRnadomNumber(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

function isRandomBool() {
  return (getRnadomNumber(0, 1) % 2 == 0)
}

export const generatesDailyRows = (dateList)=>{
  return dateList.reduce((acc, item)=>{
    acc[item] = {
      date: item,      
      daily: (isRandomBool()) ? 1 : 0,
      food: (isRandomBool()) ? 1 : 0,
      miband: (isRandomBool()) ? 1 : 0
    }
    acc[item].success = (acc[item].daily + acc[item].food + acc[item].miband) == 3
    acc[item].point = (acc[item].success) ? 1000 : 0
    return acc
  }, {})
}