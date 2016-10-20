define(['exports', 'vue', 'vuex', 'core/router/store/index'], function (exports, _vue, _vuex, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _vuex2 = _interopRequireDefault(_vuex);

  var _index2 = _interopRequireDefault(_index);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  _vue2.default.use(_vuex2.default); /**
                                      * 基于vuex的路由状态管理
                                      * by zhangdi
                                      */
  exports.default = new _vuex2.default.Store({
    // 组合各个模块
    modules: {
      router: _index2.default
    }
  });
});