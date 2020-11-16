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
    fs.mkdirSync('./router') // mkdir
    fs.writeFileSync('./router/index.js', getFileTemplateByType('routerIndexJs', pageName))
    fs.mkdirSync('./http') // mkdir
    fs.writeFileSync('./http/api.js', getFileTemplateByType('httpApiJs'))
    fs.writeFileSync('./http/index.js', getFileTemplateByType('httpIndexJs'))
    fs.mkdirSync('./store') // mkdir
    fs.writeFileSync('./store/index.js', getFileTemplateByType('storeIndexJs'))
  } else {
    dirPath = path.resolve(__dirname, scriptPath.split('/')[ 3 ])
    process.chdir(dirPath) // cd dir
    fs.access(path.join(dirPath, subType), (err) => {
      if (err) {
        // console.error('no access')
        fs.mkdirSync(`./${subType}`) // mkdir
        if (subType === 'component' || subType === 'mixin') {
          fs.writeFileSync(`./${subType}/index.js`, getFileTemplateByType('exportCMJs'))
        } else if (subType === 'directive' || subType === 'filter' || subType === 'util') {
          fs.writeFileSync(`./${subType}/index.js`, getFileTemplateByType('exportDFUJs'))
        }
      }
      // console.log('access');
      if (subType === 'component' || subType === 'mixin') {
        fs.writeFileSync(`./${subType}/${name}.vue`, getFileTemplateByType('componentIndexVue', name))
      } else if (subType === 'directive') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('directiveIndexJs'))
      } else if (subType === 'filter') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('filterIndexJs'))
      } else if (subType === 'util') {
        fs.writeFileSync(`./${subType}/${name}.js`, getFileTemplateByType('utilIndexJs'))
      }
    })
  }

  next()
}
