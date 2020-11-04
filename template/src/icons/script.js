const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let basePath = path.resolve(__dirname)
  Object.keys(req.files).forEach(function (name) {
    if (req.files[name] && req.files[name] && req.files[name].originalFilename) {
      fs.renameSync(req.files[name].path, `${basePath}/svgs/${req.files[name].originalFilename}`)
    }
  })
  next()
}
