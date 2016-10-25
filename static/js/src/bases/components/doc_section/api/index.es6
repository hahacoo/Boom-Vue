import template from 'text!./view.html'
import propPartial from 'text!./partial_prop.html'
import eventPartial from 'text!./partial_event.html'
import compMixin from 'bases/mixins/compMixin';
import DocProp from './api_prop/index'

export default {
    data: function() {
        return {
            props: []
        }
    },

    props: {
        type: {
            default: 'prop'
        }
    },

    template,

    partials: {
        propPartial,
        eventPartial
    },

    mixins: [compMixin],

    ready (){

        this.$children.forEach(prop => {
            if(prop instanceof DocProp) {
                let tmp = {}
                tmp.name = prop.name
                tmp.type = prop.type
                tmp.default = prop.default
                tmp.desc = prop.desc
                tmp.args = prop.args

                this.props.push(tmp)
            }
        })
    }
}