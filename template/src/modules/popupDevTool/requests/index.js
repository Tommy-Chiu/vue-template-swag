import { get, post }
  from '@/requestor'
import * as url
  from './url'

export default {
  testHttpGet (count) {
    return get(url.testGet, {
      count
    })
  },
  testHttpPost (count) {
    return post(url.testPost, {
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
    return post(url.runScript, {
      scriptType: type,
      scriptPath: path,
      ...other
    }, { headers })
  }
}
