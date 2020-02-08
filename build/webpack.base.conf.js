'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'rules')
    ]
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test:/\.pug$/,
        loader: 'pug-html-loader'
      },
      {
        test: /\.md$/,
        loader: 'vue-md-loader',
        options: {
          raw: true,
          preventExtract: true,
          html: true,
          breaks: true,
          linkify: true,
          typographer:true,
          preprocess: function(markdownIt, content) {
            if (content.indexOf('::: demo :::') !== -1) {
              let contentArr = content.split('::: demo :::')
              for (let i = 0; i <= contentArr.length; i++) {
                if (i % 2 !== 0 && contentArr[i] && contentArr[i].indexOf('<template lang="pug">') !== -1) {
                  let dataArr = contentArr[i].split('```')
                  const $ = require('cheerio').load(dataArr[1], {
                    decodeEntities: false,
                    lowerCaseAttributeNames: false,
                    lowerCaseTags: false
                  })
                  const codeData = {
                    style: `${$.html('style')}`,
                    html: null,
                    script: `${$.html('script')}`
                  }
                  $('style').remove()
                  $('script').remove()
                  codeData.html = require('pug').render($.html().replace('<template lang="pug">', '<template>'))
                  let view = '::: demo view' + `\n${codeData.style}\n${codeData.html}\n${codeData.script}\n` + ':::'
                  let description = '::: demo description' + dataArr[0] + ':::'
                  let code = '::: demo code\n```' + dataArr[1] + '```\n:::'
                  contentArr[i] = `${view}\n${description}\n${code}`
                }
              }
              content = contentArr.join('\n')
            }
            return content
          },
          use: [
            require('markdown-it-sup'),
            require('markdown-it-sub'),
            require('markdown-it-footnote'),
            require('markdown-it-deflist'),
            require('markdown-it-abbr'),
            require('markdown-it-emoji'),
            require('markdown-it-ins'),
            require('markdown-it-mark'),
            require('markdown-it-task-lists'),
            [require('markdown-it-container'), 'plugin', {
              validate: function (params) {
                return params.trim().match(/^plugin\s+(.*)$/)
              },
              render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  let info = tokens[idx].info.trim().match(/^plugin\s+(.*)$/)
                  let pluginType = info && info.length > 1 ? info[1] : ''
                  return `<md-plugin :pluginType="'${pluginType}'">\n`
                } else {
                  return `</md-plugin>\n`
                }
              }
            }],
            [require('markdown-it-container'), 'demo', {
              validate: function (params) {
                return params.trim().match(/^demo\s+(.*)$/)
              },
              render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  let contentType = tokens[idx].info.trim().match(/^demo\s+(.*)$/)[1]
                  return `<md-demo :contentType="'${contentType}'">\n`
                } else {
                  return `</md-demo>\n`
                }
              }
            }]
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
