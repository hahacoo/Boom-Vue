define(['exports', 'text!./view.html', 'bases/mixins/compMixin'], function (exports, _view, _compMixin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _compMixin2 = _interopRequireDefault(_compMixin);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {};
        },

        props: {
            title: {
                type: String,
                required: true
            },

            subTitle: {
                type: String,
                required: true
            }
        },

        template: _view2.default,

        mixins: [_compMixin2.default],

        ready: function ready() {
            //创建完成之后，通知根节点

            this.$dispatch("section.attach", this.title);
        }
    };
});