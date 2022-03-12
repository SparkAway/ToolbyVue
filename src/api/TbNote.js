import request from '@/utils/request'

export  const findNoteCount=()=>{
  return request({
    url:"/note/findNoteCount",
    method:'get'
  })
}
