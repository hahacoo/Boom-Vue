/**
 * scrollspy
 * 根据内容与容器的相对位置，获取当前选中的内容
 * by zhangdi
 */
import template from './view.html'
import $ from 'jquery';

export default {
    data: function() {
        return {}
    },

    props: {
        //触发事件的偏移量
        offset: {
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
            coerce: function (val) {
                let valNum = +val,
                    unitReg = /^\d+(px|%)$/ig

                if(valNum === valNum) {
                    //数值
                    return valNum + 'px'
                } else if(unitReg.test(val)) {
                    //像素值或者百分比
                    return val
                } else {
                    return null
                }
                
            }
        },

        //选择器，默认选择所有带id的一级子节点
        selector: {
            type: String,
            default: function() {

                return '>[' + this.indicate + ']'
            }
        }
    },

    template,

    ready() {

        let container = $(this.$el),
            indicates = container.find(this.selector);

        function getOffsetTop(dom) {
            let top = dom.offsetTop,
                parent = dom.offsetParent;

            while(parent !== null) {
                if(parent === container[0]) break

                top += parent.offsetTop
                parent = parent.offsetParent
            }

            return top
        }

        let scrollHandler = (function(fn, delay) {
            let timer = null,
                first = true;

            return function() {

                if(first) {
                    fn()
                    first = false;
                }

                if(timer) {
                    return false;
                }

                timer = setTimeout(function() {
                    fn()
                    clearTimeout(timer);
                    timer = null;

                }, delay)
            }
        })(function() {
            let i = 0,
                length = indicates.length;

            //滚动距离
            let scrollTop = container[0].scrollTop,
                clientHeight = container[0].clientHeight,
                scrollHeight = container[0].scrollHeight;
            for(;i<length;i++) {
                //相对于容器的距离
                let offsetTop = getOffsetTop(indicates[i]);

                if(Math.abs(scrollTop + clientHeight - scrollHeight) < 2) {
                    //滚到到底部
                    let indicate = indicates[length-1][this.indicate]
                    if(indicate === undefined) {
                        throw Error('未获取到指定' + this.indicate + '的属性值')
                    }

                    this.active = indicate

                    return
                }else if(Math.abs(scrollTop - offsetTop) < +this.offset) {
                    let indicate = indicates[i][this.indicate]
                    if(indicate === undefined) {
                        throw Error('未获取到指定' + this.indicate + '的属性值')
                    }
                    
                    this.active = indicate

                    return
                }
            }
        }.bind(this), 0)

        //注册滚动事件
        container.on('scroll', scrollHandler)
    }
}
