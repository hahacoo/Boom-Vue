/**
 * alerts
 * 取代noty的信息提示组件，从右上角弹出并且缩回
 * by: 李政华(lizhenghua@b.360.cn)
 * 2016年10月26日 09:47:12
 */

import template from './view.html'
export default  {

    template,

    props: {
        /**
         *
         */
        max: {
            type : Number,
            default: 5
        },

        /**
         * 消息有效存在的时间
         */
        live : {

        }
    },

    data: function () {
        return {
            alertList: []
        }
    },

    ready: function () {

    },

    events: {
        'sti.alert.add': function (message, type) {
            this.addAlert(message, type);
        }
    },

    methods: {

        add : function (message, type) {
            let len = this.items.length

            if (this.alertList.length >= this.maxAlert) {
                this.alertList.splice(0, this.alertList.length - this.maxAlert + 1);
            }
            this.alertList.push({'message': message, 'type': type ||'success'});
        },

        remove : function (index) {
            this.alertList.splice(index, 1);
        },

        addStyle (item) {
            item.className = "" + item.type;
        }

    },

    computed : {

        empty () {
            return this.items.length > 0
        }
    }

};