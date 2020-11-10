const getMapper = require('../utils').getMapper

const files = require.context('./', true, /index\.vue$/)
files.keys().forEach(key => {
  let mixin = files(key).default
  let mixinName = key.split('/')[1]
  mixin.install = (Vue) => {
    Vue.mixin(mixin)
  }
  exports[mixinName] = mixin
})

const pageMixinFiles = require.context('../pages', true, /index\.js$/)
pageMixinFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'mixin') {
    exports[`pages/${arr[0]}`] = pageMixinFiles(key).default
  }
})

const moduleMixinFiles = require.context('../modules', true, /index\.js$/)
moduleMixinFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'mixin') {
    exports[`modules/${arr[0]}`] = moduleMixinFiles(key).default
  }
})

exports.mapper = getMapper(exports, 'array')
