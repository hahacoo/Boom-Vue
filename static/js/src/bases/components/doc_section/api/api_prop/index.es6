import compMixin from 'bases/mixins/compMixin'
import Vue from 'vue'

let DocProp = Vue.extend({
    data: function() {
        return {}
    },

    props: {
        name: {
            type: String,
            required: true
        },

        type: {
            type: String
        },

        default: {
            type: String
        },

        args: {
            type: String
        },

        desc: {
            type: String
        }
    },

    ready (){
    }
})

export default DocProp