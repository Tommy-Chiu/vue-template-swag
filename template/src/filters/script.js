const fs = require('fs')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let filterName = req.body.name

  process.chdir(__dirname) // cd dir
  fs.mkdirSync(`./${filterName}`) // mkdir
  process.chdir(`./${filterName}`) // cd dir

  fs.writeFileSync(`./index.js`, getFileTemplateByType('filterJs'))
  fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))

  next()
}
