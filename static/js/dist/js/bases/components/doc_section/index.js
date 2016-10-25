define(['exports', './section/index', './highlight/index', './api/index', './api/api_prop/index'], function (exports, _index, _index3, _index5, _index7) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _index2 = _interopRequireDefault(_index);

    var _index4 = _interopRequireDefault(_index3);

    var _index6 = _interopRequireDefault(_index5);

    var _index8 = _interopRequireDefault(_index7);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        install: function install(Vue, option) {

            Vue.component('doc-section', _index2.default);
            Vue.component('doc-highlight', _index4.default);
            Vue.component('doc-api', _index6.default);
            Vue.component('doc-prop', _index8.default);
        }
    };
});