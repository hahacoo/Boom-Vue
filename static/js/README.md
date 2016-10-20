# NGSOCV_1.0

本次重构，希望在项目构建、代码结构、编码规范、平台基础功能与服务以及css样式方面有所改善。希望从这次重构之后形成规范，满足之后的快速开发和定制开发的需求。

## 重构思路

使用yeoman + bower + grunt工作流模式，通过yo（脚手架）功能，生成项目基础框架以及代码文件，通过bower安装依赖，grunt进行项目构建。

## 项目结构

- **apps** app组件
- **bases** 基础服务
	- **components** 全局组件
	- **directives** 全局指令
	- **filters** 全局过滤器
	- **mixins** 混入文件
	- **partials** html片段
	- **transitions** 全局动画钩子函数
- **config** 全局配置信息
- **core** 核心代码
	- **error** 错误页面处理
	- **home** 首页
	- **router** 路由控制
	- **service** 基础服务

## app开发规范

1. 在全局配置中配置相应app菜单项
		
		apps: [{
			id: 'demo',
			name: '模型展示',
			children: [{
				id: 'demo',
				name: '模型展示',
				children: [{
					id: 'demoForm',
					name: '表单布局'
				}, {
					id: 'demoPanel',
					name: '面板布局'
				}]
			}]

2. 新建app组件，混入'bases/mixins/appMixin'
		
		import appMixin from 'bases/mixins/appMixin';

		export default {
	
			data: function() {
				return {
					defaultView: 'demoForm',
				}
			},
		
			template,
		
			mixins: [appMixin],
		
			components: {}
		}


3. 在app中通过动态组件切换视图

		<component :is="view" transition="sti-fadeOutLeft" transition-mode="out-in"></component>
