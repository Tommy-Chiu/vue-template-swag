const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let moduleName = req.body.name
  let dirPath = path.resolve(__dirname, moduleName)

  fs.mkdirSync(dirPath) // mkdir
  process.chdir(dirPath) // cd dir

  fs.writeFileSync('index.vue', getFileTemplateByType('componentIndexVue', moduleName))
  fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))
  fs.mkdirSync('./http') // mkdir
  fs.writeFileSync('./http/api.js', getFileTemplateByType('httpApiJs'))
  fs.writeFileSync('./http/index.js', getFileTemplateByType('httpIndexJs'))
  fs.mkdirSync('./store') // mkdir
  fs.writeFileSync('./store/index.js', getFileTemplateByType('storeIndexJs'))

  next()
}
