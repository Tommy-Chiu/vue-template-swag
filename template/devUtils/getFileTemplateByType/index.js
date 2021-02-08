const fs = require('fs')
const path = require('path')
const getTemplate = (fileName) => {
  return fs.readFileSync(path.resolve(__dirname, './templates/', fileName)).toString()
}

module.exports = (type, name) => {
  switch (type) {
    case 'docMd':
      return getTemplate('doc.md')
    case 'componentVue':
      return getTemplate('component.vue').replace(new RegExp('replaceName','g'), name.replace(/([A-Z])/g, '-$1').toLowerCase())
    case 'directiveJs':
      return getTemplate('directive.js')
    case 'filterJs':
      return getTemplate('filter.js')
    case 'utilJs':
      return getTemplate('util.js')
    case 'routeIndexJs':
      return getTemplate('route.index.js').replace(new RegExp('replaceName','g'), name.replace(/([A-Z])/g, '_$1').toLowerCase())
    case 'requestsUrlJs':
      return getTemplate('requests.url.js')
    case 'requestsIndexJs':
      return getTemplate('requests.index.js')
    case 'storeIndexJs':
      return getTemplate('store.index.js')
    case 'exportCMJs':
      return getTemplate('exportCM.js')
    case 'exportDFUJs':
      return getTemplate('exportDFU.js')
  }
}
