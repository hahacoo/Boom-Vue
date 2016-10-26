// define(['text!./view.html', 'vue', 'css!./style.css'], function (view, vue) {
/**
 * alerts
 * 取代noty的信息提示组件，从右上角弹出并且缩回
 * by: 李政华(lizhenghua@b.360.cn)
 * 2016年10月26日 09:47:12
 */

import template from './view.html'
export default  {

    template,

    props: ['maxAlert'],

    data: function () {
        return {
            maxAlert: this.maxAlert || 5,
            alertList: []
        }
    },

    ready: function () {

    },

    events: {
        'alert': function (message, type) {
            this.addAlert(message, type);
        }
    },

    methods: {

        addAlert: function (message, type) {
            if (this.alertList.length == this.maxAlert) {
                this.alertList.shift();
            }
            this.alertList.push({'message': message, 'type': type ||'success'});
        },

        delAlert: function (index) {
            this.alertList.splice(index, 1);
        }

    }

};
// });