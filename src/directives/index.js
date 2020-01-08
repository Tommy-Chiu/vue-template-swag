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

const pageDirectiveFiles = require.context('../pages', true, /index\.js$/)
pageDirectiveFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'directive') {
    exports[`pageDirective${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = pageDirectiveFiles(key).default
  }
})

const moduleDirectiveFiles = require.context('../modules', true, /index\.js$/)
moduleDirectiveFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'directive') {
    exports[`moduleDirective${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = moduleDirectiveFiles(key).default
  }
})
