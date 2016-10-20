/**
 * pre_highlight
 * 基于highlighthjs
 * by zhangdi
 */
import 'css!./style.css'
import template from 'text!./view.html'
import compMixin from 'bases/mixins/compMixin';

export default {
    data: function() {
        return {}
    },

    props: {
        type: {
            default: '',
            type: String
        }
    },

    template,

    mixins: [compMixin],
}
