import mapper from '@/utils/mapper'
const files = require.context('./', true, /index\.js$/)
const pageFilterFiles = require.context('../pages', true, /filters\/index\.js$/)
const moduleFilterFiles = require.context('../modules', true, /filters\/index\.js$/)

let filters = {}
let exportsMap = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let filterName = key.split('/')[1]
  exportsMap[filterName] = filters[filterName] = () => {
    let filter = files(key).default
    filter.install = (Vue) => {
      Vue.filter(filterName, filter)
    }
    return filter
  }
})
exports.mapFilters = (namespace, mapStructure) => {
  return mapper({
    source: filters,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'object'
  })
}
Object.keys(exportsMap).forEach(key => {
  exports[key] = exportsMap[key]()
})

pageFilterFiles.keys().forEach(key => {
  filters[`pages/${key.split('/')[1]}`] = pageFilterFiles(key).default
})
moduleFilterFiles.keys().forEach(key => {
  filters[`modules/${key.split('/')[1]}`] = moduleFilterFiles(key).default
})
