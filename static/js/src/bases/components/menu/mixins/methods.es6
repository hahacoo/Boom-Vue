import $ from 'jquery'

export default {
	
	methods: {

		/**
		 * 菜单数据格式化
		 * @return {[type]} [description]
		 */
		parseData: function() {

			let routerApp = this.globalApp,//获取路由app
				config = this.$getConfig(),
				menus = [];//获取配置信息

			let complete = this.complete;

			menus = config.apps;

			formatMenu(menus, -1)

			if(!complete) {
				var tmp = menus.filter(function(menu) {
					return menu.id == routerApp
				})[0];//获取当前app

				this.appName = tmp.name;
				menus = tmp.children;
			}

			this.children = menus

			function formatMenu(menus, deep, parent) {
				let len = menus.length;
				deep++;
				for(var i=0; i<len; i++) {
					let menuObj = {
						id: '',
						name: '',
						path: '',
						checked: false,
						enabled: true,
						mountable: true,
						parent: parent,
						deep: deep,
						children: []
					};
					menus[i] = $.extend(true, menuObj, menus[i])
					if(!menus[i].id) {
						throw Error(menus[i].name + '尚未指定菜单id')
					}
					// if(complete && deep == 0) {
					// 	menus[i].path = '';
					// } else {
					// 	menus[i].path = menus[i].parent ? (menus[i].parent.path ?  menus[i].parent.path + '/' + menus[i].id : menus[i].id) : menus[i].id;
					// }

					menus[i].path = menus[i].parent ? menus[i].parent.path + '/' + menus[i].id : menus[i].id;
					if(menus[i].enabled && menus[i].mountable) {
						if(menus[i].children.length > 0) {
							formatMenu(menus[i].children, deep, menus[i])
						}
					}
				}
			}
		},

		/**
		 * 菜单初始化
		 * @return {[type]}      [description]
		 */
		menuInit: function() {
			var self = this,
				paths = this.globalPath.split('/').slice(1),
				deepth = paths.length;

			//判断是否命中菜单
			var shooted = false;

			this.$nextTick(function() {
				//获取子菜单
				let menus = this.$children;

				this.paths = [];

				shootMenu(paths, menus, deepth, 0);

				if(!shooted) {
					//未命中菜单，返回404
					this.$dispatch('page.notFound')
				}
			})
			
			/**
			 * 菜单命中
			 * 要求路径的层级与菜单保持一致
			 * @param  {[type]} path   请求路径
			 * @param  {[type]} menus  子菜单
			 * @param  {[type]} deepth 路径深度
			 * @param  {[type]} level  级别
			 * @return {[type]}        [description]
			 */
			function shootMenu(path, menus, deepth, level) {
				var children = menus,
					len = children.length,
					i = level,
					j = 0;

				for(; j < len; j++) {
					var child = children[j];

					if(child.model.id === path[i]) {
						//更新访问路径
						self.paths.push(child.model.name);
						//层级+1
						i++;
						if(i == deepth) {
							//命中目标
							child.model.checked = true;
							shooted = true;
						} else {
							//命中上一级目标
							child.fold = false;
							shootMenu(path, child.$children, deepth, i)
						}
						//break;
					} else {
						child.fold = true;
						child.model.checked = false;
						//清除选中状态
						removeState(child)
					}
				}
			}

			/**
			 * 清除选中状态
			 * @param  {[type]} parentNode 父级菜单
			 * @return {[type]}            [description]
			 */
			function removeState(parentNode) {
				var children = parentNode.$children,
					len = children.length,
					i = 0;
				for(;i < len; i++) {
					var child = children[i];
					child.fold = true;
					child.model.checked = false;
					if(child.$children.length > 0) {
						removeState(child)
					}
				}
			}

		}
	}
}