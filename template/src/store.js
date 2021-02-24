import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let modules = {}

const pageStoreFiles = require.context('./pages', true, /store\/index\.js$/)
pageStoreFiles.keys().forEach(key => {
  let module = pageStoreFiles(key).default
  module.namespaced = true
  modules[`pages/${key.split('/')[1]}`] = module
})

const moduleStoreFiles = require.context('./modules', true, /store\/index\.js$/)
moduleStoreFiles.keys().forEach(key => {
  let module = moduleStoreFiles(key).default
  module.namespaced = true
  modules[`modules/${key.split('/')[1]}`] = module
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
