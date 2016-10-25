define(['exports', 'bases/mixins/compMixin', 'vue'], function (exports, _compMixin, _vue) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compMixin2 = _interopRequireDefault(_compMixin);

    var _vue2 = _interopRequireDefault(_vue);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DocProp = _vue2.default.extend({
        data: function data() {
            return {};
        },

        props: {
            name: {
                type: String,
                required: true
            },

            type: {
                type: String
            },

            default: {
                type: String
            },

            args: {
                type: String
            },

            desc: {
                type: String
            }
        },

        ready: function ready() {}
    });

    exports.default = DocProp;
});