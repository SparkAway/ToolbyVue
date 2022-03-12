import request from '@/utils/request'

export  const findUserList=(current,size,tbUserVO)=>{
  return request({
    url:"/user/findUserPage",
    method:'post',
    params:{
      current,
      size
    },
    data:tbUserVO
  })
}

/**
 * 添加用户
 *
 */
export const saveTbUser=(tbUser)=>{
  return request({
    url:"/user/addTbUser",
    method:'post',
    data:tbUser
  })
}
/**
 * 删除用户
 *
 */
export const delTbUser=(id)=>{
  return request({
    url:"/user/delTbUser",
    method:'post',
    params:{
      id
    }
  })
}
/**
 * 更新用户
 *
 */
export const updateTbUser=(editForm)=>{
  return request({
    url:"/user/updateTbUser",
    method:'post',
    data:editForm
  })
}
