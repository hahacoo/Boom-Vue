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


    router.route('/mock/obj2')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 2003,
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

    //权限控制
    router.route('/permissions2')
        .all(function(req, res, next) {
            res.json([{
                "path": "/sti/:any*",
                "authority": true
            }])
        })

    //module chart related interface
    router.route('/mock/chart/pie')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                data: [{
                    "name": "\u4fe1\u606f", 
                    "y": 1089
                }, {
                    "name": "\u4f4e\u5371", 
                    "y": 500
                }, {
                    "name": "\u4e2d\u5371", 
                    "y": 150
                }, {
                    "name": "\u9ad8\u5371", 
                    "y": 14
                }, {
                    "name": "\u5371\u6025", 
                    "y": 854
                }]
            }));
        })

    router.route('/mock/chart/bar')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                data: [{
                    "key": "\u53d1\u73b0IP\u88ab\u67d0\u56e2\u4f19\u63a7\u52363003", 
                    "value": 205
                }, {
                    "key": "\u53d1\u73b0IP\u88ab\u67d0\u56e2\u4f19\u63a7\u52363004", 
                    "value": 205
                }, {
                    "key": "\u53d1\u73b0IP\u88ab\u67d0\u56e2\u4f19\u63a7\u52363007", 
                    "value": 204
                }, {
                    "key": "\u53d1\u73b0IP\u88ab\u67d0\u56e2\u4f19\u63a7\u52363008", 
                    "value": 204
                }, {
                    "key": "\u5916\u8fde-\u5230\u5185\u90e8\u4e3b\u673a\u901a\u8baf\u7684\u591a\u4e2a\u9ad8\u5371\u9669\u7ea7\u522b\u4e8b\u4ef6", 
                    "value": 16
                }, {
                    "key": "\u53d1\u73b0IP\u88ab\u67d0\u56e2\u4f19\u63a7\u5236", 
                    "value": 4
                }, {
                    "key": "\u666e\u901a\u8fdc\u63a7\u6728\u9a6c\u6d3b\u52a8\u4e8b\u4ef6", 
                    "value": 3
                }, {
                    "key": "\u6076\u610f\u8f6f\u4ef6\u5220\u9664\u5931\u8d25", 
                    "value": 2
                }, {
                    "key": "\u6e90IP\u88abDarkHotel APT\u56e2\u4f19\u63a7\u5236", 
                    "value": 2
                }, {
                    "key": "\u6e90IP\u88ab\u8fdc\u63a7\u6728\u9a6c\u63a7\u5236", 
                    "value": 2
                }]
            }));
        })

    router.route('/mock/chart/top10')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                data: [{
                    "data": [{
                        "doc_count": 544, 
                        "key": "0.0.0.0.0.0.0.000.0.0.00.00.0.0.0..00.00.0.."
                    }, {
                        "doc_count": 10, 
                        "key": "10.16.13.14"
                    }, {
                        "doc_count": 10, 
                        "key": "10.16.0.222"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.11"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.61.53"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.26.93"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.8"
                    }, {
                        "doc_count": 159, 
                        "key": "173.0.0.15"
                    }, {
                        "doc_count": 157, 
                        "key": "192.168.11.217"
                    }, {
                        "doc_count": 95, 
                        "key": "192.168.11.100"
                    }], 
                    "series": "\u4fe1\u606f"
                }, {
                    "data": [{
                        "doc_count": 100, 
                        "key": "0.0.0.0.0.0.0.000.0.0.00.00.0.0.0..00.00.0.."
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.13.14"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.0.222"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.11"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.61.53"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.26.93"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.8"
                    }, {
                        "doc_count": 0, 
                        "key": "173.0.0.15"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.217"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.100"
                    }], 
                    "series": "\u4f4e\u5371"
                }, {
                    "data": [{
                        "doc_count": 0, 
                        "key": "0.0.0.0.0.0.0.000.0.0.00.00.0.0.0..00.00.0.."
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.13.14"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.0.222"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.11"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.61.53"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.26.93"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.8"
                    }, {
                        "doc_count": 0, 
                        "key": "173.0.0.15"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.217"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.100"
                    }], 
                    "series": "\u4e2d\u5371"
                }, {
                    "data": [{
                        "doc_count": 0, 
                        "key": "0.0.0.0.0.0.0.000.0.0.00.00.0.0.0..00.00.0.."
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.13.14"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.0.222"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.11"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.61.53"
                    }, {
                        "doc_count": 0, 
                        "key": "10.16.26.93"
                    }, {
                        "doc_count": 0, 
                        "key": "10.18.219.8"
                    }, {
                        "doc_count": 0, 
                        "key": "173.0.0.15"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.217"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.100"
                    }], 
                    "series": "\u9ad8\u5371"
                }, {
                    "data": [{
                        "doc_count": 0, 
                        "key": "0.0.0.0.0.0.0.000.0.0.00.00.0.0.0..00.00.0.."
                    }, {
                        "doc_count": 348, 
                        "key": "10.16.13.14"
                    }, {
                        "doc_count": 315, 
                        "key": "10.16.0.222"
                    }, {
                        "doc_count": 217, 
                        "key": "10.18.219.11"
                    }, {
                        "doc_count": 217, 
                        "key": "10.18.61.53"
                    }, {
                        "doc_count": 215, 
                        "key": "10.16.26.93"
                    }, {
                        "doc_count": 208, 
                        "key": "10.18.219.8"
                    }, {
                        "doc_count": 0, 
                        "key": "173.0.0.15"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.217"
                    }, {
                        "doc_count": 0, 
                        "key": "192.168.11.100"
                    }], 
                    "series": "\u5371\u6025"
                }]
            }));
        })

    return router
}

module.exports = localDatas;