! function(a) {
    "use strict";
    var t = function() {};
    t.prototype.init = function() {
        c3.generate({
            bindto: "#chart",
            data: {
                columns: [
                    ["Water_Supply", 18, 27, 32, 18, 27, 32, 18, 27, 32, 18, 27, 32, 18, 27, 32, 18, 27, 32, 18, 27, 32, 18, 27, 32],
                    // ["Clear_Water", 20, 29, 33],
                    // ["Transmission_Main", 22, 35, 37]
                ],
                type: "bar",
                colors: {
                    Water_Supply: "#7fc6fb",
                    Clear_Water: "#4bd396",
                    Transmission_Main: "#f5707a"
                }
            }
        }), c3.generate({
            bindto: "#combine-chart",
            data: {
                columns: [
                    ["data1", 30, 20, 50, 40, 60, 50],
                    ["data2", 200, 130, 90, 240, 130, 220],
                    ["data3", 300, 200, 160, 400, 250, 250],
                    ["data4", 200, 130, 90, 240, 130, 220],
                    ["data5", 130, 120, 150, 140, 160, 150]
                ],
                types: {
                    data1: "bar",
                    data2: "bar",
                    data3: "spline",
                    data4: "line",
                    data5: "bar"
                },
                colors: {
                    data1: "#7fc1fc",
                    data2: "#ebeff2",
                    data3: "#36404a",
                    data4: "#fb6d9d",
                    data5: "#5fbeaa"
                },
                groups: [
                    ["data1", "data2"]
                ]
            },
            axis: {
                x: {
                    type: "categorized"
                }
            }
        }), c3.generate({
            bindto: "#roated-chart",
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25]
                ],
                types: {
                    data1: "bar"
                },
                colors: {
                    data1: "#3ac9d6",
                    data2: "#f06292"
                }
            },
            axis: {
                rotated: !0,
                x: {
                    type: "categorized"
                }
            }
        }), c3.generate({
            bindto: "#chart-stacked",
            data: {
                columns: [
                    ["data1", 30, 20, 50, 40, 60, 50],
                    ["data2", 200, 130, 90, 240, 130, 220]
                ],
                types: {
                    data1: "area-spline",
                    data2: "area-spline"
                },
                colors: {
                    data1: "#ff9800",
                    data2: "#8d6e63"
                }
            }
        }), c3.generate({
            bindto: "#donut-chart",
            data: {
                columns: [
                    ["data1", 46],
                    ["data2", 24]
                ],
                type: "donut"
            },
            donut: {
                title: "Candidates",
                width: 30,
                label: {
                    show: !1
                }
            },
            color: {
                pattern: ["#26a69a", "#ebeff2"]
            }
        }), c3.generate({
            bindto: "#pie-chart",
            data: {
                columns: [
                    ["Transission Main", 46],
                    ["Clear watersupply", 24],
                    ["Raw Water", 30]
                ],
                type: "pie"
            },
            color: {
                pattern: ["#7fc6fb", "#4bd396", "#f5707a"]
            },
            pie: {
                label: {
                    show: !1
                }
            }
        }), c3.generate({
            bindto: "#line-regions",
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25]
                ],
                regions: {
                    data1: [{
                        start: 1,
                        end: 2,
                        style: "dashed"
                    }, {
                        start: 3
                    }],
                    data2: [{
                        end: 3
                    }]
                },
                colors: {
                    data1: "#ff9800",
                    data2: "#6b5fb5"
                }
            }
        }), c3.generate({
            bindto: "#scatter-plot",
            data: {
                xs: {
                    setosa: "setosa_x",
                    versicolor: "versicolor_x"
                },
                columns: [
                    ["setosa_x", 3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3],
                    ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8],
                    ["setosa", .2, .2, .2, .2, .2, .4, .3, .2, .2, .1, .2, .2, .1, .1, .2, .4, .4, .3, .3, .3, .2, .4, .2, .5, .2, .2, .4, .2, .2, .2, .2, .4, .1, .2, .2, .2, .2, .1, .2, .2, .3, .3, .2, .6, .4, .3, .2, .2, .2, .2],
                    ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1, 1.3, 1.4, 1, 1.5, 1, 1.4, 1.3, 1.4, 1.5, 1, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1, 1.1, 1, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3]
                ],
                type: "scatter"
            },
            color: {
                pattern: ["#188ae2", "#f5707a", "#3b3e47", "#6b5fb5"]
            },
            axis: {
                x: {
                    label: "Sepal.Width",
                    tick: {
                        fit: !1
                    }
                },
                y: {
                    label: "Petal.Width"
                }
            }
        })
    }, a.ChartC3 = new t, a.ChartC3.Constructor = t
}(window.jQuery),
function(a) {
    "use strict";
    window.jQuery.ChartC3.init()
}();