define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * 路由控制器状态查询模块
   * by zhangdi
   */

  /**
   * 获取当前app
   * @param  {[type]} state 路由状态存储对象
   */
  var globalApp = exports.globalApp = function globalApp(state) {
    return state.router.app;
  };

  /**
   * 获取当前路径
   * @param  {[type]} state 路由状态存储对象
   */
  var globalPath = exports.globalPath = function globalPath(state) {
    return state.router.path;
  };

  /**
   * 获取当前视图
   * @param  {[type]} state 路由状态存储对象
   */
  var globalComp = exports.globalComp = function globalComp(state) {
    return state.router.component;
  };

  /**
   * 获取当前查询参数
   * @param  {[type]} state 路由状态存储对象
   * @return {[type]}       [description]
   */
  var globalParams = exports.globalParams = function globalParams(state) {
    return state.router.params;
  };
});