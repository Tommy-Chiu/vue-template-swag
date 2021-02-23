import mapper from '@/utils/mapper'
const files = require.context('./', true, /index\.js$/)
const pageDirectiveFiles = require.context('../pages', true, /directives\/index\.js$/)
const moduleDirectiveFiles = require.context('../modules', true, /directives\/index\.js$/)

let directives = {}
let exportsMap = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let directiveName = key.split('/')[1]
  exportsMap[directiveName] = directives[directiveName] = () => {
    let directive = files(key).default
    directive.install = (Vue) => {
      Vue.directive(directiveName, directive)
    }
    return directive
  }
})
exports.mapDirectives = (namespace, mapStructure) => {
  return mapper({
    source: directives,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'object'
  })
}
Object.keys(exportsMap).forEach(key => {
  exports[key] = exportsMap[key]()
})

pageDirectiveFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\/children)/g, '').split('/')
  arr = arr.splice(0, arr.length - 2)
  directives[`pages/${arr.join('/')}`] = pageDirectiveFiles(key).default
})
moduleDirectiveFiles.keys().forEach(key => {
  directives[`modules/${key.split('/')[1]}`] = moduleDirectiveFiles(key).default
})
