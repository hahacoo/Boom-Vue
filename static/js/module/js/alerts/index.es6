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
        maxAlert: {
            default: 5
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

        addAlert: function (message, type) {
            if (this.alertList.length >= this.maxAlert) {
                this.alertList.splice(0, this.alertList.length - this.maxAlert + 1);
            }
            this.alertList.push({'message': message, 'type': type ||'success'});
        },

        delAlert: function (index) {
            this.alertList.splice(index, 1);
        }

    }

};