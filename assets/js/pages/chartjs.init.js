!(function (s) {
    "use strict";
    var r = function () {};
    (r.prototype.respChart = function (r, o, a, e) {
        (Chart.defaults.global.defaultFontColor = "#6c7897"), (Chart.defaults.scale.gridLines.color = "rgba(108, 120, 151, 0.1)");
        var t = r.get(0).getContext("2d"),
            n = s(r).parent();
        function i() {
            r.attr("width", s(n).width());
            switch (o) {
                case "Line":
                    new Chart(t, { type: "line", data: a, options: e });
                    break;
                case "Doughnut":
                    new Chart(t, { type: "doughnut", data: a, options: e });
                    break;
                case "Pie":
                    new Chart(t, { type: "pie", data: a, options: e });
                    break;
                case "Bar":
                    new Chart(t, { type: "bar", data: a, options: e });
                    break;
                case "Radar":
                    new Chart(t, { type: "radar", data: a, options: e });
                    break;
                case "PolarArea":
                    new Chart(t, { data: a, type: "polarArea", options: e });
            }
        }
        s(window).resize(i), i();
    }),
        (r.prototype.init = function () {
            // this.respChart(
            //     s("#lineChart"),
            //     "Line",
            //     {
            //         labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
            //         datasets: [
            //             {
            //                 label: "Sales Analytics",
            //                 fill: !1,
            //                 lineTension: 0.1,
            //                 backgroundColor: "#039cfd",
            //                 borderColor: "#039cfd",
            //                 borderCapStyle: "butt",
            //                 borderDash: [],
            //                 borderDashOffset: 0,
            //                 borderJoinStyle: "miter",
            //                 pointBorderColor: "#039cfd",
            //                 pointBackgroundColor: "#fff",
            //                 pointBorderWidth: 1,
            //                 pointHoverRadius: 5,
            //                 pointHoverBackgroundColor: "#039cfd",
            //                 pointHoverBorderColor: "#eef0f2",
            //                 pointHoverBorderWidth: 2,
            //                 pointRadius: 1,
            //                 pointHitRadius: 10,
            //                 data: [65, 59, 80, 81, 56, 55, 40, 35, 30],
            //             },
            //         ],
            //     },
            //     { scales: { yAxes: [{ ticks: { max: 100, min: 20, stepSize: 10 } }] } }
            // );
            // this.respChart(s("#doughnut"), "Doughnut", {
            //     labels: ["Desktops", "Tablets", "Mobiles"],
            //     datasets: [{ data: [300, 50, 100], backgroundColor: ["#f9c851", "#3ac9d6", "#ebeff2"], hoverBackgroundColor: ["#f9c851", "#3ac9d6", "#ebeff2"], hoverBorderColor: "#fff" }],
            // });
            this.respChart(s("#pie"), "Pie", {
                labels: ["Daily", "Weekly", "Monthly"],
                datasets: [{ data: [10, 25, 50], backgroundColor: ["#f9c851", "#3ac9d6", "#7fc1fc"], hoverBackgroundColor: ["#f9c851", "#3ac9d6", "#7fc1fc"], hoverBorderColor: "#fff" }],
            });
            this.respChart(s("#bar"), "Bar", {
                labels: ["Total Grievance", "Disposed", "Pending", "Repeated", "Fake"],
                datasets: [
                    {
                        label: "Total",
                        backgroundColor: "rgba(127, 193, 252, 0.3)",
                        borderColor: "#7fc1fc",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(127, 193, 252, 0.6)",
                        hoverBorderColor: "#7fc1fc",
                        data: [50, 20, 15, 10, 5],
                    },
                ],
            });
            // this.respChart(s("#radar"), "Radar", {
            //     labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            //     datasets: [
            //         {
            //             label: "Desktops",
            //             backgroundColor: "rgba(179,181,198,0.2)",
            //             borderColor: "rgba(179,181,198,1)",
            //             pointBackgroundColor: "rgba(179,181,198,1)",
            //             pointBorderColor: "#fff",
            //             pointHoverBackgroundColor: "#fff",
            //             pointHoverBorderColor: "rgba(179,181,198,1)",
            //             data: [65, 59, 90, 81, 56, 55, 40],
            //         },
            //         {
            //             label: "Tablets",
            //             backgroundColor: "rgba(255,99,132,0.2)",
            //             borderColor: "rgba(255,99,132,1)",
            //             pointBackgroundColor: "rgba(255,99,132,1)",
            //             pointBorderColor: "#fff",
            //             pointHoverBackgroundColor: "#fff",
            //             pointHoverBorderColor: "rgba(255,99,132,1)",
            //             data: [28, 48, 40, 19, 96, 27, 100],
            //         },
            //     ],
            // });
            this.respChart(s("#polarArea"), "PolarArea", {
                datasets: [{ data: [11, 16, 7, 18], backgroundColor: ["#f5707a", "#188ae2", "#4bd396", "#8d6e63"], label: "My dataset", hoverBorderColor: "#fff" }],
                labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
            });
        }),
        (s.ChartJs = new r()),
        (s.ChartJs.Constructor = r);
})(window.jQuery),
    (function (r) {
        "use strict";
        window.jQuery.ChartJs.init();
    })();
