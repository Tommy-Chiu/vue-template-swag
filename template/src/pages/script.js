const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let { targetPath, childType, name } = req.body
  let dirPath
  dirPath = path.resolve(__dirname, ...targetPath.replace('/src/pages', '').split('/'))
  process.chdir(dirPath) // cd dir

  if (childType) {
    try {
      fs.accessSync(`./${childType}`, fs.constants.F_OK)
    } catch (err) {
      fs.mkdirSync(`./${childType}`) // mkdir
      switch (childType) {
        case 'components':
        case 'mixins':
          fs.writeFileSync(`./${childType}/index.js`, getFileTemplateByType('exportCMJs'))
          break
        case 'directives':
        case 'filters':
        case 'utils':
          fs.writeFileSync(`./${childType}/index.js`, getFileTemplateByType('exportDFUJs'))
          break
        case 'children':
          break
      }
    }
    dirPath = path.resolve(dirPath, childType)
    process.chdir(dirPath) // cd dir
  }

  switch (childType) {
    case 'components':
    case 'mixins':
      fs.writeFileSync(`./${name}.vue`, getFileTemplateByType('componentVue', name))
      break
    case 'directives':
      fs.writeFileSync(`./${name}.js`, getFileTemplateByType('directiveJs'))
      break
    case 'filters':
      fs.writeFileSync(`./${name}.js`, getFileTemplateByType('filterJs'))
      break
    case 'utils':
      fs.writeFileSync(`./${name}.js`, getFileTemplateByType('utilJs'))
      break
    case 'children':
    case undefined:
      dirPath = path.resolve(dirPath, name)
      fs.mkdirSync(dirPath) // mkdir
      process.chdir(dirPath) // cd dir
      fs.writeFileSync('./index.vue', getFileTemplateByType('componentVue', name))
      fs.writeFileSync('./doc.md', getFileTemplateByType('docMd'))
      fs.mkdirSync('./requests') // mkdir
      fs.writeFileSync('./requests/url.js', getFileTemplateByType('requestsUrlJs'))
      fs.writeFileSync('./requests/index.js', getFileTemplateByType('requestsIndexJs'))
      fs.mkdirSync('./store') // mkdir
      fs.writeFileSync('./store/index.js', getFileTemplateByType('storeIndexJs'))

      fs.mkdirSync('./route') // mkdir
      fs.writeFileSync('./route/index.js', getFileTemplateByType('routeIndexJs', name))
      break
  }

  next()
}
