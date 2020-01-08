const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let util = files(key).default
  let utilName = key.split('/')[1]
  exports[utilName] = util
})
