define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
  * 全局过滤器配置
  * by zhangdi
  */
	var filters = {

		install: function install(Vue) {

			//访问路径配置
			Vue.filter('pathFilter', function (value) {
				var config = Vue.prototype.$getConfig(),
				    apps = config.apps,
				    len = apps.length;
				var result = '';
				var paths = value.split('/').slice('1');

				function getName(array, path) {
					var result = '',
					    id = path.shift(),
					    len = array.length;
					if (typeof id !== 'undefined') {
						for (var i = 0; i < len; i++) {
							if (array[i].id == id) {
								result = array[i].name;
								if (Object.prototype.toString.call(array[i].children) === '[object Array]') {
									result += '>' + getName(array[i].children, path);
								}
								break;
							}
						}
					}
					return result;
				}

				return getName(apps, paths);
			});
		}
	};

	exports.default = filters;
});