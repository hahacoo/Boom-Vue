/**
 * 路由控制器状态查询模块
 * by zhangdi
 */

/**
 * 获取当前app
 * @param  {[type]} state 路由状态存储对象
 */
export const globalApp = function (state) {
  return state.router.app
}

/**
 * 获取当前路径
 * @param  {[type]} state 路由状态存储对象
 */
export const globalPath = function (state) {
  return state.router.path
}

/**
 * 获取当前视图
 * @param  {[type]} state 路由状态存储对象
 */
export const globalComp = function (state) {
  return state.router.component
}

/**
 * 获取当前查询参数
 * @param  {[type]} state 路由状态存储对象
 * @return {[type]}       [description]
 */
export const globalParams = function (state) {
  return state.router.params
}

/**
 * 获取当前hash值
 * @param  {[type]} state 路由状态存储对象
 * @return {[type]}       [description]
 */
export const globalHash = function (state) {
  return state.router.hash
}

