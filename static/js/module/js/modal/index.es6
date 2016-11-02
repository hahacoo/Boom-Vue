/*
 * modal 拟态窗
 * @param: 
 *  dialogModel
 *  title
 *  closeContent
 *  saveContent
 * by menghao
 */
import template from './view.html'

export default {
    data: function() {
        return {
            /**
             * 控制modal窗口的显示
             */
            'shown': false
        }
    },

    template,
    
    props: {      
        /**
         * 控制modal是否能够点击背景，以及是否显示右上角XX
         * dialogModel : false
         */
        'dialogModel': {
            default: true
        },

        /**
         * 标题
         * 可传入string和number
         */
        'title': {
            type: [String, Number],
            default: ''
        },

        /**
         * 左侧按钮
         * 可传入string和number
         */
        'closeContent': {
            type: [String, Number],
            default: '关闭'
        },

        /**
         * 右侧按钮
         * 可传入string和number
         */
        'saveContent': {
            type: [String, Number],
            default: '保存'
        }
    },

    events: {
        /*
         * 监听显示modal的事件，可从外部调用
         */
        'sti.modal.open' () {
            this.open()
        },
    },

    methods: {
        /*
         * 点击背景事件
         */
        clickBackground (e){
            if (!this.dialogModel) {
                return;
            }

            if (e.target == e.currentTarget) {
                this.close();
            }
        },

        /*
         * 关闭事件
         */
        close () {
            this.shown = false;
            this.dispatchCloseEvent();
        },

        /*
         * 显示modal事件
         */
        open () {
            this.shown = true;
            this.$dispatch('sti.modal.event', 'modal open')
        },

        //通知关闭的事件
        dispatchCloseEvent (){
            this.$dispatch('sti.modal.event', 'modal close')
        }
    }
}