define(['vue'], function (_vue) {
  'use strict';

  var _vue2 = _interopRequireDefault(_vue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function getConfig() {
    return {
      eventName: 'app.broadcast',
      baseUrl: '/sti',
      errorUrl: 'error',
      apps: [{
        "id": "module",
        "name": "示例",
        "children": [{
          "id": 'comp',
          "name": '一级菜单'
        }]
      }, {
        "id": "exhibition",
        "name": "组件",
        "children": []
      }]
    };
  } /**
     * 全局配置信息
     * 只读
     * by zhangdi
     */


  _vue2.default.prototype.$getConfig = getConfig;
});