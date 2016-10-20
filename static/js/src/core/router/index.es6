/**
 * 基于vuex、pathtoregexp的路由控制器
 * 用pathtoregexp的完成地址匹配
 * 用vuex进行状态管理
 * by zhangdi
 */
import $ from 'jquery';
import page from 'page';
import pathtoregexp from 'pathtoregexp';
import Vue from 'vue';

let router = {

    install: function (Vue, options) {
        
        /**
         * 默认配置
         * @type {Object}
         */
        let defaultConf = {
            baseUrl: '/home',
            errorUrl: 'error',
        }

        /**
         * 权限信息
         * @type {Object}
         */
        let permissions = [];

        if(options) {
            if(options.baseUrl && typeof options.baseUrl === 'string' ) {
                defaultConf.baseUrl = options.baseUrl
            }

            if(options.errorUrl && typeof options.errorUrl === 'string' ) {
                defaultConf.errorUrl = options.errorUrl
            }
        }

        /**
         * 更新router信息
         * @param  {String} app    [description]
         * @param  {String} path   [description]
         * @param  {String} comp   [description]
         * @param  {Object} params [description]
         * @return {[type]}        [description]
         */
        function updateView (app='', path='', comp='', params={}) {
            this.updateApp(app)
            this.updatePath(path)
            this.updateComp(comp)
            this.updateParams(params)
        }

        /**
         * app切换路由
         * @param  {[type]} ctx [description]
         * @return {[type]}     [description]
         */
        function appRouter (ctx) {
            let app = ctx.params.app,
                any = ctx.params.any,
                path = ctx.path.replace(/^\/|\/$/g, ''),
                querystring = ctx.querystring,
                params = {};

            //处理path，获取当前组件
            let paths = path.split('/'),
                comp = paths.slice(-1).toString();

            if(querystring) {
                
                //处理请求参数
                let raw_tostring = Object.prototype.toString;
                
                //拆分参数项
                let querys = querystring.split('&')

                querys.forEach(function(query) {
                    let queryObj = query.split('='),
                        param_value = queryObj[1];

                    if(params.hasOwnProperty(queryObj[0])) {
                        
                        //存在多个相同参数，合并为数组
                        let value = params[queryObj[0]];

                        if(raw_tostring.call(value) === '[object Array]') {
                            value.push(param_value)
                        } else {
                            value = [value, param_value];
                        } 
                        params[queryObj[0]] = value
                    } else {
                        
                        //创建参数对象
                        params[queryObj[0]] = param_value
                    }
                })
            }

            /**
             * 生成require路径
             * @param  {[type]} path 请求路径
             * @return {[type]}      app和组件的请求地址
             */
            function requirePath(path) {
                let paths = path.split('/'),
                    result = [],
                    segment = '/',
                    rootPath = 'dist/js/apps/',
                    compPath = 'comps/',
                    targetPath = 'index';

                //生成app的path
                result[0] = rootPath + paths[0] + segment + targetPath;

                //存在下级菜单
                if(paths.length > 1) {
                    
                    //生成组件路径
                    result[1] = rootPath + paths.slice(0, -1).map(function(p) { return p + segment +compPath }).join('')
                        + comp + segment + targetPath;
                }

                return result
            }

           

            if(app === 'home' || app === 'error') {

                if(this.globalApp == app && this.globalComp == comp) {
                
                    //刷新视图
                    //先将视图切换为空白视图
                    //之后在切回原始图，实现刷新效果
                    updateView.call(this, app, path, 'view-bak', params)

                    this.$nextTick(() => {
                        updateView.call(this, app, path, comp, params)
                    }, 0)

                } else {
                    updateView.call(this, app, path, comp, params)
                }
            } else {

                let _requirePath = requirePath(path);

                //加载资源
                require(_requirePath, function(appComp, component) {
                    //创建app组件
                    Vue.component(app, appComp.default);
                    if(component) {

                        //创建子组件
                        Vue.component(comp, component.default);
                    }

                    if(this.globalApp == app && this.globalComp == comp) {
                    
                        //刷新视图
                        //先将视图切换为空白视图
                        //之后在切回原始图，实现刷新效果
                        updateView.call(this, app, path, 'view-bak', params)

                        this.$nextTick(() => {
                            updateView.call(this, app, path, comp, params)
                        }, 0)

                    } else {
                        updateView.call(this, app, path, comp, params)
                    }
                }.bind(this));
            }
        };

        /**
         * 错误处理路由
         * @return {[type]} [description]
         */
        function errorRouter (ctx) {
            
            //跳转到错误页面
            let path = ctx.path,
                querystring = ctx.querystring;
            
            //处理path，获取当前组件
            let comp = path.split('/').slice(-1).toString();

            updateView.call(this, 'error', path, comp)
        }

        /**
         * 路由判断前置函数
         * 地址发生变换时，进行权限验证，通过则跳转，失败则返回错误页面
         * @param  {[type]} pathname [description]
         * @return {[type]}      [description]
         */
        function __before(pathname) {
            let permission_len = permissions.length;

            if(permission_len == 0) return 200;

            for(var i=0; i<permission_len; i++) {
                let keys = [],//暂不使用
                    pathReg = permissions[i].path,
                    pathAuthority = permissions[i].authority,
                    result = pathtoregexp(pathReg, keys);
                
                //权限验证
                if(result.test(pathname)) {
                    if(pathAuthority) return 200
                    return 403
                }
            }
            
            return 404
        }

        /**
         * pagejs初始化
         * @param  {[type]} baseUrl  [description]
         * @param  {[type]} errorUrl  [description]
         * @return {[type]}          [description]
         */
        function __init(baseUrl, errorUrl) {
            page.base(baseUrl);

            //首页
            page('/', () => {
                page.redirect(baseUrl + '/home' )
            });

            //错误页面处理
            page('/' + errorUrl + '/:code', errorRouter.bind(this));

            //app切换
            page('/:app/:any*', (ctx, next) => {
                
                //先过权限验证
                let state = __before(ctx.pathname)

                if(state == 200) {
                    
                    //验证通过，继续执行
                    next() 
                } else {
                    
                    //失败，跳转到错误页面
                    page.redirect('/' + errorUrl + '/' + state)
                }
            }, appRouter.bind(this));

        }

        // 2. 权限控制指令
        Vue.directive('router-authority', {
            update: function (pathname) {
                if(pathname && __before(pathname) !== 200) {
                     
                     //绑定无效地址，则删除
                     $(this.el).remove()
                }
            }
        })

        /**
         * 路由工具函数
         * @return {[type]} [description]
         */
        Vue.prototype.$router = function(url) {

            var self = this.$root;

            function router_page() {

            }

            /**
             * ajax获取权限信息
             * @return {[type]} [description]
             */
            router_page.authority = function(authorityUrl) {
                var dtd = $.Deferred();

                $.ajax({
                    url: '/app/permissions',
                    success: function(data) {
                        permissions = data;
                        dtd.resolve(data)
                    }
                });

                return dtd.promise();
            }

            /**
             * 页面跳转
             * 更新堆栈
             * @param  {[type]} target [description]
             * @return {[type]} [description]
             */
            router_page.show = function(target) {
                page.show(target)
                return router_page
            }

            /**
             * 页面跳转
             * 不更新history堆栈,无法完成回退操作
             * @param  {[type]} target [description]
             * @return {[type]}        [description]
             */
            router_page.redirect = function(target) {
                page.redirect(target)
                return router_page
            }

            /**
             * 启动pagejs监控
             * @return {[type]} [description]
             */
            router_page.start = function() {
                __init.call(self, defaultConf.baseUrl, defaultConf.errorUrl)

                page.start()
            }

            if(typeof url !== 'undefined') {
                router_page.show(url)
            }

            return router_page
        }
    }
}


export default router

