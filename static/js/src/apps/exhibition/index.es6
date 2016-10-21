import 'css!./style.css'
import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';
import docSection from 'bases/components/doc_section/index';
import scrollspy from 'module/scrollspy/index';

import Vue from 'vue';

export default {

    data: function() {
        return {
            defaultView: '',
            activeId: 'fat',
            demos: [],
            demoId: ''
        }
    },

    template,

    mixins: [appMixin],

    components: {
        scrollspy
    },

    created (){

        //加载doc-section插件
        Vue.use(docSection)

        this.$on('section.attach', function(id) {
            this.demos.push(id)
        })
    }
};
