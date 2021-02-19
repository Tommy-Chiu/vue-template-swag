const fs = require('fs')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let componentName = req.body.name

  process.chdir(__dirname) // cd dir
  fs.mkdirSync(`./${componentName}`) // mkdir
  process.chdir(`./${componentName}`) // cd dir

  fs.writeFileSync(`./index.vue`, getFileTemplateByType('componentVue', componentName))
  fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))

  next()
}
