const getMapper = require('../utils').getMapper

const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let filter = files(key).default
  let filterName = key.split('/')[1]
  filter.install = (Vue) => {
    Vue.filter(filterName, filter)
  }
  exports[filterName] = filter
})

const pageFilterFiles = require.context('../pages', true, /index\.js$/)
pageFilterFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'filter') {
    exports[`pages/${arr[0]}`] = pageFilterFiles(key).default
  }
})

const moduleFilterFiles = require.context('../modules', true, /index\.js$/)
moduleFilterFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'filter') {
    exports[`modules/${arr[0]}`] = moduleFilterFiles(key).default
  }
})

exports.mapper = getMapper(exports)
