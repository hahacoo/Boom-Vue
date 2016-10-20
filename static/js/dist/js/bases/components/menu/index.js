define(['exports', 'text!./view.html', './menuItem/index', './mixins/methods', 'bases/mixins/compMixin', 'jquery'], function (exports, _view, _index, _methods, _compMixin, _jquery) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var _index2 = _interopRequireDefault(_index);

	var _methods2 = _interopRequireDefault(_methods);

	var _compMixin2 = _interopRequireDefault(_compMixin);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = {

		data: function data() {
			return {
				children: [],

				//访问路径
				path: "",

				//
				paths: [],

				//菜单收缩
				minMenu: false,

				appName: ''
			};
		},

		props: {

			//菜单展开方向
			direction: {
				default: 'veritcal',
				coerce: function coerce(val) {
					if (val === 'horizontal') return val;
					return 'veritcal';
				}
			},

			//菜单排列方向，只有在direction是horizontal的情况下起效
			rgt: {
				default: false,
				type: Boolean
			},

			//是否为全菜单
			complete: {
				default: false,
				type: Boolean
			},

			//是否对地址进行映射
			mappingPath: {
				default: true,
				type: Boolean
			}

		},

		template: _view2.default,

		watch: {
			globalApp: function globalApp() {
				this.parseData();
			},

			globalPath: function globalPath() {

				if (this.mappingPath) {
					this.menuInit();
				}
			},

			globalComp: function globalComp() {}

		},

		mixins: [_compMixin2.default, _methods2.default],

		components: {
			menuItem: _index2.default
		},

		methods: {
			toggle: function toggle() {
				this.minMenu = !this.minMenu;
				this.inited = false;
				if (!this.minMenu) {
					this.$nextTick(function () {
						this.menuInit(this.path);
					});
				}
			},
			mouseover: function mouseover() {
				//this.$broadcast('menu.fold.all')
			}
		},

		created: function created() {

			//转换菜单数据
			this.parseData();

			//监听菜单点击
			this.$on('menu.click', function (id, path, changeState) {
				this.$broadcast('menu.change', id, path, changeState);
			});
		},

		ready: function ready() {

			//命中菜单
			if (this.mappingPath) {
				this.menuInit();
			}
		}
	};
});