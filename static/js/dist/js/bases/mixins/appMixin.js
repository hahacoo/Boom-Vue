define(['exports', 'core/router/store/actions', 'core/router/store/getters', 'core/router/viewBak'], function (exports, _actions, _getters, _viewBak) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var actions = _interopRequireWildcard(_actions);

	var getters = _interopRequireWildcard(_getters);

	var _viewBak2 = _interopRequireDefault(_viewBak);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	exports.default = {
		data: function data() {
			return {
				defaultView: ''
			};
		},

		computed: {
			view: function view() {

				//返回默认视图
				if (this.globalComp == this.globalApp) {
					var view = this.defaultView;
					//重定向到默认首页
					this.$router().redirect(this.$getConfig().baseUrl + '/' + this.globalApp + '/' + view);
					return '';
					//this.updateComp(this.defaultView);

					//return view;
				}
				return this.globalComp;
			}
		},

		vuex: {
			getters: getters,
			actions: actions
		},

		components: {

			//刷新视图
			viewBak: _viewBak2.default
		}
	};
});