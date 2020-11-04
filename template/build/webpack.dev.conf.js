'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const requireContext = require('require-context')
const bodyParser = require('body-parser')
const connectMultiparty = require('connect-multiparty');
const chokidar = require('chokidar')
const clearModule = require('clear-module')
const pathToRegexp = require('path-to-regexp')
const color = require('colors-cli/safe')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

let router
function setRouter () {
  router = {}
  let files = requireContext(path.resolve(__dirname, '../mock'), true, /index\.js$/)
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
chokidar.watch(path.resolve(__dirname, '../mock')).on('all', (event, path) => {
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

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before: (app) => {
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
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
