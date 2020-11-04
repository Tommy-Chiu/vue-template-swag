const files = require.context('./svgs', true, /\.svg$/)
let icons = []
files.keys().map(function (key, i, arr) {
  files(key)
  icons.push(key.split('/')[1].split('.')[0])
})
export default icons
