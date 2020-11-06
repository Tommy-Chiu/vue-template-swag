const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let componentName = req.body.name
  let dirPath = path.resolve(__dirname, componentName)

  fs.mkdirSync(dirPath) // mkdir
  process.chdir(dirPath) // cd dir

  fs.writeFileSync(`index.vue`, getFileTemplateByType('componentIndexVue', componentName))
  fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))

  next()
}
