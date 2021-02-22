import mapper from '@/utils/mapper'
const files = require.context('./', true, /index\.vue$/)
const pageComponentFiles = require.context('../pages', true, /components\/index\.js$/)
const moduleComponentFiles = require.context('../modules', true, /components\/index\.js$/)

let components = {}
let exportsMap = {}

files.keys().forEach(key => {
  let componentName = key.split('/')[1]
  exportsMap[componentName] = components[componentName] = () => {
    let component = files(key).default
    component.name = componentName
    component.install = (Vue) => {
      Vue.component(componentName, component)
    }
    return component
  }
})
exports.mapComponents = (namespace, mapStructure) => {
  return mapper({
    source: components,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'object'
  })
}
Object.keys(exportsMap).forEach(key => {
  exports[key] = exportsMap[key]()
})

pageComponentFiles.keys().forEach(key => {
  components[`pages/${key.split('/')[1]}`] = pageComponentFiles(key).default
})
moduleComponentFiles.keys().forEach(key => {
  components[`modules/${key.split('/')[1]}`] = moduleComponentFiles(key).default
})
