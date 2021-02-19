const fs = require('fs')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let mixinName = req.body.name

  process.chdir(__dirname) // cd dir
  fs.mkdirSync(`./${mixinName}`) // mkdir
  process.chdir(`./${mixinName}`) // cd dir

  fs.writeFileSync(`./index.vue`, getFileTemplateByType('componentVue', mixinName))
  fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))

  next()
}
