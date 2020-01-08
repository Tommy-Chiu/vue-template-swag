const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let filter = files(key).default
  let filterName = key.split('/')[1]
  filter.install = (Vue) => {
    Vue.filter(filterName, filter)
  }
  exports[filterName] = filter
})
