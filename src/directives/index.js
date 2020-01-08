const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let directive = files(key).default
  let directiveName = key.split('/')[1]
  directive.install = (Vue) => {
    Vue.directive(directiveName, directive)
  }
  exports[directiveName] = directive
})
