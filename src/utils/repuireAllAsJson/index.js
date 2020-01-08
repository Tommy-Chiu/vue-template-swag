export default (files) => {
  let moduleJson = {}
  files.keys().forEach(function (key, index, array) {
    if (key === './index.js') return
    let temp = moduleJson
    let module = files(key).default
    let modulePathArr = key.substring(2).split('/')
    modulePathArr.forEach((k, i, arr) => {
      if (i < arr.length - 1) {
        if (!temp[k]) {
          temp[k] = {}
        }
        temp = temp[k]
      } else {
        temp[k.split('.')[0]] = module
      }
    })
  })
  return moduleJson
}
