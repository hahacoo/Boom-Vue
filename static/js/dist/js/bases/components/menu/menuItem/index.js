define(['exports', 'text!./view.html', 'core/router/store/actions', 'core/router/store/getters', 'jquery'], function (exports, _view, _actions, _getters, _jquery) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var actions = _interopRequireWildcard(_actions);

	var getters = _interopRequireWildcard(_getters);

	var _jquery2 = _interopRequireDefault(_jquery);

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

		name: 'menu-item',

		data: function data() {
			return {
				fold: true,
				dropHeight: 0,
				dropWidth: 0
			};
		},

		props: ['model', 'direction'],

		vuex: {
			getters: getters,
			actions: actions
		},

		template: _view2.default,

		watch: {
			fold: function fold(val) {
				var model = this.model,
				    children = model.children,
				    len = children.length;
				if (this.direction == 'veritcal') {
					if (val) {
						this.dropHeight = 0;
					} else {
						this.dropHeight = len * 50;
					}
				} else {
					if (val) {
						this.dropWidth = 0;
					} else {
						this.dropWidth = 300;
					}
				}
			}
		},

		computed: {
			paddingLeft: function paddingLeft() {
				var deep = this.model.deep;
				if (this.direction == 'veritcal' && deep > 1) return deep * 25;
			},

			iconClass: function iconClass() {
				if (this.direction == 'veritcal') return this.model.icon || "fa-cogs";
			},

			directClass: function directClass() {
				if (this.direction == 'veritcal') return 'fa-angle-left';
				return 'fa-angle-right';
			}
		},

		filters: {
			path: function path(val) {
				return this.globalApp + '/' + val;
			}
		},

		methods: {

			/**
    * 点击操作
    * @return {[type]} [description]
    */
			operate: function operate() {
				var model = this.model,
				    children = model.children,
				    len = children.length;

				this.model.checked = true;

				if (children && len > 0) {

					//展开操作
					this.fold = !this.fold;

					//触发点击消息
					this.$dispatch('menu.click', model.id, model.path, true);
					this.$dispatch('menu.fold', this.fold ? -len : len);
				} else {

					//地址变化
					//this.$router('/' + this.globalApp + '/' + model.path)
					this.$router('/' + model.path);
					this.$dispatch('menu.click', model.id, model.path, false);

					//当菜单为水平布局时，方便监听事件
					if (this.direction == 'horizontal') {
						this.$dispatch('menu.redirect');
					}
				}
			},

			mouseOver: function mouseOver() {
				var model = this.model,
				    children = model.children,
				    len = children.length;

				this.model.checked = true;
				//展开操作
				this.fold = false;

				//触发点击消息
				this.$dispatch('menu.click', model.id, model.path, true);
				this.$dispatch('menu.fold', this.fold ? -len : len);
			},

			mouseOut: function mouseOut() {
				var model = this.model,
				    children = model.children,
				    len = children.length;

				this.model.checked = false;
				//展开操作
				// this.fold = true;

				//触发点击消息
				// this.$dispatch('menu.click', model.id, model.path, true);
				// this.$dispatch('menu.fold', this.fold ? -len : len);
			}

		},

		created: function created() {

			//监听菜单变化，改变自身状态
			this.$on('menu.change', function (id, path, changeState) {
				var model = this.model,
				    modelId = model.id,
				    children = model.children,
				    len = children.length;

				var paths = path.split('/');

				if (modelId != id) {

					if (path === '' || _jquery2.default.inArray(modelId, paths) == -1) {

						//点击app切换
						this.fold = true;
					}
				}

				if (this.model.id != this.globalComp) {
					this.model.checked = false;
				}

				if (changeState) {
					this.$dispatch('menu.fold', this.fold ? -len : len);
				}

				return true;
			});

			//监听菜单折叠展开变化
			this.$on('menu.fold', function (len) {
				if (this.direction == 'veritcal') {
					this.dropHeight += len * 50;
					return true;
				}
			});

			this.$on('menu.fold.all', function (len) {
				if (this.direction == 'horizontal') {
					console.log('xxxx');
					this.fold = true;
					return true;
				}
			});
		},

		ready: function ready() {
			var model = this.model,
			    item = this.$els.menuItem,
			    direction = this.direction;

			if (direction == 'veritcal' || model.children.length == 0) {
				(0, _jquery2.default)(item).click(function () {
					this.operate();
				}.bind(this));
			} else {
				(0, _jquery2.default)(item).mouseenter(function () {
					this.mouseOver();
					(0, _jquery2.default)(item).siblings('ul').show();
				}.bind(this));
				(0, _jquery2.default)(item).mouseleave(function () {
					this.mouseOut();
				}.bind(this));
			}

			function addEvent(item, event, cb) {
				if (window.addEventListener) {
					item.addEventListener(event, cb, true);
				} else if (window.attachEvent) {
					item.setCapture();
					item.attachEvent('on' + event, cb);
				} else {
					item['on' + event] = cb;
				}
			}
		}

	};
});