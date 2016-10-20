define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * 基于vuex的路由状态管理
   * by zhangdi
   */

  var state = {
    //创建一个对象来保存app路由变化
    app: '',
    path: '',
    component: '',
    params: {}
  };

  // 创建一个对象存储路由状态mutation函数
  var mutations = {
    UPDATEAPP: function UPDATEAPP(state, app) {
      state.app = app;
    },
    UPDATEPATH: function UPDATEPATH(state, path) {
      state.path = path;
    },
    UPDATECOMP: function UPDATECOMP(state, comp) {
      state.component = comp;
    },
    UPDATEPARAMS: function UPDATEPARAMS(state, params) {
      state.params = params;
    }
  };

  // 整合初始状态和变更函数
  // 至此，这个 store 就可以连接到我们的应用中
  exports.default = {
    state: state,
    mutations: mutations
  };
});