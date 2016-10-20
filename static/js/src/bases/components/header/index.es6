/**
 * app-header
 * by zhangdi
 */
import template from 'text!./view.html'
import compMixin from 'bases/mixins/compMixin';

export default {
	data: function() {
		return {
			activeMenu: null 
		}
	},

	template,

	mixins: [compMixin],

	methods: {
		home: function() {
			this.$router().show('/')
		},
		more: function() {
			this.$dispatch('aside.toggle')
		},
		introduce: function() {
			this.$router().show('/introduce')
		},
		exhibition: function() {
			this.$router().show('/exhibition')
		}
	},

	created: function() {
		
	}
}
