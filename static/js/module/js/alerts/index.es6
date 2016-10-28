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
<<<<<<< HEAD
        /**
         *
         */
        max: {
            type : Number,
=======
        alertShow: false,
        max: {
            type: Number,
>>>>>>> 7dde7130789ef20f78ce4a96ba1384c4fc9615a9
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

<<<<<<< HEAD
        add : function (message, type) {
            let len = this.items.length

            if (this.alertList.length >= this.maxAlert) {
                this.alertList.splice(0, this.alertList.length - this.maxAlert + 1);
=======
        add: function (message, type) {
            if (this.alertList.length >= this.max) {
                this.alertList.splice(0, this.alertList.length - this.max + 1);
>>>>>>> 7dde7130789ef20f78ce4a96ba1384c4fc9615a9
            }
            this.alertList.push({'message': message, 'type': this.typeFormatter(type ||'success')});
        },

        typeFormatter: function (type) {
            return 'alert-' + type;
        },

<<<<<<< HEAD
        remove : function (index) {
            this.alertList.splice(index, 1);
        },

        addStyle (item) {
            item.className = "" + item.type;
=======
        remove: function (item) {
            this.alertList.$remove(item);
>>>>>>> 7dde7130789ef20f78ce4a96ba1384c4fc9615a9
        }

    },

    computed : {

        empty () {
            return this.items.length > 0
        }
    }

};