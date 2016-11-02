/**
 * Created by liushuangshuang on 2016/11/2.
 *
 * 1.support 24 hours, 1 week and 1 month
 * 2.support horizontal and vertical layout
 * 3.support "top", "bottom", "left", "right" directions
 * 4.support backgroundColor, tickColor and padding
 * 5.support brush fill, stroke, stroke-width, fill-opacity attribute
 */

import template from './view.html'
import * as d3 from 'd3'
import moment from "moment"

export default {

    template,

    props: {
        // support "1d"(24小时), "7d"(一周), "1M"(一个月)
        "type": {
            default: "1d"
        },
        // support "horizontal" and "vertical" layout
        "horizontal": {
            default: true
        },
        /**
         * when "horizontal", support "top" and "bottom"(default)
         * when "vertical", support "left" and "right"(default)
         */ 
        "direction": {
            default: function() {
                return this.horizontal ? "bottom" : "right"
            }
        },
        // svg background color, default "transparent"
        "backgroundColor": {
            default: "transparent"
        },
        // axis tick color, default "#000"(black)
        "tickColor": {
            default: "#000"
        },
        paddingTop: {
            default: function() {
                return this.horizontal ? (this.direction === "top" ? 15 : 0) : 15;
            }
        },
        paddingBottom: {
            default: function() {
                return this.horizontal ? (this.direction === "top" ? 0 : 15) : 15;
            }
        },
        paddingLeft: {
            default: function() {
                return this.horizontal ? 15 : (this.direction === "left" ? 40 : 0);
            }
        },
        paddingRight: {
            default: function() {
                return this.horizontal ? 15 : (this.direction === "left" ? 0 : 40);
            }
        },
        brushFill: {
            default: "#777"
        },
        brushStroke: {
            default: "#fff"
        },
        brushOpacity: {
            default: "0.3"
        },
        brushStrokeWidth: {
            default: 1
        }
    },

    watch: {
        "type": function(val, oldVal) {
            if (val === oldVal) return;
            this.drawAxis();
        }
    },

    created: function() {
        this.monthIndex = -1;
        this.dayIndex = -1;
    },

    ready: function() {
        this.init();
    },

    methods: {
        /**
         * tick intervals function
         *
         * @return {Function} tick intervals function
         */
        ticks: function(d, i) {
            switch (this.type) {
                case "7d":
                    return d3.timeHour.every(3);

                case "1M":
                    return d3.timeHour.every(12);

                case "1d":
                default:
                    return d3.timeMinute.every(30);
            }
        },

        /** 
         * change tick default length to generate elegant appearance
         *
         * @param {Date} d, the tick date
         * @param {DOMObject} node, the current tick node
         */
        changeTickLength: function(d, node) {
            let attrName = this.horizontal ? "y2" : "x2";
            let line = d3.select(node).select("line");
            let length = line.attr(attrName) / 2;
            let hour = d.getHours();
            let minute = d.getMinutes();

            switch (this.type) {
                case "1d":
                    if (minute === 0) return;
                    break;

                case "7d":
                    if (hour === 0 || hour === 12) return;
                    break;

                case "1M": 
                    if (hour === 0) return;
                    break;
            }
            line.attr(attrName, length);
        },

        /**
         * draw Axis then init or change type 
         */
        drawAxis: function() {
            let date = this.domainRange(this.type);
            let self = this;
            this.scale.domain(date);

            this.axis.ticks(this.ticks())
                .tickFormat(this.tickFormat);

            this.axisArea.call(this.axis);
            this.axisArea.selectAll("g")
                .each(function(d) {
                    self.changeTickLength(d, this);
                });
            this.brush.move(this.brushArea, null);
            this.setAxisTickColor();
            this.setBrushStyle();
        },

        setBrushStyle: function() {
            this.brushArea.select(".selection")
                .attr("fill", this.brushFill)
                .attr("stroke", this.brushStroke)
                .attr("fill-opacity", this.brushOpacity)
                .attr("stroke-width", this.brushStrokeWidth);
        },

        /**
         * axis tick format function
         * 
         * @param {Date} d in the tick position
         * @param {Integer} i, the tick index
         * @return {String} the formatted string
         */
        tickFormat: function(d, i) {
            let format;
            let hour = d.getHours();
            let minute = d.getMinutes();
            let day = d.getDate();

            switch (this.type) {
                case "7d":
                    if (hour !== 0) return;
                    format = "%m/%d";
                    break;

                case "1M":
                    if (i === 0) this.monthIndex = -1;
                    if (hour !== 0) return;
                    if (this.monthIndex === -1) this.monthIndex = i;
                    if (i % 4 !== this.monthIndex) return;
                    format = "%m/%d";
                    break;
                    
                case "1d":
                    if (i === 0) this.dayIndex = -1;
                    if (minute !== 0) return;
                    if (this.dayIndex === -1) this.dayIndex = i;
                    if (i % 4 !== this.dayIndex) return;
                    format = "%H:%M";
                    break;
            }

            return d3.scaleTime().tickFormat(null, format)(d);
        },

        /**
         * trigger when this.horizontal is true,
         * init horizontal layout
         * 
         * @param {DOMObject} svg container
         */
        initHorizontal: function(svg) {
            let {innerWidth, innerHeight, height, left, top, bottom} = this.sizeCache;
            let direction = this.direction;

            this.scale = d3.scaleTime().range([0, innerWidth]);

            this.brush = d3.brushX()
                .extent([[0, 0], [innerWidth, innerHeight + 1]])
                .on('end', this.brushendHandler);

            let method = "axisBottom";
            let transTop = top;
            if (direction === "top") {
                method = "axisTop";
                transTop = height - bottom - 1;
            }
            this.axis = d3[method](this.scale)
                .tickSizeInner(innerHeight)
                .tickSizeOuter(0);

            this.axisArea = svg.append("g")
                .style("transform", "translate(" + left + "px, " + transTop + "px)");

            this.brushArea = svg.append("g")
                .style("transform", "translate(" + left + "px, " + (top - 1) + "px)")
                .call(this.brush);
            this.brushArea.selectAll("rect")
                .attr("height", innerHeight);
        },

        /**
         * trigger when this.horizontal is false,
         * init vertical layout
         * 
         * @param {DOMObject} svg container
         */
        initVertical: function(svg) {
            let {innerWidth, innerHeight, width, left, top, right} = this.sizeCache;
            let direction = this.direction;

            this.scale = d3.scaleTime().range([0, innerHeight]);
            this.brush = d3.brushY()
                .extent([[0, 0], [innerWidth + 1, innerHeight]])
                .on('end', this.brushendHandler);

            let method = "axisRight";
            let transLeft = left;
            if (direction === "left") {
                method = "axisLeft";
                transLeft = width - right - 1;
            }
            this.axis = d3[method](this.scale)
                .tickSizeInner(innerWidth)
                .tickSizeOuter(0);

            this.axisArea = svg.append("g")
                .style("transform", "translate(" + transLeft + "px, " + top + "px)");

            this.brushArea = svg.append("g")
                .style("transform", "translate(" + (left - 1) + "px, " + top + "px)")
                .call(this.brush);
            this.brushArea.selectAll("rect")
                .attr("width", innerWidth);
        },

        /**
         * init timeline
         */
        init: function() {
            let container = d3.select(this.$el);
            let width = +container.style("width").slice(0, -2);
            let height = +container.style("height").slice(0, -2);
            let top = this.paddingTop;
            let bottom = this.paddingBottom;
            let left = this.paddingLeft;
            let right = this.paddingRight;
            let innerWidth = width - left - right;
            let innerHeight = height - top - bottom;
            let horizontal = this.horizontal;
            let direction = this.direction;
            this.sizeCache = {height, width, top, left, right, bottom, innerHeight, innerWidth};

            let svg = container.append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", this.backgroundColor);

            this.horizontal ? this.initHorizontal(svg) : this.initVertical(svg);
            this.drawAxis();
        },

        setAxisTickColor: function() {
            let {axisArea, tickColor} = this;
            axisArea.selectAll("path")
                .attr("stroke", tickColor);
            axisArea.selectAll("line")
                .attr("stroke", tickColor);
            axisArea.selectAll("text")
                .attr("fill", tickColor);
        },

        brushendHandler: function() {
            let selection = d3.event.selection;
            
            if (selection) {
                let invert = this.scale.invert;
                selection = selection.map(val => {return invert(val).getTime();})
            }
            this.$dispatch("STI.highlight.range", selection);
            console.log(selection);
        },

        /**
         * get axis domain range
         *
         * @param {String} type, see this.type
         * @return {Array} [starttime, endtime]
         */
        domainRange: function(type) {
            let starttime = moment();
            let endtime = starttime.clone();

            switch (type) {
                case "7d":
                    starttime.subtract(7, "days");
                    break;

                case "1M":
                    starttime.subtract(1, "months");
                    break;

                case "1d":
                default: 
                    starttime.subtract(1, "days");
                    break;
            }

            return [starttime.valueOf(), endtime.valueOf()];
        }
    }
}