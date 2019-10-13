import axios from 'axios'
import {serverUrl} from '../utils/env.js'

// 用户注册
export const signUp = data => {
  return axios({
    url: serverUrl + '/myuser/myuser/insertSelective',
    method: 'post',
    data
  })
}

//关注用户
export const attentUser = data => {
  return axios({
    url: serverUrl + '/relation/relation/insertSelective',
    method: 'post',
    data
  })
}

//取消关注
export const unAttentUser = params => {
  return axios({
    url: serverUrl + '/relation/relation/deleteByFansIdAndFollowsId',
    method: 'delete',
    params
  })
}