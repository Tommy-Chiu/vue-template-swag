module.exports = {
  'GET /testGet': (req, res, next) => {
    res.json({ reQuery: req.query })
    next()
  },
  'POST /testPost': (req, res, next) => {
    res.json({ reqBody: req.body })
    next()
  }
}
