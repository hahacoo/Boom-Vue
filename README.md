# STI-VUE组件池前端开发环境（测试）

该项目提供了express搭建的一个本地node服务器，方便大家本地调试，同时使用gulp构建前端，提高编译效率，加强热替换功能，提高大家开发效率。

## 安装依赖

1. 服务端依赖

	clone到本地之后，在项目根目录下执行如下命令：
	
	```
	npm install
	```
2. 前端依赖

	进入**static/js**目录，通过bower安装依赖：
	
	```
	bower install
	```
3. gulp全局安装
	
	gulp工具采用4.0版本，如果之前安装过gulp，请移除之前版本再执行如下命令：

	```
	npm install gulpjs/gulp#4.0 -g
	```
3. gulp本地依赖安装

	进入**static/js/gulp**目录，执行如下命令：
	
	```
	npm install
	```

## 使用

项目结构

```
|-bin 服务端命令集
|-routes 路由集合
|	|-datats 本地数据路由
|	|-index 主页路由
|-static 静态文件
|	|-css 第三方css文件（非bower管理）
|	|-data 存放数据json文件（已被datas路由替代）
|	|-img 图片
|	|-js 前端代码
|		|-commons 基础样式库
|		|-dist gulp编译后文件夹
|		|-gulp gulp配置文件
|		|-src 前端es6文件
|
|-views 服务端模板文件
```
相较于之前的项目，gulp完成的功能更多，包括服务端的启动，以及前端构建工作的执行。依赖安装完之后，进入**static/js**目录，执行命令

```
gulp
```
项目就可以正常运行，本次升级加强了热替换功能，前端代码的修改之间反映到页面，节省了调试时间，服务端的修改同样也可以自动重启，提高开发效率。