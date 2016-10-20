define(['exports', 'text!./view.html', 'bases/mixins/appMixin', 'bases/components/doc_section/index', 'bases/components/pre_highlight/index', 'bases/components/scrollspy/index', 'css!./style.css'], function (exports, _view, _appMixin, _index, _index3, _index5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _appMixin2 = _interopRequireDefault(_appMixin);

    var _index2 = _interopRequireDefault(_index);

    var _index4 = _interopRequireDefault(_index3);

    var _index6 = _interopRequireDefault(_index5);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        data: function data() {
            return {
                defaultView: '',
                activeId: 'fat',
                demos: [],
                demoId: ''
            };
        },

        template: _view2.default,

        mixins: [_appMixin2.default],

        components: {
            docSection: _index2.default,
            preHighlight: _index4.default,
            scrollspy: _index6.default
        },

        created: function created() {
            this.$on('section.attach', function (id) {
                this.demos.push(id);
            });
        }
    };
});