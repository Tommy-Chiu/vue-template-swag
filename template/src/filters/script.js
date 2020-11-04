const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let filterName = req.body.name
  let filterTemp = `export default (value) => {
  return value
}
`
  let basePath = path.resolve(__dirname)
  fs.mkdirSync(`${basePath}/${filterName}`) // mkdir
  process.chdir(`${basePath}/${filterName}`) // cd dir
  fs.writeFileSync(`index.js`, filterTemp) // filterTemp
  next()
}
