define(['exports', 'text!./view.html', 'bases/mixins/appMixin', 'bases/components/doc_section/index', 'vue', 'module/sti-vue', 'text!doc/scrollspy/doc.html', 'text!doc/modal/doc.html', 'text!doc/alerts/doc.html', 'text!doc/messageCenter/doc.html', 'text!doc/chart/doc.html', 'css!./style.css'], function (exports, _view, _appMixin, _index, _vue, _stiVue, _doc, _doc3, _doc5, _doc7, _doc9) {
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
            alertsDoc: _doc6.default,
            messageCenterDoc: _doc8.default,
            highchartDoc: _doc10.default
        },

        components: {
            scrollspy: _stiVue2.default.scrollspy,
            modal: modal,
            modalheader: modalheader,
            modalbody: modalbody,
            modalfooter: modalfooter,
            alerts: _stiVue2.default.alerts,
            messageCenter: _stiVue2.default.messageCenter,
            stiChart: _stiVue2.default.chart
        },

        created: function created() {

            //加载doc-section插件
            _vue2.default.use(_index2.default);

            this.$on('section.attach', function (id) {
                this.demos.push(id);
            });

            // stiChart demo related code
            this.getStiChartData();
            // this.tooltipFormatter = function() {
            //     return this.key + "占比: " + this.percentage.toFixed(2);
            // }
            this.tooltipFormatter = function () {
                return this.series.name + "<br/>" + this.key + ": " + this.y;
            };
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
            },

            getStiChartData: function getStiChartData() {
                var _this = this;

                // 告警等级统计
                $.getJSON("/app/mock/chart/pie").then(function (res) {
                    setTimeout(function () {
                        _this.$broadcast("STI.chart.initSeries", { data: res.data });
                        _this.$broadcast("STI.chart.redraw");
                    }, 2000);
                });

                // $.getJSON("/app/mock/chart/top10").then(res => {
                //     setTimeout(() => {
                //         let data = res.data;
                //         let category = [];
                //         let series = data.map(val => {
                //             val.data.forEach(item => {
                //                 item.y = item.doc_count;
                //                 item.name = item.key;
                //             });
                //             category.push(val.name = val.series);
                //             return val;
                //         });

                //         this.$broadcast("STI.chart.initSeries", series, false);
                //         // this.$broadcast("STI.chart.setXAxisCategory", category);
                //         this.$broadcast("STI.chart.redraw");
                //     }, 2000);
                // });

                // type bar json
                // $.getJSON("/app/mock/chart/bar").then(res => {
                //     setTimeout(() => {
                //         let data = res.data;
                //         let category = [];
                //         let values = data.map(val => {
                //             return {
                //                 name: val.key,
                //                 y: val.value
                //             }
                //         });

                //         this.$broadcast("STI.chart.initSeries", {
                //             data: values,
                //             color: "#fe7c5c"
                //         });
                //         this.$broadcast("STI.chart.redraw");
                //     }, 2000);
                // });
            }
        }
    };
});