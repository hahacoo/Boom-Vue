import * as actions from 'core/router/store/actions';
import * as getters from 'core/router/store/getters';
import viewBak from 'core/router/viewBak';

export default {
	data: function() {
		return {
			defaultView: ''
		};
	},

	computed: {
		view: function() {

			//返回默认视图
			if(this.globalComp == this.globalApp) {
				let view = this.defaultView;
				//重定向到默认首页
				this.$router().redirect(this.$getConfig().baseUrl + '/' + this.globalApp + '/' + view)
				return ''
				//this.updateComp(this.defaultView);
				
				//return view;

			}
			return this.globalComp;
		}
	},		

	vuex: {
		getters,
		actions 
	},

	components: {
	
		//刷新视图
		viewBak
	}
};