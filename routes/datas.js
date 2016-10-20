/**
 * 通过mockjs快速生成测试数据
 * @type {[type]}
 */
var express = require('express');
var Mock = require('mockjs');
var router = express.Router();

//自定义请求映射关系
function localDatas(baseUrl) {
    //var pathToRegexp = require('path-to-regexp');
    // router.route('/')
    //  .all(function(req, res, next) {
    //      regexp = pathToRegexp(baseUrl, []);
    //         var result  = regexp.exec(req.originalUrl);
    //      res.redirect('/static/data/' + result[1] + '/data.json')
    //  })
    //  

    /**
     * mock语法
     *  https://github.com/nuysoft/Mock/wiki/Syntax-Specification
     *  'name|min-max': value
     *  'name|count': value
     *  'name|min-max.dmin-dmax': value
     *  'name|min-max.dcount': value
     *  'name|count.dmin-dmax': value
     *  'name|count.dcount': value
     *  'name|+step': value
     */

    //返回一个obj
    router.route('/mock/obj')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                message: 'success'
            }))
        })

    //返回一个数组
    router.route('/mock/array')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                data: {
                    'list|1-10': [{
                        'id|+1': 1
                    }]
                }
            }))
        })

    //权限控制
    router.route('/permissions')
        .all(function(req, res, next) {
            res.json([{
                "path": "/sti/:any*",
                "authority": true
            }])
        })

    return router
}

module.exports = localDatas;