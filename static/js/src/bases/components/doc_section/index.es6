/**
 * doc_section
 * by zhangdi
 */
import section from './section/index'
import highlight from './highlight/index'

export default {

    install: function(Vue, option) {

        Vue.component('doc-section', section)
        Vue.component('doc-highlight', highlight)
    }
}