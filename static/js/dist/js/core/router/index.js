define(['exports', 'jquery', 'page', 'pathtoregexp', 'vue'], function (exports, _jquery, _page, _pathtoregexp, _vue) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _jquery2 = _interopRequireDefault(_jquery);

    var _page2 = _interopRequireDefault(_page);

    var _pathtoregexp2 = _interopRequireDefault(_pathtoregexp);

    var _vue2 = _interopRequireDefault(_vue);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * 基于vuex、pathtoregexp的路由控制器
     * 用pathtoregexp的完成地址匹配
     * 用vuex进行状态管理
     * by zhangdi
     */
    var router = {

        install: function install(Vue, options) {

            /**
             * 默认配置
             * @type {Object}
             */
            var defaultConf = {
                baseUrl: '/home',
                errorUrl: 'error'
            };

            /**
             * 权限信息
             * @type {Object}
             */
            var permissions = [];

            if (options) {
                if (options.baseUrl && typeof options.baseUrl === 'string') {
                    defaultConf.baseUrl = options.baseUrl;
                }

                if (options.errorUrl && typeof options.errorUrl === 'string') {
                    defaultConf.errorUrl = options.errorUrl;
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
            function updateView() {
                var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var comp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                this.updateApp(app);
                this.updatePath(path);
                this.updateComp(comp);
                this.updateParams(params);
            }

            /**
             * app切换路由
             * @param  {[type]} ctx [description]
             * @return {[type]}     [description]
             */
            function appRouter(ctx) {
                var _this = this;

                var app = ctx.params.app,
                    any = ctx.params.any,
                    path = ctx.path.replace(/^\/|\/$/g, ''),
                    querystring = ctx.querystring,
                    params = {};

                //处理path，获取当前组件
                var paths = path.split('/'),
                    comp = paths.slice(-1).toString();

                if (querystring) {
                    (function () {

                        //处理请求参数
                        var raw_tostring = Object.prototype.toString;

                        //拆分参数项
                        var querys = querystring.split('&');

                        querys.forEach(function (query) {
                            var queryObj = query.split('='),
                                param_value = queryObj[1];

                            if (params.hasOwnProperty(queryObj[0])) {

                                //存在多个相同参数，合并为数组
                                var value = params[queryObj[0]];

                                if (raw_tostring.call(value) === '[object Array]') {
                                    value.push(param_value);
                                } else {
                                    value = [value, param_value];
                                }
                                params[queryObj[0]] = value;
                            } else {

                                //创建参数对象
                                params[queryObj[0]] = param_value;
                            }
                        });
                    })();
                }

                /**
                 * 生成require路径
                 * @param  {[type]} path 请求路径
                 * @return {[type]}      app和组件的请求地址
                 */
                function requirePath(path) {
                    var paths = path.split('/'),
                        result = [],
                        segment = '/',
                        rootPath = 'dist/js/apps/',
                        compPath = 'comps/',
                        targetPath = 'index';

                    //生成app的path
                    result[0] = rootPath + paths[0] + segment + targetPath;

                    //存在下级菜单
                    if (paths.length > 1) {

                        //生成组件路径
                        result[1] = rootPath + paths.slice(0, -1).map(function (p) {
                            return p + segment + compPath;
                        }).join('') + comp + segment + targetPath;
                    }

                    return result;
                }

                if (app === 'home' || app === 'error') {

                    if (this.globalApp == app && this.globalComp == comp) {

                        //刷新视图
                        //先将视图切换为空白视图
                        //之后在切回原始图，实现刷新效果
                        updateView.call(this, app, path, 'view-bak', params);

                        this.$nextTick(function () {
                            updateView.call(_this, app, path, comp, params);
                        }, 0);
                    } else {
                        updateView.call(this, app, path, comp, params);
                    }
                } else {

                    var _requirePath = requirePath(path);

                    //加载资源
                    require(_requirePath, function (appComp, component) {
                        var _this2 = this;

                        //创建app组件
                        Vue.component(app, appComp.default);
                        if (component) {

                            //创建子组件
                            Vue.component(comp, component.default);
                        }

                        if (this.globalApp == app && this.globalComp == comp) {

                            //刷新视图
                            //先将视图切换为空白视图
                            //之后在切回原始图，实现刷新效果
                            updateView.call(this, app, path, 'view-bak', params);

                            this.$nextTick(function () {
                                updateView.call(_this2, app, path, comp, params);
                            }, 0);
                        } else {
                            updateView.call(this, app, path, comp, params);
                        }
                    }.bind(this));
                }
            };

            /**
             * 错误处理路由
             * @return {[type]} [description]
             */
            function errorRouter(ctx) {

                //跳转到错误页面
                var path = ctx.path,
                    querystring = ctx.querystring;

                //处理path，获取当前组件
                var comp = path.split('/').slice(-1).toString();

                updateView.call(this, 'error', path, comp);
            }

            /**
             * 路由判断前置函数
             * 地址发生变换时，进行权限验证，通过则跳转，失败则返回错误页面
             * @param  {[type]} pathname [description]
             * @return {[type]}      [description]
             */
            function __before(pathname) {
                var permission_len = permissions.length;

                if (permission_len == 0) return 200;

                for (var i = 0; i < permission_len; i++) {
                    var keys = [],
                        //暂不使用
                    pathReg = permissions[i].path,
                        pathAuthority = permissions[i].authority,
                        result = (0, _pathtoregexp2.default)(pathReg, keys);

                    //权限验证
                    if (result.test(pathname)) {
                        if (pathAuthority) return 200;
                        return 403;
                    }
                }

                return 404;
            }

            /**
             * pagejs初始化
             * @param  {[type]} baseUrl  [description]
             * @param  {[type]} errorUrl  [description]
             * @return {[type]}          [description]
             */
            function __init(baseUrl, errorUrl) {
                _page2.default.base(baseUrl);

                //首页
                (0, _page2.default)('/', function () {
                    _page2.default.redirect(baseUrl + '/home');
                });

                //错误页面处理
                (0, _page2.default)('/' + errorUrl + '/:code', errorRouter.bind(this));

                //app切换
                (0, _page2.default)('/:app/:any*', function (ctx, next) {

                    //先过权限验证
                    var state = __before(ctx.pathname);

                    if (state == 200) {

                        //验证通过，继续执行
                        next();
                    } else {

                        //失败，跳转到错误页面
                        _page2.default.redirect('/' + errorUrl + '/' + state);
                    }
                }, appRouter.bind(this));
            }

            // 2. 权限控制指令
            Vue.directive('router-authority', {
                update: function update(pathname) {
                    if (pathname && __before(pathname) !== 200) {

                        //绑定无效地址，则删除
                        (0, _jquery2.default)(this.el).remove();
                    }
                }
            });

            /**
             * 路由工具函数
             * @return {[type]} [description]
             */
            Vue.prototype.$router = function (url) {

                var self = this.$root;

                function router_page() {}

                /**
                 * ajax获取权限信息
                 * @return {[type]} [description]
                 */
                router_page.authority = function (authorityUrl) {
                    var dtd = _jquery2.default.Deferred();

                    _jquery2.default.ajax({
                        url: '/app/permissions',
                        success: function success(data) {
                            permissions = data;
                            dtd.resolve(data);
                        }
                    });

                    return dtd.promise();
                };

                /**
                 * 页面跳转
                 * 更新堆栈
                 * @param  {[type]} target [description]
                 * @return {[type]} [description]
                 */
                router_page.show = function (target) {
                    _page2.default.show(target);
                    return router_page;
                };

                /**
                 * 页面跳转
                 * 不更新history堆栈,无法完成回退操作
                 * @param  {[type]} target [description]
                 * @return {[type]}        [description]
                 */
                router_page.redirect = function (target) {
                    _page2.default.redirect(target);
                    return router_page;
                };

                /**
                 * 启动pagejs监控
                 * @return {[type]} [description]
                 */
                router_page.start = function () {
                    __init.call(self, defaultConf.baseUrl, defaultConf.errorUrl);

                    _page2.default.start();
                };

                if (typeof url !== 'undefined') {
                    router_page.show(url);
                }

                return router_page;
            };
        }
    };

    exports.default = router;
});