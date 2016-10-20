import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';

export default {

	data: function() {
		return {
			defaultView: 'module/comp'
		}
	},

	template,

	mixins: [appMixin],

	created (){
	}
};
