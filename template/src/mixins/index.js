import mapper from '@/utils/mapper'
const files = require.context('./', true, /index\.vue$/)
const pageMixinFiles = require.context('../pages', true, /mixins\/index\.js$/)
const moduleMixinFiles = require.context('../modules', true, /mixins\/index\.js$/)

let mixins = {}
let exportsMap = {}

files.keys().forEach(key => {
  let mixinName = key.split('/')[1]
  exportsMap[mixinName] = mixins[mixinName] = () => {
    let mixin = files(key).default
    mixin.install = (Vue) => {
      Vue.mixin(mixin)
    }
    return mixin
  }
})
exports.mapMixins = (namespace, mapStructure) => {
  return mapper({
    source: mixins,
    namespace: mapStructure ? namespace : null,
    mapStructure: mapStructure || namespace,
    structureType: 'array'
  })
}
Object.keys(exportsMap).forEach(key => {
  exports[key] = exportsMap[key]()
})

pageMixinFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\/children)/g, '').split('/')
  arr = arr.splice(0, arr.length - 2)
  mixins[`pages/${arr.join('/')}`] = pageMixinFiles(key).default
})
moduleMixinFiles.keys().forEach(key => {
  mixins[`modules/${key.split('/')[1]}`] = moduleMixinFiles(key).default
})
