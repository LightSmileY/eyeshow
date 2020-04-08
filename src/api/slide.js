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

// 分开发表帖子
// export const mergePace = data => {
//   return axios({
//     url: 'https://fengblog.xyz:3029/message/getMergeImage',
//     method: 'post',
//     data
//   })
// }

export const mergePace = params => {
  return axios({
    url: 'http://10.100.116.100:8000/recomment/test',
    method: 'get',
    params
  })
}