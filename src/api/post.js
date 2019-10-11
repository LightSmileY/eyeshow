import axios from 'axios'
import {serverUrl} from '../utils/env.js'

// 发表帖子
export const addPostAndImages = data => {
  return axios({
    url: serverUrl + '/community/community/publishPostImages',
    method: 'post',
    data
  })
  .then(res => {
    console.log(res)
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 分开发表帖子
export const addPost = data => {
  return axios({
    url: serverUrl + '/post/post/insertSelective',
    method: 'post',
    data
  })
  .then(res => {
    console.log(res)
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 添加图片
export const addPostImages = data => {
  return axios({
    url: serverUrl + '/pimage/pimage/insertImages',
    method: 'post',
    data
  })
  .then(res => {
    console.log(res)
    // return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 添加视频
export const addPostVideo = data => {
  return axios({
    url: serverUrl + '/pvideo/pvideo/insertSelective',
    method: 'post',
    data
  })
  .then(res => {
    console.log(res)
    // return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 获取所有帖子
export const getAllPosts = () => {
  return axios({
    url: serverUrl + '/community/community/getAllPosts',
    method: 'get'
  })
  .then(res => {
    console.log(res.data.detailMsg.data)
    return res.data.detailMsg.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 获取自己关注的人最近发表的帖子
export const getFollowsPost = params => {
  return axios({
    url: serverUrl + '/community/community/getFollowsPost',
    method: 'get',
    params
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 根据类型获取该类型所有帖子
export const getAllPostsByType = params => {
  return axios({
    url: serverUrl + '/community/community/getAllPostsByType',
    method: 'get',
    params
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 根据类型获取该类型所有帖子
export const getAllPostsByStyle = params => {
  return axios({
    url: serverUrl + '/community/community/getAllPostsByStyle',
    method: 'get',
    params
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 根据id查询一条帖子
export const getPostById = params => {
  return axios({
    url: serverUrl + '/community/community/getPostById',
    method: 'get',
    params
  })
  .then(res => {
    console.log(res.data)
    return res.data.detailMsg.data[0]
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 根据id删除一条帖子
export const deletePostById = params => {
  return axios({
    url: serverUrl + '/post/post/deletePostById',
    method: 'delete',
    params
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 点赞
export const likePost = data => {
  return axios({
    url: serverUrl + '/plikes/plikes/insertSelective',
    method: 'delete',
    data
  })
  .then(res => {
    return res.data
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}