import request from '@/utils/request'

export  const findbeiwang=(current,size)=>{
  return request({
    url:"/beiwanglu/findbeiwang",
    method:'get',
    params:{
      current,
      size
    }
  })
}
/**
 * 删除备忘
 *
 */
export const delBeiwang=(id)=>{
  return request({
    url:"/beiwanglu/delBeiwang",
    method:'post',
    params:{
      id
    }
  })
}
/**
 * 添加备忘
 *
 */
export const saveBeiwang=(beiwang)=>{
  return request({
    url:"/beiwanglu/addBeiwang",
    method:'post',
    data:beiwang
  })
}
