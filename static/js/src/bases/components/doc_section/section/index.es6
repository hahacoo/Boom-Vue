import template from 'text!./view.html'
import compMixin from 'bases/mixins/compMixin';

export default {
    data: function() {
        return {}
    },

    props: {
        title: {
            type: String,
            required: true
        },

        subTitle: {
            type: String,
            required: true
        }
    },

    template,

    mixins: [compMixin],

    ready (){
        //创建完成之后，通知根节点

        this.$dispatch("section.attach", this.title)
    }
}