const path = require('path')

module.exports = {
  'GET /testGet': (req, res, next) => {
    res.json({ reQuery: req.query })
    next()
  },
  'POST /testPost': (req, res, next) => {
    res.json({ reqBody: req.body })
    next()
  },
  'POST /runScript': (req, res, next) => {
    let { scriptPath } = req.body
    require(path.join('../../../../', scriptPath, '/script.js'))(req, res, next)
  }
}
