import Vue from 'vue'
import highlightjs from 'highlightjs'

//一定要配合v-pre使用
Vue.directive('highlight', {

  bind: function () {
     this.attr = this.el.nodeType === 3
      ? 'data'
      : 'textContent'
  },

  update: function (value, oldValue) {
      if(typeof value !== 'undefined') {
          value = value == null ? '' : value.toString()
      } else {
          value = this.el.innerHTML
      }

      //将html转化为text
      this.el[this.attr]= value

      //hightlightjs编译
      highlightjs.highlightBlock(this.el)
  },

  unbind: function () {}
})