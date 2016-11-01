/**
 * messageCenter
 * 消息中心组件
 * by: 李政华(lizhenghua@b.360.cn)
 * 2016年10月26日 09:47:12
 */

import template from './view.html'
export default  {

    template,

    props : {
        'initOpen' : {
            type : Boolean,
            default : false
        }
    },

    data: function () {
        return {
            name: '消息中心',
            mcenterShow: false,
            messages: []
        }
    },

    events: {

        /**
         * 添加消息
         * @param text
         * @param type 默认值
         */
        'sti.mcenter.add': function (text, type) {
            this.addMessage(text, type);
        },

        /**
         * 打开消息中心界面
         * @param value
         */
        'sti.mcenter.open': function (value) {
            this.mcenterShow = !!value;
        }
    },

    methods: {

        /**
         *
         */
        open () {

        },

        close() {

        },

        getLocalTime: function (timestamp) {     
            return new Date(parseInt(timestamp)).toLocaleString();     
        },

        addMessage: function (text, type) {
            this.messages.unshift({'text': text, 'type': type, 'time': Date.parse(new Date())});
            this.$emit('sti.mcenter.open', true);
        },

        removeMessage: function (index) {
            this.messages.splice(index, 1);
        }

    }

};
