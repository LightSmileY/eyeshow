import axios from 'axios'
import {serverUrl} from '../utils/env.js'
import store from '@/store/store'

// 获取所有商品
export const getAllCommodity = () => {
  return axios({
    url: serverUrl + '/community/community/getAllCommodityLogin',
    method: 'get',
    params: {user_ID: store.state.userInfo.id || "-1"}
  })
}

// 根据类型获取该类型所有商品
export const getAllCommodityByType = params => {
  return axios({
    url: serverUrl + '/community/community/getAllCommodityByTypeLogin',
    method: 'get',
    params
  })
}

// 根据品牌获取该类型所有商品
export const getAllCommodityByBrand = params => {
  return axios({
    url: serverUrl + '/community/community/getAllCommodityByBrandLogin',
    method: 'get',
    params
  })
}

// 根据功效获取该类型所有商品
export const getAllCommodityByEffacicy = params => {
  return axios({
    url: serverUrl + '/community/community/getAllCommodityByEffacicyLogin',
    method: 'get',
    params
  })
}

// 根据id查询一条帖子
export const getCommodityByIdLogin = params => {
  return axios({
    url: serverUrl + '/community/community/getCommodityByIdLogin',
    method: 'get',
    params
  })
}

// 点赞
export const likePost = data => {
  return axios({
    url: serverUrl + '/plikes/plikes/insertSelective',
    method: 'post',
    data
  })
}

// 取消点赞
export const unLikePost = params => {
  return axios({
    url: serverUrl + '/plikes/plikes/deleteByUserIdAndPostId',
    method: 'delete',
    params
  })
}

// 收藏
export const collectPost = data => {
  return axios({
    url: serverUrl + '/pfavorites/pfavorites/insertSelective',
    method: 'post',
    data
  })
}

// 取消收藏
export const unCollectPost = params => {
  return axios({
    url: serverUrl + '/pfavorites/pfavorites/deleteByUserIdAndPostId',
    method: 'delete',
    params
  })
}

// 评论
export const commentPost = data => {
  return axios({
    url: serverUrl + '/pcomments/pcomments/insertSelective',
    method: 'post',
    data
  })
}