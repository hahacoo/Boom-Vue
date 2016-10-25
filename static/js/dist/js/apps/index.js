define(['exports', 'text!./view.html', 'bases/mixins/routerMixin', 'bases/components/menu/index', 'bases/components/header/index', 'bases/filters/index', 'vue', 'module/sti-vue', 'dist/js/config/index'], function (exports, _view, _routerMixin, _index, _index3, _index5, _vue, _stiVue) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var _routerMixin2 = _interopRequireDefault(_routerMixin);

	var _index2 = _interopRequireDefault(_index);

	var _index4 = _interopRequireDefault(_index3);

	var _index6 = _interopRequireDefault(_index5);

	var _vue2 = _interopRequireDefault(_vue);

	var _stiVue2 = _interopRequireDefault(_stiVue);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * App根组件
  * 功能：负责主视图切换、错误页面处理
  */
	var app = new _vue2.default({

		el: 'body',

		data: {
			demoId: ''
		},

		template: _view2.default,

		replace: false,

		mixins: [_routerMixin2.default],

		computed: {
			isApp: function isApp() {
				return this.globalApp && this.globalApp != 'error' && this.globalApp != 'home';
			},

			isHome: function isHome() {
				return this.globalApp == 'home';
			},

			isError: function isError() {
				return this.globalApp == 'error';
			}
		},

		components: {
			appHeader: _index4.default,
			menu: _index2.default,
			home: function home(resolve) {
				require(['dist/js/core/home/index'], function (component) {
					resolve(component.default);
				});
			},
			error: function error(resolve) {
				require(['dist/js/core/error/index'], function (component) {
					resolve(component.default);
				});
			},
			scrollspy: _stiVue2.default.scrollspy
		},

		created: function created() {
			var config = this.$getConfig(),
			    self = this;

			/**
    * 事件中转
    * @param  {[type]} name  消息名称
    * @param  {[type]} data) 传递数据
    * @return {[type]}       [description]
    */
			this.$on(config.eventName, function (name, data) {
				this.$broadcast(name, data);
			});

			this.$on('aside.toggle', function () {
				this.showSide = !this.showSide;
			});

			//监听菜单的点击
			this.$on('menu.redirect', function () {
				this.showSide = false;
			});

			// 监听鼠标离开aside事件，离开时收起aside
			this.$on('aside.mouseleave', function () {
				this.showSide = false;
			});

			_vue2.default.use(_index6.default);
		}
	});

	exports.default = app;
});