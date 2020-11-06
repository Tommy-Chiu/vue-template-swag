const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let utilName = req.body.name
  let dirPath = path.resolve(__dirname, utilName)

  fs.mkdirSync(dirPath) // mkdir
  process.chdir(dirPath) // cd dir

  fs.writeFileSync(`index.js`, getFileTemplateByType('utilIndexJs'))
  fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))

  next()
}
