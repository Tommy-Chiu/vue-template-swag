const fs = require('fs')
const path = require('path')
const getTemplate = (fileName) => {
  return fs.readFileSync(path.resolve(__dirname, './templates/', fileName)).toString()
}

module.exports = (type, name) => {
  switch (type) {
    case 'docMd':
      return getTemplate('doc.md')
    case 'componentIndexVue':
      return getTemplate('component.index.vue').replace(new RegExp('replaceName','g'), name.replace(/([A-Z])/g, '-$1').toLowerCase())
    case 'directiveIndexJs':
      return getTemplate('directive.index.js')
    case 'filterIndexJs':
      return getTemplate('filter.index.js')
    case 'utilIndexJs':
      return getTemplate('util.index.js')
  }
}
