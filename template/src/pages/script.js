const fs = require('fs')
const path = require('path')
const getFileTemplateByType = require('../../devUtils/getFileTemplateByType')

module.exports = (req, res, next) => {
  let { scriptPath, name, subType } = req.body
  let dirPath
  if (!subType) {
    let pageName = name
    dirPath = path.resolve(__dirname, pageName)

    fs.mkdirSync(dirPath) // mkdir
    process.chdir(dirPath) // cd dir

    fs.writeFileSync('index.vue', getFileTemplateByType('componentIndexVue', pageName))
    fs.writeFileSync('doc.md', getFileTemplateByType('docMd'))
    fs.mkdirSync('./route') // mkdir
    fs.writeFileSync('./route/index.js', getFileTemplateByType('routeIndexJs', pageName))
    fs.mkdirSync('./requests') // mkdir
    fs.writeFileSync('./requests/url.js', getFileTemplateByType('requestsUrlJs'))
    fs.writeFileSync('./requests/index.js', getFileTemplateByType('requestsIndexJs'))
    fs.mkdirSync('./store') // mkdir
    fs.writeFileSync('./store/index.js', getFileTemplateByType('storeIndexJs'))
  } else {
    dirPath = path.resolve(__dirname, scriptPath.split('/')[ 3 ])
    process.chdir(dirPath) // cd dir
    fs.access(path.join(dirPath, subType), (err) => {
      if (err) {
        // console.error('no access')
        fs.mkdirSync(`./${subType}`) // mkdir
        if (subType === 'components' || subType === 'mixins') {
          fs.writeFileSync(`./${subType}/index.js`, getFileTemplateByType('exportCMJs'))
        } else if (subType === 'directives' || subType === 'filters' || subType === 'utils') {
          fs.writeFileSync(`./${subType}/index.js`, getFileTemplateByType('exportDFUJs'))
        }
      }
      // console.log('access');
      if (subType === 'components' || subType === 'mixins') {
        fs.writeFileSync(`./${subType}/${name}.vue`, getFileTemplateByType('componentIndexVue', name))
      } else if (subType === 'directives') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('directiveIndexJs'))
      } else if (subType === 'filters') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('filterIndexJs'))
      } else if (subType === 'utils') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('utilIndexJs'))
      }
    })
  }

  next()
}
