import template from './template.html'
import jqgrid from 'jqgrid'
/**
 * 基于jqGrid的表格实现，包含分页、滚动载入等功能
 * 依赖的JS文件：jquery，grid.locale-cn.js(国际化文件，必不可少)
 * 依赖的CSS：ui.jqgrid-bootstrap.css(bootstrap样式)
 */
export default {

    template,

    props : {
        url : {
            type : String,
            default : "",
            required : true
        }
    },

    data  () {
        return {
            cols : []
        }
    },

    created () {
        this.tagName = 'JQ-GRID';
    },

    ready () {
        this.render();
    },

    methods : {

        addCol (col) {
            this.cols.push(col);
        },

        init () {
            //  默认的属性
            this.options = {
                autowidth : true,//自动适应宽度
                shrinkToFit : true,//按比例计算宽度
                height : "auto",
                cellLayout : 5,
                altRows : true, //是否间隔显示记录
                hoverrows : true,//是否激活Hover事件
            };
        },

        render () {
            var gridBody = $('.sti-grid-body', this.$el);
            //
            // this.$dispatch("render.before", this.options);
            gridBody.jqGrid({
                styleUI : 'Bootstrap',
                url: this.url,
                datatype: "json",
                colModel: this.cols,


                viewsortcols : [true,'vertical',true],


                rowNum: 15,
                pager: 'pager'
            })
        }
    }

}