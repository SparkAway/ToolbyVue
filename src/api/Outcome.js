import request from '@/utils/request'

export  const getOutcome=(current,size)=>{
  return request({
    url:"/outcome/findOutcome",
    method:'get',
    params:{
      current,
      size
    }
  })
}
/**
 * 添加收入
 *
 */
export const saveOutcome=(outcome)=>{
  return request({
    url:"/outcome/addOutcome",
    method:'post',
    data:outcome
  })
}
export  const findOutcomeCount=()=>{
  return request({
    url:"/outcome/findOutcomeCount",
    method:'get'
  })
}


