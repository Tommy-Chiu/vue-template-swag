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
    exports[`pageMixin${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = pageMixinFiles(key).default
  }
})
