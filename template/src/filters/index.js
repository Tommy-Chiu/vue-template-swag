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

const pageFilterFiles = require.context('../pages', true, /filters\/index\.js$/)
pageFilterFiles.keys().forEach(key => {
  exports[`pages/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = pageFilterFiles(key).default
})

const moduleFilterFiles = require.context('../modules', true, /filters\/index\.js$/)
moduleFilterFiles.keys().forEach(key => {
  exports[`modules/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = moduleFilterFiles(key).default
})

exports.mapper = getMapper(exports)
