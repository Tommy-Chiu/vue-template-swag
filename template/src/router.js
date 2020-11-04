import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/hello_world' // The default home page
  }
]

const files = require.context('./pages', true, /router\/index\.js$/)
files.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  let module = files(key).default
  module.name = arr[0]
  if (module.isHomePage) {
    routes[0].redirect = module.path
  }
  module.component = (resolve) => {
    require([`./pages/${arr[0]}`], (component) => {
      component.default.name = arr[0]
      resolve(component)
    })
  }
  routes.push(module)
})

export default new Router({
  mode: 'history',
  routes
})
