/** 请求提供四种方式，get、put、delete、post、patch，分别对应读取、新建、删除、更新、部分更新的资源操作 */
import axios from 'axios'

axios.defaults.baseURL = '/v1/api'
axios.defaults.withCredentials = true

// 统一请求拦截处理
axios.interceptors.request.use(config => {
  if (this.token) {
    // 让每个请求携带token-- ['Authorization']
    config.headers['Authorization'] = 'Bearer ' + this.token
    // 处理刷新token后重新请求的自定义变量
    config['refresh_token'] = false
  }
  return config
}, error => {
  Promise.reject(error)
})

// 统一返回拦截处理,设置restful规范的接口返回处理
axios.interceptors.response.use(data => {
  if (data.status && data.status === 200) {
    console.log(data.status)
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    console.log(err.response.status)
  } else if (err.response.status === 403) {
    console.log(err.response.status)
  } else {
    console.log(err.response.status)
  }
  return Promise.resolve(err)
})

export default {
  // get请求默认使用param传参，不适用data传参（data传参使用的是body传参）
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: param
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put (url, data, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: data,
        param: param
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  del (url, data, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: data,
        param: param
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (url, data, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        param: param
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  patch (url, data, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'patch',
        url: url,
        data: data,
        param: param
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
