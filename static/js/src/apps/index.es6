/**
 * App入口
 */
import template from './view'

import appHeader from 'bases/components/header/index'

import Vue from 'vue';

let app = new Vue({

	el: '.boom-app',

	template,

	replace: false,

	components: {
		appHeader
	}
});

export default app;
