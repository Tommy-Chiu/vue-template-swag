const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let directiveName = req.body.name
  let dirPath = path.resolve(__dirname, directiveName)

  fs.mkdirSync(dirPath) // mkdir
  process.chdir(dirPath) // cd dir

  fs.writeFileSync(`index.js`, getFileTemplateByType('directiveIndexJs'))
  fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))

  next()
}
