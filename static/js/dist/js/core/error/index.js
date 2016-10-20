define(['exports', 'text!./view.html', 'bases/mixins/appMixin'], function (exports, _view, _appMixin) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _view2 = _interopRequireDefault(_view);

	var _appMixin2 = _interopRequireDefault(_appMixin);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	exports.default = {

		data: function data() {
			return {
				defaultView: ''
			};
		},

		template: _view2.default,

		mixins: [_appMixin2.default]

	};
});