var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var eproxy = require('express-http-proxy');

var routes = require('./routes/index');
var datas = require('./routes/datas');

var app = express();

var yaml = require('js-yaml');
var fs  = require('fs');
//读取配置信息
var _config = require('./loadConfig')(path.join(__dirname, '_config.yml'))

// 设置模板目录
app.set('views', path.join(__dirname, _config.views || 'views'));
//设置模板引擎，默认为jade，替换为ejs
app.set('view engine', _config.engine || 'jade');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

// 以下注册均为应用级中间件
//注册静态资源
app.use('/static', express.static(path.join(__dirname, 'static')));
// 注册日志中间件
app.use(logger('dev'));
// 注册请求体解析中间件
app.use(bodyParser.json());
//采用qs解析字符串，比querstring要好
app.use(bodyParser.urlencoded({ extended: true }));
// 注册cookie中间件
app.use(cookieParser());

//中间件和路由的匹配原则不同，使用根路径会对所有请求进行隐射
app.get("/", function(req, res, next) {
  res.redirect('/boom');
})

//注册路由中间件
app.use('/boom', routes);

//注册代理转发中间件
var proxy = _config.proxy,
    baseUrl = proxy.baseUrl || '/app'

if(proxy && proxy.enable && proxy.target) {

  var rules = proxy.rules || [],
      rulePaths = rules.map(function(rule) { 

          return baseUrl + rule
      })

  app.use(rulePaths.length === 0 ? baseUrl : rulePaths, eproxy(proxy.target, {

      forwardPath: function(req, res) {

          return req._parsedUrl.path
      }
  }))
}

//数据接口路由
app.use(baseUrl, datas(proxy.baseUrl))

// 注册错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
