import 'css!./style.css'
import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';
import docSection from 'bases/components/doc_section/index';

import Vue from 'vue';

import StiVue from 'module/sti-vue';
let {modal, modalheader, modalbody, modalfooter} = StiVue.modal

//doc
import scrollspyDoc from 'text!doc/scrollspy/doc.html'
import modalDoc from 'text!doc/modal/doc.html'
import alertsDoc from 'text!doc/alerts/doc.html'
import messageCenterDoc from 'text!doc/messageCenter/doc.html'
import highchartDoc from "text!doc/chart/doc.html";

export default {

    data: function() {
        return {
            defaultView: '',
            activeId: 'fat',
            demos: [],
            demoId: '',
            
            isModalShow: false
        }
    },

    template,

    mixins: [appMixin],

    partials: {
        scrollspyDoc,
        modalDoc,
        alertsDoc,
        messageCenterDoc,
        highchartDoc,
    },

    components: {
        scrollspy: StiVue.scrollspy,
        modal,
        modalheader,
        modalbody,
        modalfooter,
        alerts: StiVue.alerts,
        messageCenter: StiVue.messageCenter,
        stiChart: StiVue.chart
    },

    created (){

        //加载doc-section插件
        Vue.use(docSection)

        this.$on('section.attach', function(id) {
            this.demos.push(id)
        });

        // stiChart demo related code
        this.getStiChartData();
        // this.tooltipFormatter = function() {
        //     return this.key + "占比: " + this.percentage.toFixed(2);
        // }
        this.tooltipFormatter = function() {
            return this.series.name + "<br/>" + this.key + ": " + this.y;
        }
    },

    methods: {

        showModal: function() {
            this.isModalShow = !this.isModalShow;
        },

        addAlert: function (message, type) {
            this.$broadcast('sti.alert.add', message, type);
        },

        openMcenter: function (value) {
            this.$broadcast('sti.mcenter.open', value);
        },

        addMessage: function (message) {
            this.$broadcast('sti.mcenter.add', message);
        },

        getStiChartData: function() {
            // 告警等级统计
            $.getJSON("/app/mock/chart/pie").then(res => {
                setTimeout(() => {                    
                    this.$broadcast("STI.chart.initSeries", {data: res.data});
                    this.$broadcast("STI.chart.redraw");
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
