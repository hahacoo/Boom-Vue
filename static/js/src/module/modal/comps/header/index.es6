/**
 * modal的header部分
 * @param: title——标题；ifShowArrow——是否显示右上小箭头
 * by zhangdi
 */
import 'css!./style.css'
import template from 'text!./view.html'

export default {
	template,

    data: function() {
        return {}
    },

    props: ['title', 'ifShowArrow'],
}
