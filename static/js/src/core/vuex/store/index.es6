/**
 * 基于vuex的路由状态管理
 * by zhangdi
 */
import Vue from 'vue'
import Vuex from 'vuex'
import router from 'core/router/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  // 组合各个模块
  modules: {
    router
  }
})