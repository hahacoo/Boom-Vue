# Boom-Vue前端开发环境

该项目提供了express搭建的一个本地node服务器，方便本地调试，同时使用gulp+webpack构建前端，提高编译效率，前端框架采用vue。

## 安装依赖

1. 开发环境依赖

	clone到本地之后，在项目根目录下执行如下命令：
	
	```
	npm install
	```
2. 前端依赖

	进入**static/js**目录，安装前端依赖：
	
	```
	npm install
	```
3. gulp全局安装
	
	gulp工具采用4.0版本，如果之前安装过gulp，请移除之前版本再执行如下命令：

	```
	npm install gulpjs/gulp#4.0 -g
	```

## 使用

1. 项目结构

```
|-bin 服务端命令集
|-routes 路由集合
|	|-datats 本地数据路由
|	|-index 主页路由
|-static 静态文件
|	|-css css文件（基础样式库）
|	|-fonts 字体文件
|	|-img 图片
|	|-js 前端代码
|		|-dev 开发环境编译后文件夹
|		|-pro 发布环境编译后文件夹
|		|-src 前端es6文件
|-tools gulp配置文件
|-views 服务端模板文件
```
2. 命令

```
npm run build
```
在根目录下执行，进入开发模式，启动本地服务，文件编译到`dev`

```
npm run build -- -M product
```
在根目录下执行，文件直接编译到`pro`

```
npm start
```
在根目录下执行，启动本地服务

