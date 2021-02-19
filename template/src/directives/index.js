const getMapper = require('../utils').getMapper

const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let directive = files(key).default
  let directiveName = key.split('/')[1]
  directive.install = (Vue) => {
    Vue.directive(directiveName, directive)
  }
  exports[directiveName] = directive
})

const pageDirectiveFiles = require.context('../pages', true, /directives\/index\.js$/)
pageDirectiveFiles.keys().forEach(key => {
  exports[`pages/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = pageDirectiveFiles(key).default
})

const moduleDirectiveFiles = require.context('../modules', true, /directives\/index\.js$/)
moduleDirectiveFiles.keys().forEach(key => {
  exports[`modules/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = moduleDirectiveFiles(key).default
})

exports.mapper = getMapper(exports)
