/**
 * doc_section
 * by zhangdi
 */
import section from './section/index'
import highlight from './highlight/index'
import api from './api/index'
import docProp from './api/api_prop/index'

export default {

    install: function(Vue, option) {

        Vue.component('doc-section', section)
        Vue.component('doc-highlight', highlight)
        Vue.component('doc-api', api)
        Vue.component('doc-prop', docProp)
    }
}