/**
 * App根组件
 * 功能：负责主视图切换、错误页面处理
 */
import template from 'text!./view.html';
import routerMixin from 'bases/mixins/routerMixin';
import 'dist/js/config/index';

import scrollspy from 'bases/components/scrollspy/index';
import menu from 'bases/components/menu/index';
import appHeader from 'bases/components/header/index';
import filters from 'bases/filters/index';
import directives from 'bases/directives/highlight/index';

import Vue from 'vue';
import $ from 'jquery';

let app = new Vue({

	el:'body',

	data: {	
		demoId: ''
	},

	template,

	replace: false,

	mixins: [routerMixin],

	computed: {
		isApp: function() {
			return this.globalApp && this.globalApp != 'error' && this.globalApp != 'home'
		},

		isHome: function() {
			return this.globalApp == 'home'
		},

		isError: function() {
			return this.globalApp == 'error'
		}
	},

	components: {
		scrollspy,
		appHeader,
		menu,
		home: function(resolve) {
			require(['dist/js/core/home/index'], function(component) {
				resolve(component.default)
			})
		},
		error: function(resolve) {
			require(['dist/js/core/error/index'], function(component) {
				resolve(component.default)
			})
		}
	},

	created: function() {
		let config = this.$getConfig(),
			self = this;

		/**
		 * 事件中转
		 * @param  {[type]} name  消息名称
		 * @param  {[type]} data) 传递数据
		 * @return {[type]}       [description]
		 */
		this.$on(config.eventName, function(name, data) {
			this.$broadcast(name, data)
		})

		this.$on('aside.toggle', function() {
			this.showSide = !this.showSide;
		})

		//监听菜单的点击
		this.$on('menu.redirect', function() {
			this.showSide = false;
		})

		// 监听鼠标离开aside事件，离开时收起aside
		this.$on('aside.mouseleave', function() {
			this.showSide = false;
		})

		Vue.use(filters);

	}
});

export default app;
