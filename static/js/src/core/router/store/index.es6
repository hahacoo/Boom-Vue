/**
 * 基于vuex的路由状态管理
 * by zhangdi
 */

const state = {
  //创建一个对象来保存app路由变化
  app: '',
  path: '',
  component: '',
  params: {},
  hash: ''
}

// 创建一个对象存储路由状态mutation函数
const mutations = {
  UPDATEAPP (state, app) {
  	state.app = app;
  },

  UPDATEPATH (state, path) {
  	state.path = path;
  },

  UPDATECOMP (state, comp) {
  	state.component = comp
  },

  UPDATEPARAMS (state, params) {
    state.params = params
  },

  UPDATEHASH (state, hash) {
    state.hash = hash
  }
}

// 整合初始状态和变更函数
// 至此，这个 store 就可以连接到我们的应用中
export default {
  state,
  mutations
}