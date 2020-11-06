const path = require('path')
const requireContext = require('require-context')
const bodyParser = require('body-parser')
const connectMultiparty = require('connect-multiparty');
const chokidar = require('chokidar')
const clearModule = require('clear-module')
const pathToRegexp = require('path-to-regexp')
const color = require('colors-cli/safe')

let router
function setRouter () {
  router = {}
  let files = requireContext(path.resolve(__dirname, './api'), true, /index\.js$/)
  files.keys().forEach(key => {
    let prefix = key.replace('index.js', '').replace('\\', '/')
    if (key === 'index.js') return
    let routerModule = files(key)
    for (let k in routerModule) {
      router[k.replace(' /', ` /${prefix}`)] = routerModule[k]
    }
  })
}
function cleanCache (modulePath) {
  try {
    modulePath = require.resolve(modulePath)
  } catch (e) {}
  let module = require.cache[modulePath]
  if (!module) return
  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1)
  }
  clearModule(modulePath)
}
chokidar.watch(path.resolve(__dirname, './api')).on('all', (event, path) => {
  try {
    if (event === 'add' || event === 'change') {
      cleanCache(path)
      setRouter()
      console.log(`${color.green_b.black(' Done: ')} Hot Router ${color.green(path.replace(process.cwd(), ''))} file replacement success!`)
    }
  } catch (ex) {
    console.error(`${color.red_b.black(' Failed: ')} Hot Router ${color.red(path.replace(process.cwd(), ''))} file replacement failed!!`)
  }
})

module.exports = (app) => {
  app.use(bodyParser())
  app.use(connectMultiparty())
  app.all('/mock/*', (req, res, next) => {
    let routerKey = Object.keys(router).find((routerName) => {
      let reqMethod = req.method
      let routerPath = routerName.replace(new RegExp('^' + reqMethod + ' '), '')
      let reqPath = req.path.replace('/mock', '')
      return !!pathToRegexp(routerPath).exec(reqPath)
    })

    if (
      !routerKey &&
      req.method.toLocaleUpperCase() === 'OPTIONS' &&
      Object.keys(router).find((routerName) => {
        let routerPath = routerName.replace((new RegExp('^(GET|POST|PUT|DELETE) ')), '')
        let reqPath = req.path.replace('/mock', '')
        return !!pathToRegexp(routerPath).exec(reqPath)
      })
    ) {
      return res.sendStatus(200)
    }

    if (router[routerKey]) {
      let result = router[routerKey]
      if (typeof result === 'function') {
        result(req, res, next)
      } else {
        res.json(result)
      }
    } else {
      next()
    }
  })
  return (req, res, next) => {
    next()
  }
}
