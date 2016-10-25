define(['exports', 'text!./view.html', 'text!./partial_prop.html', 'text!./partial_event.html', 'bases/mixins/compMixin', './api_prop/index'], function (exports, _view, _partial_prop, _partial_event, _compMixin, _index) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _partial_prop2 = _interopRequireDefault(_partial_prop);

    var _partial_event2 = _interopRequireDefault(_partial_event);

    var _compMixin2 = _interopRequireDefault(_compMixin);

    var _index2 = _interopRequireDefault(_index);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {
                props: []
            };
        },

        props: {
            type: {
                default: 'prop'
            }
        },

        template: _view2.default,

        partials: {
            propPartial: _partial_prop2.default,
            eventPartial: _partial_event2.default
        },

        mixins: [_compMixin2.default],

        ready: function ready() {
            var _this = this;

            this.$children.forEach(function (prop) {
                if (prop instanceof _index2.default) {
                    var tmp = {};
                    tmp.name = prop.name;
                    tmp.type = prop.type;
                    tmp.default = prop.default;
                    tmp.desc = prop.desc;
                    tmp.args = prop.args;

                    _this.props.push(tmp);
                }
            });
        }
    };
});