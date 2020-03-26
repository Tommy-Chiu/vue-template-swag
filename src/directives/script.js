const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let directiveName = req.body.name
  let directiveTemp = `export default {
  bind (el, binding, vnode) {},
  inserted (el, binding, vnode) {},
  update (el, binding, vnode) {},
  componentUpdated (el, binding, vnode) {},
  unbind (el, binding, vnode) {}
}
`
  let basePath = path.resolve(__dirname)
  fs.mkdirSync(`${basePath}/${directiveName}`) // mkdir
  process.chdir(`${basePath}/${directiveName}`) // cd dir
  fs.writeFileSync(`index.js`, directiveTemp) // directiveTemp
  next()
}
