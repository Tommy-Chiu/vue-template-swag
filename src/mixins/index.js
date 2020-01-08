const files = require.context('./', true, /index\.vue$/)
files.keys().forEach(key => {
  let mixin = files(key).default
  let mixinName = key.split('/')[1]
  mixin.install = (Vue) => {
    Vue.mixin(mixin)
  }
  exports[mixinName] = mixin
})
