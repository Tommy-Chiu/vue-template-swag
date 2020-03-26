import { post }
  from '@/http'
import * as api
  from './api'

export default {
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
