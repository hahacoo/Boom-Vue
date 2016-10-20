/**
 * 路由控制器的动作分发模块
 * by zhangdi
 */

/**
 * 更新app视图
 * @param  {[type]} options.dispatch 事件的分发对象
 * @return {[type]}                  [description]
 */
export const updateApp = function ({ dispatch }, app) {
  dispatch('UPDATEAPP', app)
}

/**
 * 更新path
 * @param  {[type]} options.dispatch 事件的分发对象
 * @return {[type]}                  [description]
 */
export const updatePath = function ({ dispatch }, path) {
  dispatch('UPDATEPATH', path)
}

/**
 * 更新组件
 * @param  {[type]} options.dispatch 事件的分发对象
 * @return {[type]}                  [description]
 */
export const updateComp = function ({ dispatch }, comp) {
  dispatch('UPDATECOMP', comp)
}

/**
 * 更新请求参数
 * @param  {[type]} options.dispatch 事件的分发对象
 * @return {[type]}                  [description]
 */
export const updateParams = function ({ dispatch }, params) {
  dispatch('UPDATEPARAMS', params)
}