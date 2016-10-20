import template from 'text!./view.html'
import * as actions from 'core/router/store/actions';
import * as getters from 'core/router/store/getters';
import $ from 'jquery'

export default {

	name: 'menu-item',

	data: function() {
		return {
			fold: true,
			dropHeight: 0,
			dropWidth: 0
		}
	},

	props: ['model', 'direction'],

	vuex: {
		getters,
		actions 
	},

	template,

	watch: {
		fold: function(val) {
			let model = this.model,
				children = model.children,
				len = children.length;
			if(this.direction == 'veritcal') {
				if(val) {
					this.dropHeight = 0;
				} else {
					this.dropHeight = len * 50;
				}
			} else {
				if(val) {
					this.dropWidth = 0;
				} else {
					this.dropWidth = 300;
				}
			}

			
		}
	},

	computed: {
		paddingLeft: function() {
			var deep = this.model.deep;
			if(this.direction == 'veritcal' && deep > 1) return deep * 25;
		},

		iconClass: function(){
			if(this.direction == 'veritcal') return this.model.icon||"fa-cogs"
		},

		directClass: function() {
			if(this.direction == 'veritcal') return 'fa-angle-left'
			return 'fa-angle-right'

		}
	},

	filters: {
		path: function(val) {
			return this.globalApp + '/' + val
		}
	},

	methods: {

		/**
		 * 点击操作
		 * @return {[type]} [description]
		 */
		operate: function() {
			let model = this.model,
				children = model.children,
				len = children.length;

			this.model.checked = true;
			
			if(children && len > 0) {
				
				//展开操作
				this.fold = !this.fold;
				
				//触发点击消息
				this.$dispatch('menu.click', model.id, model.path, true);
				this.$dispatch('menu.fold', this.fold ? -len : len);
			} else {
				
				//地址变化
				//this.$router('/' + this.globalApp + '/' + model.path)
				this.$router('/' + model.path)
				this.$dispatch('menu.click', model.id, model.path, false);
				
				//当菜单为水平布局时，方便监听事件
				if(this.direction == 'horizontal') {
					this.$dispatch('menu.redirect')
				}
			}
		},

		mouseOver: function() {
			let model = this.model,
				children = model.children,
				len = children.length;

			this.model.checked = true;
			//展开操作
			this.fold = false;
			
			//触发点击消息
			this.$dispatch('menu.click', model.id, model.path, true);
			this.$dispatch('menu.fold', this.fold ? -len : len);
		},

		mouseOut: function() {
			let model = this.model,
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

	created: function() {

		//监听菜单变化，改变自身状态
		this.$on('menu.change', function(id, path, changeState) {
			let model = this.model,
				modelId = model.id,
				children = model.children,
				len = children.length;

			let paths = path.split('/');
				
			if(modelId != id) {
			
				if(path === '' || $.inArray(modelId, paths) == -1) {
					
					//点击app切换
					this.fold = true
				}

			}

			if(this.model.id != this.globalComp) {
				this.model.checked = false	
			}

			if(changeState) {
				this.$dispatch('menu.fold', this.fold ? -len : len)
			}

			return true;
		})

		//监听菜单折叠展开变化
		this.$on('menu.fold', function(len) {
			if(this.direction == 'veritcal') {
				this.dropHeight += len * 50
				return true;
			}
		})

		this.$on('menu.fold.all', function(len) {
			if(this.direction == 'horizontal') {
				console.log('xxxx')
				this.fold = true
				return true;
			}
		})
	},

	ready: function() {
		let model = this.model,
			item = this.$els.menuItem,
			direction = this.direction;

		if(direction == 'veritcal' || model.children.length == 0) {
			$(item).click(function() {
				this.operate()
			}.bind(this))
		} else {
			$(item).mouseenter(function() {
				this.mouseOver()
				$(item).siblings('ul').show()
			}.bind(this));
			$(item).mouseleave(function() {
				this.mouseOut()
			}.bind(this));
		}

		function addEvent(item, event, cb) {
			if(window.addEventListener) {
				item.addEventListener(event, cb, true)
			} else if(window.attachEvent) {
				item.setCapture();
				item.attachEvent('on'+event, cb);
			} else {
				item['on' + event] = cb
			}
		}
	}

}