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

const pageComponentFiles = require.context('../pages', true, /index\.js$/)
pageComponentFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'component') {
    exports[`pages/${arr[0]}`] = pageComponentFiles(key).default
  }
})

const moduleComponentFiles = require.context('../modules', true, /index\.js$/)
moduleComponentFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'component') {
    exports[`modules/${arr[0]}`] = moduleComponentFiles(key).default
  }
})

exports.mapper = getMapper(exports)
