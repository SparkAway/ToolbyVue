import request from '@/utils/request'

export  const getIncome=(current,size)=>{
  return request({
    url:"/income/findIncome",
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
export const saveIncome=(income)=>{
  return request({
    url:"/income/addIncome",
    method:'post',
    data:income
  })
}
export  const findIncomeCount=()=>{
  return request({
    url:"/income/findIncomeCount",
    method:'get'
  })
}
