var webpack = require('webpack'),
	path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	autoprefix = require('autoprefixer')

function extendMode(config, mode) {

	var es2015 = path.resolve(__dirname, "../../node_modules/babel-preset-es2015"),
		addModuleExports = path.resolve(__dirname, "../../node_modules/babel-plugin-add-module-exports");//是module.exports生效

	var loaders = [
			{
				test: /\.es6$/,
				exclude: /(node_modules|libs)/,
				loader: "babel-loader",
				query: {
					presets: [es2015],
					plugins: [addModuleExports]
				}
			}, {
                //文件加载器，处理文件静态资源
                //name: 打包后文件名称
                //publicPath: 打包后文件绝对路径
                //文件输出地址按name属性来决定
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/static/fonts/[name].[ext]'
            }, {
                //图片加载器，更适合图片，
                //特点：可以将较小的图片转成base64（data-src），减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=../../img/[hash].[ext]'
            }, {
                test: /\.(html|tpl)$/,
                loader: "html?attrs=img:src img:data-src" //处理html中img的资源加载
            }

		],
		plugins = [
			//提取公用组件
	        new webpack.optimize.CommonsChunkPlugin({
	            names: ['commons', 'vendor']
	        })
		]

	if(mode === 'product') {

		return {
			path: config.pro.root,
	        publicPath: config.pro.publicPath,
			entryFilename: '[name].[hash].js',
			chunkFilename: '[id].[chunkhash].js',
			watch: false,
			devtool: '#source-map', //sourcemap生成方式
			loaders: loaders.concat([
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
				}, {
					test: /\.less$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader") //可以指定多个extract
				}, 
			]),
			plugins: plugins.concat([
				//文件压缩
	            new webpack.optimize.UglifyJsPlugin({
				    compress: {
				        warnings: true
				    }
				}),
	            //抽取css文件
	            new ExtractTextPlugin("style.css"),
	            //模板文件
	            new HtmlWebpackPlugin({
	                title: config.title, //网站标题
	                filename: config.outputPath.html, //html输出地址
	                template: config.template, //模板文件
	                inject: 'body', //js插入位置 head | body
	                hash: false, //为生成的静态资源生成hash值
	                //chunk: [], //需要引入的资源，默认为全部资源
	                minify: {
	                    //压缩html文件
	                    removeComments: true,
	                    collapseWhitespace: true
	                }
	            })
			])
		}
	}

	return {
		path: config.dev.root,
        publicPath: config.dev.publicPath,
		entryFilename: '[name].js',
		chunkFilename: '[id].js',
		watch: true,
		devtool: '#cheap-module-eval-source-map', //sourcemap生成方式
		loaders: loaders.concat([
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!postcss-loader"
			}, {
				test: /\.less$/,
				loader: "style-loader!css-loader!postcss-loader!less-loader"
			}
		]),
		plugins: plugins.concat([
			new HtmlWebpackPlugin({
                title: config.title,
                filename: config.outputPath.html,
                template: config.template,
                inject: 'body', 
                hash: true, 
                minify: {
                    removeComments: false,
                    collapseWhitespace: false
                }
            })
		])
	}

}

/**
 * webpack配置生成器
 * @param  {[type]} config  yml配置信息
 * @param  {[type]} mode    模式 dev|pro
 * @param  {[type]} options 自定义配置
 * @return {[type]}         webpack.config
 */
function generator(config, mode, options) {

    var src = config.src,
    	pro = config.pro

    var variable = extendMode(config, mode)

    return Object.assign({

        entry: {
            main: src.index, //入口文件
            vendor: src.vendor //第三方库
        },

        output: {
            path: variable.path, //输出路径
            publicPath: variable.publicPath, //webpack加载资源路径前缀
            filename: variable.entryFilename, //bundle文件名
            chunkFilename: variable.chunkFilename //chunk文件名
        },

        watch: variable.watch, //是否监控文件变化

        devtool: variable.devtool, //sourcemap生成方式

        module: {
            noParse: /\.doc\.html$/,
            loaders: variable.loaders //
        },

        plugins: variable.plugins, //

        postcss: [autoprefix({ browsers: ['last 2 versions'] })],

        resolve: {
            //自己代码模块配置
            root: [
                path.resolve(__dirname, src.root), //src
                path.resolve(__dirname, src.modules), //node_modules
            ],

            alias: {
                bases: path.resolve(__dirname, src.bases)
            },

            extensions: ['', '.js', '.es6', '.less', '.html']
        },
        
        resolveLoader: {
            //loader模块的配置，eg.style-loader
            root: path.resolve(__dirname, src.loaderMoules)
        }

    }, options)
}

/**
 * webpack任务配置
 * @param  {[type]}   config  配置信息
 * @param  {[type]}   mode    执行模式
 * @param  {[type]}   options 扩展配置
 * @param  {Function} done    回调函数
 * @return {[type]}           [description]
 */
function webpackTask(config, mode, options ,done) {

	if(arguments.length < 4) {

		done = options
		options = {}
	}

	webpack(generator(config, mode, options), done);
}

module.exports = webpackTask
