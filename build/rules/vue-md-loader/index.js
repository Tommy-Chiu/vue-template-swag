const path = require('path')
const loaderUtils = require('loader-utils')
const markdownCompilerPath = path.resolve(__dirname, 'markdown-compiler.js')

module.exports = function(source) {
  this.cacheable()

  const options = loaderUtils.getOptions(this) || {}
  Object.defineProperty(this._compilation, '__vueMarkdownOptions__', {
    value: options,
    enumerable: false,
    configurable: true
  })

  const filePath = this.resourcePath

  const result =
    'module.exports = require(' +
    loaderUtils.stringifyRequest(
      this,
      '!!vue-loader!' +
      markdownCompilerPath +
      '?raw!' +
      filePath +
      (this.resourceQuery || '')
    ) +
    ');'

  return result
}
