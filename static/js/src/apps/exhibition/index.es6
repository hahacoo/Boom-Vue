import 'css!./style.css'
import template from 'text!./view.html';
import appMixin from 'bases/mixins/appMixin';
import docSection from 'bases/components/doc_section/index';
import preHighlight from 'bases/components/pre_highlight/index';
import scrollspy from 'bases/components/scrollspy/index';

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
        docSection,
        preHighlight,
        scrollspy
    },

    created (){
        this.$on('section.attach', function(id) {
            this.demos.push(id)
        })
    }
};
