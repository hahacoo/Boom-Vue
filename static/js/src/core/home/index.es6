import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';

export default {
	
	data: function() {
		return {
			defaultView: '',
		}
	},

	template,

	mixins: [appMixin],

	created: function(){

	}

}
