/**
 *  基于gulp的项目构建工具，相比grunt的IO操作，gulp的流操作更加快捷，gulp执行异步任务，task 将以最大的并发数执行，也就是说，gulp 会一次性运行所有的 task 并且不做任何等待，
 *  很多时候我们需要使用插件实现顺序执行（gulp-sequence），
 *  gulp4.0已经原生支持顺序执行（gulp.series）
 *
 * 	gulp的配置信息保存在_config.yml文件下
 * 	
 *  clean，文件清除--del ✔️
 *  less, less-文件转化--gulp-less ✔️
 *  cssmin, css文件压缩--gulp-cssmin ✔️
 *  babel, es6文件转化--gulp-bable ✔️
 *  uglify, js文件压缩混淆
 *  ssh, 模块上传服务器--gulp-sftp ✔️
 */

//node模块
var gulp = require("gulp"),
	fs = require('fs'),
	path = require('path'),
	del = require('del'), //文件删除,只删除当前工作目录的文件
	minimist = require('minimist'), //参数处理
	browserSync = require('browser-sync').create(), //资源热替换
	reload = browserSync.reload

//gulp插件
var util = require('gulp-util'), //gulputil插件
	less = require('gulp-less'), //gulp-less插件
	sourcemaps = require('gulp-sourcemaps'), //gulp-sourcmap插件
	LessAutoprefix = require('less-plugin-autoprefix'), //gulp-css前缀自动补全less插件
	lessAutoprefix = new LessAutoprefix({
		browsers: ['last 2 versions']
	}),
	cssmin = require('gulp-cssmin'), //gulp-css压缩插件
	rename = require('gulp-rename'), //gulp重命名插件
	babel = require('gulp-babel'), //gulp babel插件
	sftp = require('gulp-sftp'), //gulpsftp插件
	//connect = require('gulp-connect'); //gulpconnect插件 启动一个本地服务，通过livereload实现页面重新加载，无法和express结合，放弃 × 
	nodemon = require('gulp-nodemon'), //gulpnodemon插件，与node-dev类似
	plumber = require('gulp-plumber') //错误提示，不停止watch

//webpack
var webpack = require('./webpackTask')

//读取配置信息
var _config = require('../../loadConfig')(path.join(__dirname, '../../_config.yml'))

var processes = {
	server: null
}

//参数设置
var args = minimist(process.argv.slice(2), _config.argOptions),
	isProduct = args.mode === 'product',
	src = _config.src,
	dev = _config.dev,
	pro = _config.pro,
	base = _config.base,
	sftp = _config.sftp,
	server = _config.server;

/**
 * 打印错误信息
 */
function errrHandler(e) {
	console.log(e);
}

/**
 * 文件夹清空任务
 * @return {[type]} [description]
 */
function clean(done) {

	if(isProduct) {

		return del(pro.root, {
			force: true
		}).then(function() {
			done()
		});
	}

	return del(dev.root, {
		force: true
	}).then(function() {
		done()
	});
}

/**
 * 清除基础样式库css文件夹
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function cleanBaseLess(done) {
	return del(base.cssDest, {
		force: true
	}).then(function() {
		done()
	});
}

/**
 * 基础样式库
 * @return {[type]} [description]
 */
function less2css_base() {
	return gulp.src(base.less)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [lessAutoprefix]
		}))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(base.cssDest));
}

/**
 * baseCSS压缩
 * @return {[type]} [description]
 */
function cssCompress() {
	return gulp.src(base.css)
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(base.cssDest));
}

/**
 * 文件发布到服务器
 * @return {[type]} [description]
 */
function ssh() {
	return gulp.src(dest.root)
		.pipe(sftp({
			host: sftp.host,
			port: sftp.port,
			user: sftp.user,
			pass: sftp.pass,
			remotePath: sftp.remotePath || '/home/hahacoo'
		}));
}

/**
 * 启动express服务
 * 通过nodemon实现node-dev功能，每次修改文件都会重启服务
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function bootstrap(done) {
	var started = false;

	processes.server = nodemon({
		script: server.bin, //启动脚本
		watch: server.path //监控文件
	}).on('start', function() {
		//避免重复启动服务
		if (!started) {
			done();
			started = false;
			util.log(util.colors.cyan('******************'))
			util.log(util.colors.bgBlue('**server started**'))
			util.log(util.colors.cyan('******************'))
		}
	}).on('exit', function() {
		//服务停止
		util.log('')
		util.log(util.colors.cyan('******************'))
		util.log(util.colors.bgBlue('**server exited**'))
		util.log(util.colors.cyan('******************'))
	})

	return processes.server
}

/**
 * 通过browserSync代理本地express服务，实现热替换
 * @return {[type]} [description]
 */
function hotReload(done) {
	browserSync.init({
		proxy: server.proxy, //本地服务
		files: server.files, //监控文件
		browser: server.browser, //浏览器
		port: server.port, //服务端口
		open: false, //是否自动打开浏览器
		notify: false, //关闭提示框
		watchOptions: {
			ignoreInitial: true,
			ignored: server.ignored
		} //过滤无需监控的文件
	})

	done()
}

/**
 * 打包 webpack
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackBundle(done) {

	webpack(_config, args.mode, function(err, stats) {

		if (err) throw new util.PluginError("webpack", err);
		util.log("[webpack]", stats.toString({
			// output options
		}));
		done();
	});
}

/**
 * 监控文件变化
 * @return {[type]} [description]
 */
function watch(done) {

	var baseWatch = gulp.watch(base.lessPath, less2css_base)

	done()
}

//捕获异常
process.on('uncaughtException', function (e) {

	//删除空文件uncaughtException，暂时无法解决，官方说4.0已解决，目前仍存在
	//暂时没有找到杀死服务器进程的方法，先通过异常捕获，阻止gulp进程异常结束
	util.log(util.colors.red(e))
});

//打包源文件
gulp.task('bundle', webpackBundle)

//编译基础样式库
gulp.task('complie:base', gulp.series(
	cleanBaseLess,
	less2css_base,
	cssCompress
));

//编译
gulp.task('complie', gulp.parallel(
	gulp.series(cleanBaseLess, less2css_base, cssCompress),
	gulp.series(clean, 'bundle')
));

//上传服务器
gulp.task('publish', ssh)


if(isProduct) {

	//默认product task，编译
	gulp.task('default', gulp.series('complie'))

} else {

	//默认develop task，编译--创建服务--热替换
	gulp.task('default', gulp.series('complie', bootstrap, hotReload, watch))

}

