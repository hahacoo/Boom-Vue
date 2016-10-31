/**
 * map
 * by: baiquanwei(baiquanwei@b.360.cn)
 */
import * as d3 from 'd3';
import $ from 'jquery';
import template from './view.html'
export default {

    template,

    props: ['width', 'height'],

    data: function () {
        return {
        }
    },

    created: function() {
    },

    ready: function () {
        this.init();
    },

    events: {
    },

    methods: {
        init: function() {
            if(!d3 || +d3.version[0] < 4) {
                throw new Error('d3 版本须不小于第四版');
            }
            var self = this;
            // 画布宽高不小于200
            self.width = +self.width > 0 ? +self.width : 200;
            self.height = +self.height > 0 ? +self.height : 200;
            self.svg = d3.select(self.$el).select("svg");
            // 地图投影
            self.drillProjection = d3.geoEquirectangular();
            self.drillProjection.translate([self.width/2, self.height/2]);
            // 地图path生成器
            self.drillPath = d3.geoPath().projection(self.drillProjection).pointRadius(5);
            // 地图经纬度生成器
            self.graticule = d3.geoGraticule();

            self.svg.style('width', self.width);
            self.svg.style('height', self.height);
            // 初始化生成世界地图
            self.rendMap('/static/data/mapData/drill_world.json');
        },

        rendMap: function(url, callback) {
            var self = this;
            d3.json(url,function(error,data) {
                // 清除已存在dom结构
                self.svg.selectAll("g").remove();
                self.svg.selectAll("path").remove();
                // 地图数据
                var featuresCollection = data;
                // 获取地图经纬度极值
                var range = d3.geoBounds(featuresCollection);
                d3.select("p").text("*输入的范围为经度："+range[0][0]+"~"+range[1][0]+" 纬度："+range[0][1]+"~"+range[1][1])
                self.drillProjection.fitExtent([[20,20],[self.width-20, self.height-20]],featuresCollection);
                // 生成经纬线
                console.log(self.svg.style('width'), 'width');
                console.log(self.svg.style('height'), 'height');
                self.svg.append("path").datum(self.graticule)
                    .attr("d", self.drillPath)
                    .attr("stroke", "silver");
                // 生成地图
                var group = self.svg.append("g");
                group.selectAll("path").data(featuresCollection.features)
                    .enter()
                    .append("path")
                    .style("fill", "#484949")
                    .style("stroke", "silver")
                    .attr("d", self.drillPath)
                    .on("click", function(drillData) {
                        var id = drillData.id;
                        if(id == 'CHN') {
                            self.rendMap('/static/data/mapData/drill_china.json');
                        }
                    })
                    .on("mouseover", function() {
                        d3.select(this).style("fill", "#35c07c");
                    })
                    .on("mouseout",function() {
                        d3.select(this).style("fill", "#484949");
                    })
                    .each(function(d,i) {
                        var properties = d.properties;
                        if(properties&&properties.cp) {
                            self.drawPoint(properties.cp[0],properties.cp[1]);
                        }
                        if(properties&&properties.cp&&properties.name) {
                            var pointTmp = self.drillProjection(properties.cp);
                            group.append("text")
                                .text(properties.name)
                                .attr("x",pointTmp[0])
                                .attr("y",pointTmp[1])
                                .style("font-size","10px")
                                .style("fill","#35c07c")
                                .style("transform","translate(10px,0)")
                        }
                    })
                    ;
            });
        },

        drawPoint: function(longitude,latitude) {
            var self = this;
            self.svg.append("path")
                .datum({"type":"Point", "coordinates":[longitude,latitude]})
                .attr("d",self.drillPath)
                .style("fill","#225c41")
        }
    }

};