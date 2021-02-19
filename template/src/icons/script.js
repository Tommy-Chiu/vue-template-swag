const fs = require('fs')

module.exports = (req, res, next) => {
  Object.keys(req.files).forEach(function (name) {
    if (req.files[name] && req.files[name] && req.files[name].originalFilename) {
      fs.renameSync(req.files[name].path, `${__dirname}/svgs/${req.files[name].originalFilename}`)
    }
  })
  next()
}
