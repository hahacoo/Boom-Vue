/**
 * 全局配置信息
 * 只读
 * by zhangdi
 */
import Vue from 'vue'

function getConfig() {
	return {
		eventName: 'app.broadcast',
		baseUrl: '/sti',
		errorUrl: 'error',
		apps: [{
            "id":"module",
            "name":"示例",
            "children":[{
                "id" : 'comp',
                "name": '一级菜单'
            }]
        }, {
            "id":"exhibition",
            "name":"组件",
            "children":[]
        }]
	}
}

Vue.prototype.$getConfig = getConfig;
