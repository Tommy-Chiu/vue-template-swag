import mapper from '@/utils/mapper'
const files = require.context('./', true, /index\.js$/)
const pageUtilFiles = require.context('../pages', true, /utils\/index\.js$/)
const moduleUtilFiles = require.context('../modules', true, /utils\/index\.js$/)

let utils = {}
let exportsMap = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let utilName = key.split('/')[1]
  exportsMap[utilName] = utils[utilName] = () => {
    return files(key).default
  }
})
exports.mapUtils = (namespace, mapStructure) => {
  return mapper({
    source: utils,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'object'
  })
}
Object.keys(exportsMap).forEach(key => {
  exports[key] = exportsMap[key]()
})

pageUtilFiles.keys().forEach(key => {
  utils[`pages/${key.split('/')[1]}`] = pageUtilFiles(key).default
})
moduleUtilFiles.keys().forEach(key => {
  utils[`modules/${key.split('/')[1]}`] = moduleUtilFiles(key).default
})
