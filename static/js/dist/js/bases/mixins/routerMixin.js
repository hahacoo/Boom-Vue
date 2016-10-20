define(['exports', 'core/router/index', 'core/vuex/store/index', 'core/router/store/actions', 'core/router/store/getters', 'vue'], function (exports, _index, _index3, _actions, _getters, _vue) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _index2 = _interopRequireDefault(_index);

	var _index4 = _interopRequireDefault(_index3);

	var actions = _interopRequireWildcard(_actions);

	var getters = _interopRequireWildcard(_getters);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = {
		store: _index4.default,
		vuex: {
			getters: getters,
			actions: actions
		},
		created: function created() {

			//获取配置项
			var config = this.$getConfig(),
			    baseUrl = config.baseUrl,
			    errorUrl = config.errorUrl;

			this.apps = config.apps;

			//加载路由插件
			_vue2.default.use(_index2.default, {
				baseUrl: baseUrl,
				errorUrl: errorUrl
			});
		},

		ready: function ready() {
			var _this = this;

			this.$router().authority('/static/data/permissions.json').then(function () {
				//开启路由
				_this.$router().start();
			});
		}
	};
});