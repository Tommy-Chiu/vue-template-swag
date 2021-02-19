const getMapper = require('../utils').getMapper

const files = require.context('./', true, /index\.vue$/)
files.keys().forEach(key => {
  let component = files(key).default
  let componentName = key.split('/')[1]
  component.name = componentName
  component.install = (Vue) => {
    Vue.component(componentName, component)
  }
  exports[componentName] = component
})

const pageComponentFiles = require.context('../pages', true, /components\/index\.js$/)
pageComponentFiles.keys().forEach(key => {
  exports[`pages/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = pageComponentFiles(key).default
})

const moduleComponentFiles = require.context('../modules', true, /components\/index\.js$/)
moduleComponentFiles.keys().forEach(key => {
  exports[`modules/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = moduleComponentFiles(key).default
})

exports.mapper = getMapper(exports)
