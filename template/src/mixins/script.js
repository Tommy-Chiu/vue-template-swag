const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let mixinName = req.body.name
  let dirPath = path.resolve(__dirname, mixinName)

  fs.mkdirSync(dirPath) // mkdir
  process.chdir(dirPath) // cd dir

  fs.writeFileSync(`index.vue`, getFileTemplateByType('componentVue', mixinName))
  fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))

  next()
}
