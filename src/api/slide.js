import axios from 'axios'
import {serverUrl} from '../utils/env.js'

// 获取所有帖子
export const getMyImages = () => {
  return axios({
    url: serverUrl + '/myimg/myimg/list',
    method: 'get'
  })
  .then(res => {
    console.log(res.data.detailMsg.data.content)
    return res.data.detailMsg.data.content
  })
  .catch(err => {
    if (err) {
      console.log(err)
    }
  })
}