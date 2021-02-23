import axios from 'axios'
import qs from 'qs'
import { mapper } from '@/utils'

const instance = axios.create({
  baseURL: window.CONFIG.BASE_URL,
  timeout: 120000,
  transformRequest: [
    (data, headers) => {
      // console.log('transformRequest:', data, headers)
      let params
      switch (headers['Content-Type']) {
        case 'application/x-www-form-urlencoded':
          params = qs.stringify(data)
          break
        case 'application/json':
          params = JSON.stringify(data)
          break
        case 'multipart/form-data':
          params = new FormData()
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              params.append(key, data[key])
            }
          }
          break
        default:
          params = qs.stringify(data)
          break
      }
      return params
    }
  ],
  transformResponse: [
    (data, headers) => {
      // console.log('transformResponse:', data, headers)
      return data
    }
  ]
})

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export const request = (options = {
  method: '',
  url: '',
  data: null,
  params: null
}) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const get = (url, options = {}, otherOptions) => {
  return request({
    method: 'get',
    url: url,
    params: {
      ...options
    },
    ...otherOptions
  })
}
export const post = (url, options = {}, otherOptions) => {
  return request({
    method: 'post',
    url: url,
    data: {
      ...options
    },
    ...otherOptions
  })
}
export const put = (url, options = {}, otherOptions) => {
  return request({
    method: 'put',
    url: url,
    data: {
      ...options
    },
    ...otherOptions
  })
}
export const del = (url, options = {}, otherOptions) => {
  return request({
    method: 'delete',
    url: url,
    params: {
      ...options
    },
    ...otherOptions
  })
}

let requests = {}

exports.mapRequests = (namespace, mapStructure) => {
  return mapper({
    source: requests,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'object',
    runIt: false
  })
}

const pageRequestsFiles = require.context('./pages', true, /requests\/index\.js$/)
pageRequestsFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\/children)/g, '').split('/')
  arr = arr.splice(0, arr.length - 2)
  requests[`pages/${arr.join('/')}`] = pageRequestsFiles(key).default
})

const moduleRequestsFiles = require.context('./modules', true, /requests\/index\.js$/)
moduleRequestsFiles.keys().forEach(key => {
  requests[`modules/${key.split('/')[1]}`] = moduleRequestsFiles(key).default
})
