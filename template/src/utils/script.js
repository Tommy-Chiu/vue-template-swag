const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let utilName = req.body.name
  let utilTemp = `export default {} || function () {}
`
  let basePath = path.resolve(__dirname)
  fs.mkdirSync(`${basePath}/${utilName}`) // mkdir
  process.chdir(`${basePath}/${utilName}`) // cd dir
  fs.writeFileSync(`index.js`, utilTemp) // utilTemp
  next()
}
