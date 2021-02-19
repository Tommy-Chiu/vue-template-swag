const fs = require('fs')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let directiveName = req.body.name

  process.chdir(__dirname) // cd dir
  fs.mkdirSync(`./${directiveName}`) // mkdir
  process.chdir(`./${directiveName}`) // cd dir

  fs.writeFileSync(`./index.js`, getFileTemplateByType('directiveJs'))
  fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))

  next()
}
