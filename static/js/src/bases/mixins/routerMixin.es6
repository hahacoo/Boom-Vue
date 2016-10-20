import router from 'core/router/index';
import store from 'core/vuex/store/index';
import * as actions from 'core/router/store/actions';
import * as getters from 'core/router/store/getters';
import Vue from 'vue'

export default {
	store,
	vuex: {
		getters,
		actions 
	},
	created: function() {

		//获取配置项
		let config = this.$getConfig(),
			baseUrl = config.baseUrl,
			errorUrl = config.errorUrl;
		
		this.apps = config.apps;

		//加载路由插件
		Vue.use(router, {
			baseUrl: baseUrl,
			errorUrl: errorUrl
		})
	},

	ready: function() {
		this.$router().authority('/static/data/permissions.json').then(() => {
			//开启路由
			this.$router().start()
		})
	}
}