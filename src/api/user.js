import { get} from './http'

//登录
export function getLogin(username,password){
  return get('/getLogin',username,password)
}
