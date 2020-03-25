import { get, post }
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
  },
  runScript ({type, path, ...other}) {
    let headers
    switch (type) {
      case 'pages':
      case 'modules':
      case 'components':
      case 'directives':
      case 'filters':
      case 'mixins':
      case 'utils':
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        break
      case 'icons':
        headers = {'Content-Type': 'multipart/form-data'}
        break
    }
    return post(api.runScript, {
      scriptType: type,
      scriptPath: path,
      ...other
    }, { headers })
  }
}
