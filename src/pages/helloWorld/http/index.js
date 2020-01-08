import {get, post}
  from '@/http'
import * as api
  from './api'

export default {
  testHttpGet (count) {
    return get(api.testGet, {
      count
    })
  },
  testHttpPost (count) {
    return post(api.testPost, {
      count
    })
  }
}
