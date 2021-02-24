import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/******************************************************************************
 * TODO:
 * [vue-router] Failed to resolve async component default:
 * TypeError: Cannot read property 'beforeRouteEnter' of undefined
 ******************************************************************************/
let routes = [
  {
    path: '/',
    redirect: '/hello_world' // The default home page
  }
]

let concatRoutes = []
const routefiles = require.context('./pages', true, /route\/index\.js$/)
const indexfiles = require.context('./pages', true, /index\.vue$/)
routefiles.keys().sort((pre, next) => {
  return pre.split('/').length - next.split('/').length
}).forEach(key => {
  let arr = key.split('/')
  arr = arr.splice(1, arr.length - 3)
  let module = routefiles(key).default
  module._idx = arr[ arr.length - 1 ]
  indexfiles.keys().forEach(key => {
    if (key === `./${arr.join('/')}/index.vue`) {
      module.component = (resolve) => {
        let component = indexfiles(key)
        component.default.name = `${module._idx}Page`
        resolve(component)
      }
    }
  })
  if (arr.length === 1) {
    if (module.isHomePage) {
      routes[ 0 ].redirect = module.path
    }
    if (module.isNotFoundPage) {
      concatRoutes.push(module)
    } else {
      concatRoutes.unshift(module)
    }
  } else if (arr.length > 1) {
    let target = concatRoutes
    arr.splice(-1, 1)
    arr.forEach(item => {
      if (item === 'children') {
        if (!target.children) {
          target.children = []
        }
        target = target.children
      } else {
        let res = target.findIndex(targetChildrenItem => targetChildrenItem._idx === item)
        if (res !== -1) {
          target = target[ res ]
        }
      }
    })
    target.push(module)
  }
})

routes = routes.concat(concatRoutes)

const instance = new Router({
  /******************************************************************************
   * TODO:
   * When using history mode,
   * all you need to do is add a simple catch-all fallback route to your server.
   * If the URL doesn't match any static assets,
   * it should serve the same index.html page
   ******************************************************************************/
  mode: 'history',
  routes
})

function func (type, prototypeFunc, instance) {
  return function () {
    let result = prototypeFunc.call(instance, ...arguments)
    switch (type) {
      case 'push':
      case 'replace':
        if (typeof result !== 'undefined') {
          // catch: 解决vue-router在3.0版本以上编程式导航重复触发了同一个路由的报错问题
          return result.catch(err => err)
        } else {
          return result
        }
      case 'go':
        break
    }
  }
}
Router.prototype.push = func('push', Router.prototype.push, instance)
Router.prototype.replace = func('replace', Router.prototype.replace, instance)
Router.prototype.go = func('go', Router.prototype.go, instance)

instance.beforeEach((to, from, next) => {
  next()
})

export default instance
