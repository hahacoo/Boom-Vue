/**
 * 全局过滤器配置
 * by zhangdi
 */
let filters = {

	install: function(Vue) {

		//访问路径配置
		Vue.filter('pathFilter', function (value) {
			let config = Vue.prototype.$getConfig(),
				apps = config.apps,
				len = apps.length;
			let result = '';
			let paths = value.split('/').slice('1');

			function getName(array, path) {
				let result = '',
					id = path.shift(),
					len = array.length;
				if(typeof id !== 'undefined') {
					for(var i=0; i<len; i++) {
						if(array[i].id == id) {
							result = array[i].name;
							if(Object.prototype.toString.call(array[i].children) === '[object Array]') {
								result += '>' + getName(array[i].children, path)
							}
							break; 
						}
					}
				}
				return result
			}

		  	return getName(apps, paths)
		})
	}
}

export default filters