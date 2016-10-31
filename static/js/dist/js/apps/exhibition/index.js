define(['exports', 'text!./view.html', 'bases/mixins/appMixin', 'bases/components/doc_section/index', 'vue', 'jquery', 'module/sti-vue', 'text!doc/scrollspy/doc.html', 'text!doc/modal/doc.html', 'text!doc/alerts/doc.html', 'css!./style.css', 'highcharts'], function (exports, _view, _appMixin, _index, _vue, _jquery, _stiVue, _doc, _doc3, _doc5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _appMixin2 = _interopRequireDefault(_appMixin);

    var _index2 = _interopRequireDefault(_index);

    var _vue2 = _interopRequireDefault(_vue);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _stiVue2 = _interopRequireDefault(_stiVue);

    var _doc2 = _interopRequireDefault(_doc);

    var _doc4 = _interopRequireDefault(_doc3);

    var _doc6 = _interopRequireDefault(_doc5);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _StiVue$modal = _stiVue2.default.modal;
    var modal = _StiVue$modal.modal;
    var modalheader = _StiVue$modal.modalheader;
    var modalbody = _StiVue$modal.modalbody;
    var modalfooter = _StiVue$modal.modalfooter;
    exports.default = {

        data: function data() {
            return {
                defaultView: '',
                activeId: 'fat',
                demos: [],
                demoId: '',

                isModalShow: false
            };
        },

        template: _view2.default,

        mixins: [_appMixin2.default],

        partials: {
            scrollspyDoc: _doc2.default,
            modalDoc: _doc4.default,
            alertsDoc: _doc6.default
        },

        components: {
            scrollspy: _stiVue2.default.scrollspy,
            modal: modal,
            modalheader: modalheader,
            modalbody: modalbody,
            modalfooter: modalfooter,
            alerts: _stiVue2.default.alerts
        },

        created: function created() {

            //加载doc-section插件
            _vue2.default.use(_index2.default);

            this.$on('section.attach', function (id) {
                this.demos.push(id);
            });
        },


        methods: {

            showModal: function showModal() {
                this.isModalShow = !this.isModalShow;
            },

            showAlert: function showAlert(message, type) {
                this.$broadcast('alert', message, type);
            }

        },

        ready: function ready() {
            (0, _jquery2.default)(this.$el).highcharts();
        }
    };
});