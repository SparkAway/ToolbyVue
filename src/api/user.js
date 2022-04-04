import { get, post } from './http'
import axios from 'axios'
import jquery from 'jquery'
import request from '@/utils/request'
const qs = require('qs');
//登录
export function getLogin(data){

    console.log(data);
    return request({
      url:"http://127.0.0.1:4000/api/loginuser",
      method:'post',
      data:data
    })
    //  return axios({
    //    headers: {
    //      'Content-Type': 'application/x-www-form-urlencoded'
    //    },
    //    url:"http://127.0.0.1:4000/api/loginuser",
    //    method:'POST',
    //    data:qs.stringify(data)
    // });
}
