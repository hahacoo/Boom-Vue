define(['vue', 'highlightjs'], function (_vue, _highlightjs) {
  'use strict';

  var _vue2 = _interopRequireDefault(_vue);

  var _highlightjs2 = _interopRequireDefault(_highlightjs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //一定要配合v-pre使用
  _vue2.default.directive('highlight', {

    bind: function bind() {
      this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
    },

    update: function update(value, oldValue) {
      if (typeof value !== 'undefined') {
        value = value == null ? '' : value.toString();
      } else {
        value = this.el.innerHTML;
      }

      //将html转化为text
      this.el[this.attr] = value;

      //hightlightjs编译
      _highlightjs2.default.highlightBlock(this.el);
    },

    unbind: function unbind() {}
  });
});