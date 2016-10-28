/**
 * Created by ganhuan on 2016/10/28.
 */
export default {
    props : {
        title : {
            type : String,
            required : true
        },

        name  : {
            type     : String,
            required : true
        },

        width  : {
            type     : Number,
            required : false
        },
    },

    created () {

        if(this.$parent.tagName !== 'JQ-GRID') {
            throw Error('jq-col只能作为JQ-GRID的子元素！');
        }
        //  添加列定义
        this.$parent.addCol({
            label : this.title,
            name  : this.name
        });
    }
}