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
 *  requirejs, requiresjs文件合并
 *  uglify, js文件压缩混淆
 *  ssh, 模块上传服务器--gulp-sftp ✔️
 *  md2html, 模板文件生成
 */

//node模块
var gulp = require("gulp"),
	fs = require('fs'),
	path = require('path'),
	del = require('del'), //文件删除,只删除当前工作目录的文件
	minimist = require('minimist'), //参数处理
	browserSync = require('browser-sync').create(), //资源热替换
	yaml = require('js-yaml'), //读取配置文件
	reload = browserSync.reload;

//gulp插件
var util = require('gulp-util'), //gulputil插件
	cached = require('gulp-cached'), //gulp缓存插件
	less = require('gulp-less'), //gulp-less插件
	sourcemaps = require('gulp-sourcemaps'), //gulp-sourcmap插件
	LessAutoprefix = require('less-plugin-autoprefix'), //gulp-css前缀自动补全less插件
	autoprefix = new LessAutoprefix({
		browsers: ['last 2 versions']
	}),
	cssmin = require('gulp-cssmin'), //gulp-css压缩插件
	rename = require('gulp-rename'), //gulp重命名插件
	babel = require('gulp-babel'), //gulpes6插件
	sftp = require('gulp-sftp'), //gulpsftp插件
	//connect = require('gulp-connect'); //gulpconnect插件 启动一个本地服务，通过livereload实现页面重新加载，无法和express结合，放弃 × 
	nodemon = require('gulp-nodemon'), //gulpnodemon插件，与node-dev类似
	plumber = require('gulp-plumber'); //错误提示，不停止watch

//读取配置信息
var _config = {};

try {
	_config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '_config.yml'), 'utf8'))
} catch (e) {
	console.log('初始化配置信息错误,请检查根目录下的_config.yml是否正确');
	console.log(e);
}

//参数设置
var args = minimist(process.argv.slice(2), _config.argOptions),
	src = _config.src,
	dest = _config.dest,
	sftp = _config.sftp,
	server = _config.server;

/**
 * 清楚缓存
 * @return {[type]} [description]
 */
function cleanCached(done) {
	return cache.clearAll(done);
}

/**
 * 文件夹清空任务
 * @return {[type]} [description]
 */
function clean(done) {
	return del(dest.root, {
		force: true
	}).then(function() {
		done()
	});
}

/**
 * 清除css文件夹
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function cleanBaseLess(done) {
	return del(dist.cssbase, {
		force: true
	}).then(function() {
		done()
	});
}

/**
 * 文件copy
 * @return {[type]} [description]
 */
function copyOther() {
	return gulp.src([src.html, src.css])
		.pipe(cached('copyOther'))
		.pipe(gulp.dest(dest.js))
}

/**
 * 基础样式库
 * @return {[type]} [description]
 */
function less2css_base() {
	return gulp.src(src.baseless)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(dest.css));
}

/**
 * baseCSS压缩
 * @return {[type]} [description]
 */
function cssCompress() {
	return gulp.src(dest.baseCSS)
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(dest.cssbase));
}

/**
 * less文件转化
 * @return {[type]} [description]
 */
function less2css() {
	return gulp.src(src.less)
		.pipe(cached('less2css'))
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(dest.js));
}

/**
 * 打印错误信息
 */
function errrHandler( e ){
    console.log( e );
}

/**
 * es6转es5
 * @return {[type]} [description]
 */
function es2js() {
	//注意文件路径的问题，
	//目前还没有搞清楚babel是如何处理文件路径的，为避免路径引起的问题，推荐使用绝对路径
	//通过cached保证每次只编译修改的es6文件

	var plugins = path.resolve(__dirname, "./node_modules/babel-plugin-transform-es2015-modules-amd"),
		presets = path.resolve(__dirname, "./node_modules/babel-preset-es2015");
	return gulp.src(src.es6)
		.pipe(plumber({errorHandler: errrHandler}))
		.pipe(cached('es2js'))
		.pipe(babel({
			plugins: [plugins],
			presets: [presets]

		}))
		.pipe(gulp.dest(dest.js));
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

	return nodemon({
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
 * 启动热替换
 * 启动本地服务的方式无法和express整合，放弃
 * @return {[type]} [description]
 */
// function livereload(done) {

// 	connect.server({
// 		root: dest.root,
// 		livereload: true
// 	});

// 	done()
// }

/**
 * 监控文件变化
 * 4.x版本事件返回只有一个参数，只能通过unlink事件监听文件删除
 * @return {[type]} [description]
 */
function watch(done) {
	var esWatch = gulp.watch(src.es6, es2js).on('unlink', function(path) {
		delete cached.caches.es2js[path]; // gulp-cached 的删除 api

		var filepath = path.replace(/\\/g, "/").replace(/\/src\//, '/dist/js/').replace(/\.es6$/, '.js')
		//删除编译后的文件
		del(filepath, {force: true})
	})
	var lessWatch = gulp.watch(src.less, less2css).on('unlink', function(path) {
		delete cached.caches.less2css[path]; // gulp-cached 的删除 api

		var filepath = path.replace(/\\/g, "/").replace(/\/src\//, '/dist/js/').replace(/\.less$/, '.css')
		//删除编译后的文件
		del(filepath, {force: true})
	});
	
	var copyWatch = gulp.watch([src.html, src.css], copyOther).on('unlink', function(path) {
		delete cached.caches.copyOther[path]; // gulp-cached 的删除 api

		var filepath = path.replace(/\\/g, "/").replace(/\/src\//, '/dist/js/')
		//删除编译后的文件
		del(filepath, {force: true})
	});

	var baseWatch = gulp.watch(src.baselessPath, less2css_base)

	done()
}


//编译源文件
gulp.task('complie', gulp.series(
	clean,
	gulp.parallel(copyOther, less2css_base, less2css, es2js),
	cssCompress
));

//编译基础样式库
gulp.task('complie:base', gulp.series(
	cleanBaseLess,
	less2css_base
));

//上传服务器
gulp.task('publish', ssh)

//默认task，编译--创建服务--热替换
gulp.task('default', gulp.series('complie', bootstrap, hotReload, watch))