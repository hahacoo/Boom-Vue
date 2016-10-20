define(['exports', 'text!./view.html', 'bases/mixins/compMixin', 'jquery', 'css!./style.css'], function (exports, _view, _compMixin, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _view2 = _interopRequireDefault(_view);

    var _compMixin2 = _interopRequireDefault(_compMixin);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        data: function data() {
            return {};
        },

        props: {
            //触发事件的偏移量
            offset: {
                type: Number,
                default: 80
            },

            //激活的区域
            active: {
                type: String,
                twoWay: true
            },

            //内容的唯一标示，默认为id
            indicate: {
                default: 'id',
                type: String
            },

            //容器高度
            cheight: {
                coerce: function coerce(val) {
                    var valNum = +val,
                        unitReg = /^\d+(px|%)$/ig;

                    if (valNum === valNum) {
                        //数值
                        return valNum + 'px';
                    } else if (unitReg.test(val)) {
                        //像素值或者百分比
                        return val;
                    } else {
                        return null;
                    }
                }
            },

            //选择器，默认选择所有带id的一级子节点
            selector: {
                type: String,
                default: function _default() {

                    return '>[' + this.indicate + ']';
                }
            }
        },

        template: _view2.default,

        mixins: [_compMixin2.default],

        ready: function ready() {

            var container = (0, _jquery2.default)(this.$el),
                indicates = container.find(this.selector);

            function getOffsetTop(dom) {
                var top = dom.offsetTop,
                    parent = dom.offsetParent;

                while (parent !== null) {
                    if (parent === container[0]) break;

                    top += parent.offsetTop;
                    parent = parent.offsetParent;
                }

                return top;
            }

            var scrollHandler = function (fn, delay) {
                var timer = null,
                    first = true;

                return function () {

                    if (first) {
                        fn();
                        first = false;
                    }

                    if (timer) {
                        return false;
                    }

                    timer = setTimeout(function () {
                        fn();
                        clearTimeout(timer);
                        timer = null;
                    }, delay);
                };
            }(function () {
                var i = 0,
                    length = indicates.length;

                //滚动距离
                var scrollTop = container[0].scrollTop,
                    clientHeight = container[0].clientHeight,
                    scrollHeight = container[0].scrollHeight;
                for (; i < length; i++) {
                    //相对于容器的距离
                    var offsetTop = getOffsetTop(indicates[i]);

                    if (Math.abs(scrollTop + clientHeight - scrollHeight) < 2) {
                        //滚到到底部
                        var indicate = indicates[length - 1][this.indicate];
                        if (indicate === undefined) {
                            throw Error('未获取到指定' + this.indicate + '的属性值');
                        }

                        this.active = indicate;

                        return;
                    } else if (Math.abs(scrollTop - offsetTop) < this.offset) {
                        var _indicate = indicates[i][this.indicate];
                        if (_indicate === undefined) {
                            throw Error('未获取到指定' + this.indicate + '的属性值');
                        }

                        this.active = _indicate;

                        return;
                    }
                }
            }.bind(this), 0);

            //注册滚动事件
            container.on('scroll', scrollHandler);
        }
    };
});