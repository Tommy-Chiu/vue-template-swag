const files = require.context('./', true, /index\.vue$/)
files.keys().forEach(key => {
  let arr = key.split('/')
  if (arr.length > 3) {
    return
  }
  let module = files(key).default
  let moduleName = arr[1]
  module.name = moduleName
  exports[moduleName] = module
})
