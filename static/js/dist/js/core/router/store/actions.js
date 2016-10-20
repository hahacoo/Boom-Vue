define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * 路由控制器的动作分发模块
   * by zhangdi
   */

  /**
   * 更新app视图
   * @param  {[type]} options.dispatch 事件的分发对象
   * @return {[type]}                  [description]
   */
  var updateApp = exports.updateApp = function updateApp(_ref, app) {
    var dispatch = _ref.dispatch;

    dispatch('UPDATEAPP', app);
  };

  /**
   * 更新path
   * @param  {[type]} options.dispatch 事件的分发对象
   * @return {[type]}                  [description]
   */
  var updatePath = exports.updatePath = function updatePath(_ref2, path) {
    var dispatch = _ref2.dispatch;

    dispatch('UPDATEPATH', path);
  };

  /**
   * 更新组件
   * @param  {[type]} options.dispatch 事件的分发对象
   * @return {[type]}                  [description]
   */
  var updateComp = exports.updateComp = function updateComp(_ref3, comp) {
    var dispatch = _ref3.dispatch;

    dispatch('UPDATECOMP', comp);
  };

  /**
   * 更新请求参数
   * @param  {[type]} options.dispatch 事件的分发对象
   * @return {[type]}                  [description]
   */
  var updateParams = exports.updateParams = function updateParams(_ref4, params) {
    var dispatch = _ref4.dispatch;

    dispatch('UPDATEPARAMS', params);
  };
});