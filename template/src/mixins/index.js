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

const pageMixinFiles = require.context('../pages', true, /mixins\/index\.js$/)
pageMixinFiles.keys().forEach(key => {
  exports[`pages/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = pageMixinFiles(key).default
})

const moduleMixinFiles = require.context('../modules', true, /mixins\/index\.js$/)
moduleMixinFiles.keys().forEach(key => {
  exports[`modules/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = moduleMixinFiles(key).default
})

exports.mapper = getMapper(exports, 'array')
