define(['exports', 'core/router/store/actions', 'core/router/store/getters'], function (exports, _actions, _getters) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var actions = _interopRequireWildcard(_actions);

	var getters = _interopRequireWildcard(_getters);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

	exports.default = {
		vuex: {
			getters: getters,
			actions: actions
		}
	};
});