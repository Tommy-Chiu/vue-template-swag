import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const modules = {}

const files = require.context('./pages', true, /store\/index\.js$/)
files.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  let module = files(key).default
  module.namespaced = true
  let moduleName = arr[0]
  modules[moduleName] = module
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
