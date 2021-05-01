! function(n) {
    "use strict";
    var e = function() {};
    e.prototype.init = function() {
        n("#timepicker").timepicker({
            defaultTIme: !1,
            icons: {
                up: "mdi mdi-chevron-up",
                down: "mdi mdi-chevron-down"
            }
        }), n("#timepicker2").timepicker({
            showMeridian: !1,
            icons: {
                up: "mdi mdi-chevron-up",
                down: "mdi mdi-chevron-down"
            }
        }), n("#timepicker3").timepicker({
            minuteStep: 15,
            icons: {
                up: "mdi mdi-chevron-up",
                down: "mdi mdi-chevron-down"
            }
        }), n(".colorpicker-default").colorpicker({
            format: "hex"
        }), n(".colorpicker-rgba").colorpicker(), n("#component-colorpicker").colorpicker({
            format: null
        }), n("#datepicker, #datepicker2").datepicker(), n("#datepicker-autoclose").datepicker({
            autoclose: !0,
            todayHighlight: !0
        }), n("#datepicker-inline").datepicker(), n("#datepicker-multiple-date").datepicker({
            format: "mm/dd/yyyy",
            clearBtn: !0,
            multidate: !0,
            multidateSeparator: ","
        }), n("#date-range").datepicker({
            toggleActive: !0
        }), n(".clockpicker").clockpicker({
            donetext: "Done"
        }), n("#single-input").clockpicker({
            placement: "bottom",
            align: "left",
            autoclose: !0,
            default: "now"
        }), n("#check-minutes").click(function(e) {
            e.stopPropagation(), n("#single-input").clockpicker("show").clockpicker("toggleView", "minutes")
        }), n(".input-daterange-datepicker").daterangepicker({
            buttonClasses: ["btn", "btn-sm"],
            applyClass: "btn-success",
            cancelClass: "btn-secondary"
        }), n(".input-daterange-timepicker").daterangepicker({
            timePicker: !0,
            timePickerIncrement: 30,
            locale: {
                format: "MM/DD/YYYY h:mm A"
            },
            buttonClasses: ["btn", "btn-sm"],
            applyClass: "btn-success",
            cancelClass: "btn-secondary"
        }), n(".input-limit-datepicker").daterangepicker({
            format: "MM/DD/YYYY",
            minDate: "06/01/2019",
            maxDate: "06/30/2019",
            buttonClasses: ["btn", "btn-sm"],
            applyClass: "btn-success",
            cancelClass: "btn-secondary",
            dateLimit: {
                days: 6
            }
        }), n("#reportrange span").html(moment().subtract(29, "days").format("MMMM D, YYYY") + " - " + moment().format("MMMM D, YYYY")), n("#reportrange").daterangepicker({
            format: "MM/DD/YYYY",
            startDate: moment().subtract(29, "days"),
            endDate: moment(),
            minDate: "01/01/2012",
            maxDate: "12/31/2015",
            dateLimit: {
                days: 60
            },
            showDropdowns: !0,
            showWeekNumbers: !0,
            timePicker: !1,
            timePickerIncrement: 1,
            timePicker12Hour: !0,
            ranges: {
                Today: [moment(), moment()],
                Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Month": [moment().startOf("month"), moment().endOf("month")],
                "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            },
            opens: "left",
            drops: "down",
            buttonClasses: ["btn", "btn-sm"],
            applyClass: "btn-success",
            cancelClass: "btn-secondary",
            separator: " to ",
            locale: {
                applyLabel: "Submit",
                cancelLabel: "Cancel",
                fromLabel: "From",
                toLabel: "To",
                customRangeLabel: "Custom",
                daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                firstDay: 1
            }
        }, function(e, t, a) {
            console.log(e.toISOString(), t.toISOString(), a), n("#reportrange span").html(e.format("MMMM D, YYYY") + " - " + t.format("MMMM D, YYYY"))
        })
    }, n.FormPickers = new e, n.FormPickers.Constructor = e
}(window.jQuery),
function(e) {
    "use strict";
    window.jQuery.FormPickers.init()
}();