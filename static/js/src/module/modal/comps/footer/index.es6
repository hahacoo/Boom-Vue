/**
 * modal的footer部分
 * @param: closeContent——关闭按钮的内容; saveContent——保存按钮的内容
 * by menghao
 */
import 'css!./style.css'
import template from 'text!./view.html'

export default {
	template,

    data: function() {
        return {}
    },

    props: ['closeContent', 'saveContent'],
}
