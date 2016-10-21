/*
 * modal 拟态窗
 * @param: 
 *  ifShow——是否显示拟态窗；
 *  canClickBlank——单击空白区域是否关闭
 * by menghao
 */
import 'css!./style.css'
import template from 'text!./view.html'
import modalheader from './comps/header/index'
import modalbody from './comps/body/index'
import modalfooter from './comps/footer/index'

var modal = {
    data: function() {
        return {

        }
    },

    template,
    
    props: {
        'ifShow': {
            default: true
        }, 
        'canClickBlank': {
            default: true
        }
    },
    methods: {
        clickBlank: function(e){
            if (!this.canClickBlank) {
                return;
            }

            if (e.target == e.currentTarget) {
                this.ifShow = false;
                this.closeEvent();
            }
        },

        close: function() {
            this.ifShow = false;
            this.closeEvent();
        },

        //一个关闭的事件
        closeEvent: function(){
            console.log('窗口关闭')
        }
    }

}

export {
    modal,
    modalheader,
    modalbody,
    modalfooter
}