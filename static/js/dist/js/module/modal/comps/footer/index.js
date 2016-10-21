define(['exports', 'text!./view.html', 'css!./style.css'], function (exports, _view) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        template: _view2.default,

        data: function data() {
            return {};
        },

        props: ['closeContent', 'saveContent']
    };
});