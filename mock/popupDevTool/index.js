const path = require('path')

module.exports = {
  'POST /runScript': (req, res, next) => {
    let { scriptPath } = req.body
    require(path.join('../../', scriptPath, '/script.js'))(req, res, next)
  }
}
