const files = require.context('./', true, /index\.vue$/)
files.keys().forEach(key => {
  let component = files(key).default
  let componentName = key.split('/')[1]
  component.name = componentName
  component.install = (Vue) => {
    Vue.component(componentName, component)
  }
  exports[componentName] = component
})

const pageComponentFiles = require.context('../pages', true, /index\.js$/)
pageComponentFiles.keys().forEach(key => {
  let arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (arr[1] === 'component') {
    exports[`pageComponent${arr[0].charAt(0).toUpperCase() + arr[0].slice(1)}`] = pageComponentFiles(key).default
  }
})
