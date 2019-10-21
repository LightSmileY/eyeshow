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

// 用户登录
export const signIn = data => {
  return axios({
    url: serverUrl + '/user/user/login',
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

// 获取该用户发表的所有帖子
export const getPostsByUserID = params => {
  return axios({
    url: serverUrl + '/post/post/getPostByUserId',
    method: 'get',
    params
  })
}

// 获取该用户收藏的所有帖子
export const getCollectionPosts = params => {
  return axios({
    url: serverUrl + '/community/community/getAllPostsFavorite',
    method: 'get',
    params
  })
}

// 获取该用户的关注
export const getAttents = params => {
  return axios({
    url: serverUrl + '/relation/relation/getAllFollowsByFansId',
    method: 'get',
    params
  })
}

// 获取该用户的粉丝
export const getFanses = params => {
  return axios({
    url: serverUrl + '/relation/relation/getAllFansByFollowsId',
    method: 'get',
    params
  })
}

// 获取用户资料
export const getUserInfo = params => {
  return axios({
    url: serverUrl + '/user/user/getUserById',
    method: 'get',
    params
  })
}

// 修改用户资料
export const updateUserInfo = data => {
  return axios({
    url: serverUrl + '/myuser/myuser/updateSelective',
    method: 'post',
    data
  })
}