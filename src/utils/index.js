const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let util = files(key).default
  let utilName = key.split('/')[1]
  exports[utilName] = util
})

const pageUtilFiles = require.context('../pages', true, /index\.js$/)
pageUtilFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'util') {
    exports[`pageUtil${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = pageUtilFiles(key).default
  }
})

const moduleUtilFiles = require.context('../modules', true, /index\.js$/)
moduleUtilFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'util') {
    exports[`moduleUtil${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = moduleUtilFiles(key).default
  }
})
