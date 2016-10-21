define(['exports', 'text!./view.html', './comps/header/index', './comps/body/index', './comps/footer/index', 'css!./style.css'], function (exports, _view, _index, _index3, _index5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.modalfooter = exports.modalbody = exports.modalheader = exports.modal = undefined;

    var _view2 = _interopRequireDefault(_view);

    var _index2 = _interopRequireDefault(_index);

    var _index4 = _interopRequireDefault(_index3);

    var _index6 = _interopRequireDefault(_index5);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var modal = {
        data: function data() {
            return {};
        },

        template: _view2.default,

        props: {
            'ifShow': {
                default: true
            },
            'canClickBlank': {
                default: true
            }
        },
        methods: {
            clickBlank: function clickBlank(e) {
                if (!this.canClickBlank) {
                    return;
                }

                if (e.target == e.currentTarget) {
                    this.ifShow = false;
                    this.closeEvent();
                }
            },

            close: function close() {
                this.ifShow = false;
                this.closeEvent();
            },

            //一个关闭的事件
            closeEvent: function closeEvent() {
                console.log('窗口关闭');
            }
        }

    }; /*
        * modal 拟态窗
        * @param: 
        *  ifShow——是否显示拟态窗；
        *  canClickBlank——单击空白区域是否关闭
        * by menghao
        */
    exports.modal = modal;
    exports.modalheader = _index2.default;
    exports.modalbody = _index4.default;
    exports.modalfooter = _index6.default;
});