const fs = require('fs')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let utilName = req.body.name

  process.chdir(__dirname) // cd dir
  fs.mkdirSync(`./${utilName}`) // mkdir
  process.chdir(`./${utilName}`) // cd dir

  fs.writeFileSync(`./index.js`, getFileTemplateByType('utilJs'))
  fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))

  next()
}
