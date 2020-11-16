let fs = require('fs')
let packageJson = require('./package.json')
packageJson['name'] = "{{ name }}"
packageJson['description'] = "{{ description }}"
packageJson['author'] = "{{ author }}"
packageJson['scripts'] = {
	"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
	"start": "npm run dev",
	"unit": "jest --config test/unit/jest.conf.js --coverage",
	"e2e": "node test/e2e/runner.js",
	"test": "npm run unit && npm run e2e",
	"lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
	"build": "node build/build.js"
}
fs.writeFile('./template/package.json', `${JSON.stringify(packageJson, null, 2)}\n`, function(err) {
	if (err) {
		console.error(err)
	}
})
