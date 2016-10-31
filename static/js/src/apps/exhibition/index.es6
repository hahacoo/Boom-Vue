import 'css!./style.css'
import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';
import docSection from 'bases/components/doc_section/index';


import Vue from 'vue';
import $ from 'jquery';
import 'highcharts';

import StiVue from 'module/sti-vue';
let {modal, modalheader, modalbody, modalfooter} = StiVue.modal

//doc
import scrollspyDoc from 'text!doc/scrollspy/doc.html'
import modalDoc from 'text!doc/modal/doc.html'
import alertsDoc from 'text!doc/alerts/doc.html'

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
        alertsDoc
    },

    components: {
        scrollspy: StiVue.scrollspy,
        modal,
        modalheader,
        modalbody,
        modalfooter,
        alerts: StiVue.alerts
    },

    created (){

        //加载doc-section插件
        Vue.use(docSection)

        this.$on('section.attach', function(id) {
            this.demos.push(id)
        })
    },

    methods: {

        showModal: function() {
            this.isModalShow = !this.isModalShow;
        },

        showAlert: function (message, type) {
            this.$broadcast('alert', message, type);
        }

    },

    ready () {
        $(this.$el).highcharts()
    }
};
