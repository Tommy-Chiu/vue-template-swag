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
