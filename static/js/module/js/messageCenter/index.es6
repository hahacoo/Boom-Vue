/**
 * messageCenter
 * 消息中心组件
 * by: 李政华(lizhenghua@b.360.cn)
 * 2016年10月26日 09:47:12
 */

import template from './view.html'
export default  {

    template,

    data: function () {
        return {
            name: '消息中心',
            mcenterShow: false,
            messages: [
                {
                    text: '你刚刚登出了系统你刚刚登出了系统你刚刚登出了系统你刚刚登出了系统',
                    type: 'success',
                    time: 1477306539000
                }, {
                    text: 'this is a testtest test testtest. this is a testtest test testtest. this is a testtest test testtest',
                    type: 'success',
                    time: 1477306753000
                }, {
                    text: '你刚刚登出了系统',
                    type: 'success',
                    time: 1477306539000
                }, {
                    text: '你刚刚登陆了系统',
                    type: 'success',
                    time: 1477306753000
                }, {
                    text: '你刚刚登出了系统',
                    type: 'success',
                    time: 1477306539000
                }, {
                    text: '你刚刚登陆了系统',
                    type: 'success',
                    time: 1477306753000
                }
            ]
        }
    },

    events: {
        'sti.mcenter.add': function (text, type) {
            this.addMessage(text, type);
        },
        'sti.mcenter.open': function (value) {
            this.mcenterShow = !!value;
        }
    },

    methods: {

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
