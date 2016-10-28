define(['exports', 'text!./view.html', 'bases/mixins/appMixin', 'bases/components/doc_section/index', 'vue', 'module/sti-vue', 'text!doc/scrollspy/doc.html', 'text!doc/modal/doc.html', 'text!doc/alerts/doc.html', 'text!doc/messageCenter/doc.html', 'text!doc/map/doc.html', 'css!./style.css'], function (exports, _view, _appMixin, _index, _vue, _stiVue, _doc, _doc3, _doc5, _doc7, _doc9) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _appMixin2 = _interopRequireDefault(_appMixin);

    var _index2 = _interopRequireDefault(_index);

    var _vue2 = _interopRequireDefault(_vue);

    var _stiVue2 = _interopRequireDefault(_stiVue);

    var _doc2 = _interopRequireDefault(_doc);

    var _doc4 = _interopRequireDefault(_doc3);

    var _doc6 = _interopRequireDefault(_doc5);

    var _doc8 = _interopRequireDefault(_doc7);

    var _doc10 = _interopRequireDefault(_doc9);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _StiVue$modal = _stiVue2.default.modal,
        modal = _StiVue$modal.modal,
        modalheader = _StiVue$modal.modalheader,
        modalbody = _StiVue$modal.modalbody,
        modalfooter = _StiVue$modal.modalfooter;
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
            alertsDoc: _doc6.default,
            messageCenterDoc: _doc8.default,
            mapDoc: _doc10.default
        },

        components: {
            scrollspy: _stiVue2.default.scrollspy,
            modal: modal,
            modalheader: modalheader,
            modalbody: modalbody,
            modalfooter: modalfooter,
            alerts: _stiVue2.default.alerts,
            messageCenter: _stiVue2.default.messageCenter,
            map: _stiVue2.default.map
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

            addAlert: function addAlert(message, type) {
                this.$broadcast('sti.alert.add', message, type);
            },

            openMcenter: function openMcenter(value) {
                this.$broadcast('sti.mcenter.open', value);
            },

            addMessage: function addMessage(message) {
                this.$broadcast('sti.mcenter.add', message);
            }

        }
    };
});