const files = require.context('./svgs', true, /\.svg$/)
files.keys().map(function (key, i, arr) {
  files(key)
})
