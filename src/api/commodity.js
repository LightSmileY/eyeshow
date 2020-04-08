import axios from 'axios'
import {
  serverUrl
} from '../utils/env.js'
import store from '@/store/store'

// 获取所有商品
export const getAllCommodity = () => {
  return axios({
    url: serverUrl + '/mall/mall/getAllCommodityLogin',
    method: 'get',
    params: {
      user_ID: store.state.userInfo.id || "-1"
    }
  })
}

// 根据关键词查询所有商品
export const getAllCommodityByKeyWord = params => {
  return axios({
    url: serverUrl + '/mall/mall/getAllCommodityLikeSearchLogin',
    method: 'get',
    params
  })
}

// 根据类型获取该类型所有商品
export const getAllCommodityByType = params => {
  return axios({
    url: serverUrl + '/mall/mall/getAllCommodityByTypeLogin',
    method: 'get',
    params
  })
}

// 根据品牌获取该类型所有商品
export const getAllCommodityByBrand = params => {
  return axios({
    url: serverUrl + '/mall/mall/getAllCommodityByBrandLogin',
    method: 'get',
    params
  })
}

// 根据功效获取该类型所有商品
export const getAllCommodityByEffacicy = params => {
  return axios({
    url: serverUrl + '/mall/mall/getAllCommodityByEffacicyLogin',
    method: 'get',
    params
  })
}

// 获取所有类型
export const getAllType = () => {
  return axios({
    url: serverUrl + '/ctype/ctype/list',
    method: 'get'
  })
}

// 获取所有品牌
export const getAllBrand = () => {
  return axios({
    url: serverUrl + '/cbrand/cbrand/list',
    method: 'get'
  })
}

// 获取所有功效
export const getAllEffacicy = () => {
  return axios({
    url: serverUrl + '/effacicy/effacicy/list',
    method: 'get'
  })
}

// 根据id查询一个商品
export const getCommodityByIdLogin = params => {
  return axios({
    url: serverUrl + '/mall/mall/getCommodityByIdLogin',
    method: 'get',
    params
  })
}

// 分开发表帖子
export const addPost = data => {
  return axios({
    url: serverUrl + '/post/post/insertSelective',
    method: 'post',
    data
  })
}

// 添加图片
export const addPostImage = data => {
  return axios({
    url: serverUrl + '/cimage/cimage/insertSelective',
    method: 'post',
    data
  })
}

// 点赞
export const likeCommodity = data => {
  return axios({
    url: serverUrl + '/clikes/clikes/insertSelective',
    method: 'post',
    data
  })
}

// 取消点赞
export const unLikeCommodity = params => {
  return axios({
    url: serverUrl + '/clikes/clikes/deleteByUserIdAndPostId',
    method: 'delete',
    params
  })
}

// 收藏
export const collectCommodity = data => {
  return axios({
    url: serverUrl + '/cfavorites/cfavorites/insertSelective',
    method: 'post',
    data
  })
}

// 取消收藏
export const unCollectCommodity = params => {
  return axios({
    url: serverUrl + '/cfavorites/cfavorites/deleteByUserIdAndPostId',
    method: 'delete',
    params
  })
}

// 评论
export const commentCommodity = data => {
  return axios({
    url: serverUrl + '/ccomments/ccomments/insertSelective',
    method: 'post',
    data
  })
}