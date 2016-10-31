/**
 * Created by liushuangshuang on 2016/10/25
 * chart depend on highcharts
 */

import $ from "jquery";
import "highcharts";

import template from "./view.html";

export default {
	template,

	props: {
		/**
		 * props can not contain all configuration provided by highcharts
		 * setCustomOptions provide hook to configure props not included here 
		 */  
		setCustomOptions: {},
		// support bar, line, column and pie
		chartType: {
			default: "line"
		},
		title: {
			default: function() {
				return null;
			}
		},
		backgroundColor: {
			default: function() {
				return "rgba(0, 0, 0, 0)"
			}
		},
		allowDecimals: {
			default: function() {
				return true;
			}
		},
		tooltipFormatter: {},
		/**
		 * set chart series default colors
		 * default to ngsoc small screen colors
		 * #2191D9(info), "#8BC848"(low-risk), "#F8C157"(medium-risk), 
		 * "#FE9D5C"(high-risk), "#FE7C5C"(critical)
		 */
		colors: {
			default: function() {
				return ["#2191D9", "#8BC848", "#F8C157", "#FE9D5C", "#FE7C5C"]
			}
		},
		stacking: {},

		/**
		 * type=pie related props
		 */
		pieInnerSize: {
			default: "80%"
		},

		/**
		 * yAxis related props
		 */
		yAxisTitle: {
			default: function() {
				return "";
			}
		},

		/**
		 * datalabels related props
		 */
		dataLabelsFormat: {
			default: "{y}"
		},
		dataLabelsFormatter: {},
		dataLabelsColor: {},
		dataLabelsEnabled: {
			default: false
		},
		dataLabelsStyle: {},

		/**
		 * xAxis related props
		 * @xAxisType allow "datetime"(todo), "category", "linear" and "logarithmic"
		 * @xAxisCategories type array
		 */
		xAxisType: {
			default: function() {
				return "category";
			}
		},
		xAxisCategories: {},
		xAxisTickLength: {
			default: 10
		},
		xAxisPlotBands: {},
		xAxisLabelsStyle: {},

		/**
		 * legend related props
		 * @legendAlign allow "left", "center" and "right", default "center"
		 * @legendLayout allow "horizontal" and "vertical", default "horizontal"
		 * @legendVerticalAlign allow "top", "middle" and "bottom", default "bottom"
		 */
		legendAlign: {
			default: function() {
				return this.chartType === "pie" ? "right" : "center";
			}
		},
		legendLayout: {
			default: function() {
				return this.chartType === "pie" ? "vertical" : "horizontal";
			}
		},
		legendVerticalAlign: {
			default: function() {
				return this.chartType === "pie" ? "middle" : "bottom";
			}
		},
		legendEnabled: {
			default: true
		}
	},

	created() {
		this.options = {};
		this.chart = null;
	},

	ready() {
		this.initChart();
	},

	events: {
		"STI.chart.initSeries": "initSeries",

		"STI.chart.redraw": "redraw",

		"STI.chart.setXAxisCategory": "setXAxisCategoryfunction",
	},

	methods: {
		initOptions() {
			let options = this.options = {
				lang: {noData: "暂无数据"},
				chart: {
					type: this.chartType,
					backgroundColor: this.backgroundColor
				},
				colors: this.colors,
				title: {
					text: this.title
				},
				credits: {
					enabled: false
				},
				plotOptions: {
					series: {
						dataLabels: {
							color: this.dataLabelsColor,
							formatter: this.dataLabelsFormatter,
							enabled: this.dataLabelsEnabled,
							format: this.dataLabelsFormat
						},
						stacking: this.stacking
					},
					pie: {
						innerSize: this.pieInnerSize,
						showInLegend: true
					}
				},
				xAxis: {
					type: this.xAxisType,
					tickLength: this.xAxistickLength,
					categories: this.xAxisCategories
				},
				yAxis: {
					title: {
						text: this.yAxisTitle
					},
					allowDecimals: this.allowDecimals
				},
				tooltip: {
					formatter: this.tooltipFormatter
				},
				legend: {
					align: this.legendAlign,
					layout: this.legendLayout,
					verticalAlign: this.legendVerticalAlign,
					enabled: this.legendEnabled
				}
			}

			if (this.dataLabelsStyle) {
				options.plotOptions.series.dataLabels.style = this.dataLabelsStyle;
			}
			if (this.xAxisPlotBands) {
				options.xAxis.plotBands = this.xAxisPlotBands;
			}
			if (this.xAxisLabelsStyle) {
				options.xAxis.style = this.xAxisLabelsStyle;
			}
			this.setCustomOptions && this.setCustomOptions(options);
		},

		initChart() {
			let container = $(this.$el);
			this.initOptions();
			container.highcharts(this.options);
			this.chart = container.highcharts();
		},

		reflow() {
			this.chart.reflow();
		},

		redraw() {
			this.chart.redraw();
		},

		changeTooltip: function(fn) {
			this.chart.tooltip.options.formatter = fn;
		},

		setXAxisCategory: function(category) {
            this.chart.xAxis[0].setCategories(category); 
        },

		changeYAxisText: function(text) {
			this.chart.yAxis[0].setTitle({text});
		},

		initSeries: function(series, single=true) {
			let chart = this.chart;
			if (single) {
				chart.addSeries(series, false, false);
			} else {
				series.forEach(val => {
					chart.addSeries(val, false, false);
				});
			}
		},

		updateSeries: function(seriesDatas, single=true) {
			let series = this.chart.series;
			if (single) {
				series[0].setData(seriesDatas, false, false, true);
			} else {
				seriesDatas.forEach((val, index) => {
					series[index].setData(val, false, false, true);
				});
			}
		}
	}
}