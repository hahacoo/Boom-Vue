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
        alertShow: false,
        max: {
            type: Number,
            default: 5
        }
    },

    data: function () {
        return {
            alertList: []
        }
    },

    events: {
        'sti.alert.add': function (message, type) {
            this.add(message, type);
        }
    },

    computed: {
        alertShow: function () {
            return this.alertList.length > 0;
        }
    },

    methods: {

        add: function (message, type) {
            if (this.alertList.length >= this.max) {
                this.alertList.splice(0, this.alertList.length - this.max + 1);
            }
            this.alertList.push({'message': message, 'type': this.typeFormatter(type ||'success')});
        },

        typeFormatter: function (type) {
            return 'alert-' + type;
        },

        remove: function (item) {
            this.alertList.$remove(item);
        }

    }

};