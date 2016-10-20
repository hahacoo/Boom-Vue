/**
 * 菜单组件
 * by zhangdi
 * 支持垂直排列、纵向排列（左对齐和右对齐）
 */
import template from 'text!./view.html';
import menuItem from './menuItem/index';
import methodMixin from './mixins/methods';
import compMixin from 'bases/mixins/compMixin';
import $ from 'jquery'

export default {

	data: function() {
		return {
			children: [],
			
			//访问路径
			path: "",
			
			//
			paths: [],
			
			//菜单收缩
			minMenu: false,

			appName: '',
		}
	},

	props: {
		
		//菜单展开方向
		direction: {
			default: 'veritcal',
			coerce: function (val) {
				if(val === 'horizontal') return val;
				return 'veritcal'
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

	template,

	watch: {
		globalApp: function() {
			this.parseData();
		},

		globalPath: function() {
			
			if(this.mappingPath) {
				this.menuInit();
			}
		},

		globalComp: function() {
		}

	},

	mixins: [compMixin, methodMixin],

	components: {
		menuItem
	},

	methods: {
		toggle: function toggle() {
			this.minMenu = !this.minMenu;
			this.inited = false;
			if(!this.minMenu) {
				this.$nextTick(function() {
					this.menuInit(this.path);
				})
			}
		},
		mouseover: function() {
			//this.$broadcast('menu.fold.all')
		}
	},

	created: function() {
		
		//转换菜单数据
		this.parseData();
		
		//监听菜单点击
		this.$on('menu.click', function(id, path, changeState) {
			this.$broadcast('menu.change', id, path, changeState)
		})
	},

	ready: function() {
		
		//命中菜单
		if(this.mappingPath) {
			this.menuInit();
		}
	}
}
