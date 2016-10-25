define(['exports', 'text!./view.html', 'bases/mixins/appMixin', 'bases/components/doc_section/index', 'module/sti-vue', 'vue', 'css!./style.css'], function (exports, _view, _appMixin, _index, _stiVue, _vue) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _appMixin2 = _interopRequireDefault(_appMixin);

    var _index2 = _interopRequireDefault(_index);

    var _stiVue2 = _interopRequireDefault(_stiVue);

    var _vue2 = _interopRequireDefault(_vue);

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
            scrollspy: _stiVue2.default.scrollspy
        },

        created: function created() {

            //加载doc-section插件
            _vue2.default.use(_index2.default);

            this.$on('section.attach', function (id) {
                this.demos.push(id);
            });
        }
    };
});