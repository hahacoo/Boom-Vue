var fs = require('fs'),
	path = require('path'),
	yaml = require('js-yaml')

function load(filepath) {

	var config = {}

	try {
		config = yaml.safeLoad(fs.readFileSync(filepath || path.join(__dirname, '_config.yml'), 'utf8'))
	} catch (e) {
		console.log('初始化配置信息错误,请检查目录下的_config.yml是否正确');
		console.log(e);
	}

	return config
}

module.exports = load
