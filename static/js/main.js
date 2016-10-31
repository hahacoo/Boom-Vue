'use strict';
require.config({
	
    paths: {
        bases:  'dist/js/bases',
        components: 'dist/js/components',
        core: 'dist/js/core',
        module: 'dist/module',
        doc: 'module/js',
        highcharts: 'bower_components/highcharts/highcharts'
    },
    
    shim: {
        'jquery': {
            exports: '$'
        },
        'highcharts': {
            deps: ['jquery'],
            exports : "Highcharts"
        },
    },

    packages: [{
        name: 'd3',
        location: './bower_components/d3',
        main: 'd3'
    }, {
        name: 'jquery',
        location: './bower_components/jquery',
        main: 'dist/jquery'
    }, {
        name: 'jquery-ui',
        location: './bower_components/jquery-ui',
        main: 'jquery-ui.min'
    }, {
        name: 'jstree',
        location: './bower_components/jstree',
        main: 'dist/jstree.min'
    },{
        name: 'lodash',
        location: './bower_components/lodash',
        main: 'lodash'
    }, {
        name: 'page',
        location: './bower_components/page',
        main: 'page'
    }, {
        name: 'vue',
        location: './bower_components/vue/dist',
        main: 'vue.min'
    }, {
        name: 'vuex',
        location: './bower_components/vuex/dist',
        main: 'vuex.min'
    }, {
        name: 'css',
        location: './bower_components/require-css',
        main: 'css.min'
    }, {
        name: 'text',
        location: './bower_components/text',
        main: 'text'
    }, {
        name: 'vue-strap',
        location: './bower_components/vue-strap',
        main: 'dist/vue-strap'
    }, {
        name: 'moment',
        location: './bower_components/moment',
        main: 'moment'
    },{
        name: 'noty',
        location: './bower_components/noty/',
        main: 'js/noty/packaged/jquery.noty.packaged.min'
    },{
        name: 'Switchery',
        location: './bower_components/switchery',
        main: 'dist/switchery'
    },{
        name: 'pathtoregexp',
        location: './bower_components/pathtoregexp',
        main: 'pathtoregexp'
    },{
        name: 'highlightjs',
        location: './bower_components/highlightjs',
        main: 'highlight.pack.js'
    }]
});

require(['dist/js/apps/index']);