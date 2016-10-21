define(['exports', './section/index', './highlight/index'], function (exports, _index, _index3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _index2 = _interopRequireDefault(_index);

    var _index4 = _interopRequireDefault(_index3);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        install: function install(Vue, option) {

            Vue.component('doc-section', _index2.default);
            Vue.component('doc-highlight', _index4.default);
        }
    };
});