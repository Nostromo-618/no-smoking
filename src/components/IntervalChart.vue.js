"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var vue_chartjs_1 = require("vue-chartjs");
var vuetify_1 = require("vuetify");
var chart_js_1 = require("chart.js");
var storageService_1 = require("@/services/storageService");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.BarElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
var theme = (0, vuetify_1.useTheme)();
var urges = (0, vue_1.ref)([]);
var selectedUrgeType = (0, vue_1.ref)('all');
var timeUnit = (0, vue_1.ref)('minutes');
var urgeTypeOptions = [
    { title: 'All Types', value: 'all' },
    { title: 'Urge Resisted', value: 'resisted' },
    { title: 'Smoking Happened', value: 'smoking' },
    { title: 'Nicotine Gum', value: 'gum' },
];
var timeUnitOptions = [
    { title: 'Minutes', value: 'minutes' },
    { title: 'Hours', value: 'hours' },
    { title: 'Days', value: 'days' },
];
// Calculate intervals between consecutive urges
var intervals = (0, vue_1.computed)(function () {
    if (urges.value.length < 2)
        return [];
    var allIntervals = [];
    for (var i = 1; i < urges.value.length; i++) {
        var currentUrge = urges.value[i];
        var previousUrge = urges.value[i - 1];
        var timeDiff = (new Date(currentUrge.timestamp).getTime() -
            new Date(previousUrge.timestamp).getTime()) /
            (1000 * 60 * 60); // Convert to hours
        allIntervals.push({
            timestamp: currentUrge.timestamp,
            hours: timeDiff,
            type: currentUrge.type || 'resisted',
            previousType: previousUrge.type || 'resisted',
        });
    }
    // Filter by selected urge type
    if (selectedUrgeType.value === 'all') {
        return allIntervals;
    }
    return allIntervals.filter(function (interval) { return interval.type === selectedUrgeType.value; });
});
var hasData = (0, vue_1.computed)(function () { return intervals.value.length > 0; });
// Convert hours to selected time unit
var convertToTimeUnit = function (hours) {
    if (timeUnit.value === 'minutes') {
        return hours * 60;
    }
    else if (timeUnit.value === 'days') {
        return hours / 24;
    }
    return hours;
};
// Format time display
var formatTime = function (hours) {
    var value = convertToTimeUnit(hours);
    var unit = 'h';
    if (timeUnit.value === 'minutes') {
        unit = 'm';
    }
    else if (timeUnit.value === 'days') {
        unit = 'd';
    }
    // For very small values, show with more precision
    if (value < 1) {
        return "".concat(value.toFixed(2)).concat(unit);
    }
    else if (value < 10) {
        return "".concat(value.toFixed(1)).concat(unit);
    }
    return "".concat(Math.round(value)).concat(unit);
};
// Get bar color based on interval length and type
var getBarColor = function (hours, urgeType) {
    var isDark = theme.global.current.value.dark;
    // Color based on urge type
    switch (urgeType) {
        case 'resisted':
            return isDark ? 'rgba(76, 175, 80, 0.8)' : 'rgba(34, 197, 94, 0.8)'; // Green
        case 'smoking':
            return isDark ? 'rgba(244, 67, 54, 0.8)' : 'rgba(239, 68, 68, 0.8)'; // Red
        case 'gum':
            return isDark ? 'rgba(255, 152, 0, 0.8)' : 'rgba(249, 115, 22, 0.8)'; // Orange
        default:
            return isDark ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.8)'; // Blue
    }
};
// Chart data
var chartData = (0, vue_1.computed)(function () {
    var isDark = theme.global.current.value.dark;
    return {
        labels: intervals.value.map(function (interval, index) {
            var date = new Date(interval.timestamp);
            return "#".concat(index + 1, " - ").concat(date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));
        }),
        datasets: [
            {
                label: "Time Between Urges (".concat(timeUnit.value, ")"),
                data: intervals.value.map(function (interval) { return convertToTimeUnit(interval.hours); }),
                backgroundColor: intervals.value.map(function (interval) { return getBarColor(interval.hours, interval.type); }),
                borderColor: intervals.value.map(function (interval) { return getBarColor(interval.hours, interval.type).replace('0.8', '1'); }),
                borderWidth: 2,
                borderRadius: 6,
            },
        ],
    };
});
// Chart options
var chartOptions = (0, vue_1.computed)(function () {
    var isDark = theme.global.current.value.dark;
    var textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : '#333';
    var gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: textColor,
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var interval = intervals.value[context.dataIndex];
                        var hours = interval.hours;
                        return "".concat(formatTime(hours), " since previous urge");
                    },
                    afterLabel: function (context) {
                        var interval = intervals.value[context.dataIndex];
                        return "Type: ".concat(interval.type.charAt(0).toUpperCase() + interval.type.slice(1));
                    },
                },
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Urge Events',
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    color: gridColor,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Interval (".concat(timeUnit.value, ")"),
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: gridColor,
                },
                beginAtZero: true,
            },
        },
    };
});
// Statistics
var averageInterval = (0, vue_1.computed)(function () {
    if (intervals.value.length === 0)
        return '0h';
    var avg = intervals.value.reduce(function (sum, i) { return sum + i.hours; }, 0) / intervals.value.length;
    return formatTime(avg);
});
var longestInterval = (0, vue_1.computed)(function () {
    if (intervals.value.length === 0)
        return '0h';
    var max = Math.max.apply(Math, intervals.value.map(function (i) { return i.hours; }));
    return formatTime(max);
});
// Trend analysis (comparing last 3 intervals to previous 3)
var trendData = (0, vue_1.computed)(function () {
    if (intervals.value.length < 4) {
        return { direction: 'neutral', percentage: 0 };
    }
    var recentCount = Math.min(3, Math.floor(intervals.value.length / 2));
    var recent = intervals.value.slice(-recentCount);
    var previous = intervals.value.slice(-recentCount * 2, -recentCount);
    var recentAvg = recent.reduce(function (sum, i) { return sum + i.hours; }, 0) / recent.length;
    var previousAvg = previous.reduce(function (sum, i) { return sum + i.hours; }, 0) / previous.length;
    var percentChange = ((recentAvg - previousAvg) / previousAvg) * 100;
    if (percentChange > 10)
        return { direction: 'improving', percentage: percentChange };
    if (percentChange < -10)
        return { direction: 'declining', percentage: Math.abs(percentChange) };
    return { direction: 'stable', percentage: Math.abs(percentChange) };
});
var trendIcon = (0, vue_1.computed)(function () {
    switch (trendData.value.direction) {
        case 'improving': return 'mdi-trending-up';
        case 'declining': return 'mdi-trending-down';
        default: return 'mdi-trending-neutral';
    }
});
var trendColor = (0, vue_1.computed)(function () {
    switch (trendData.value.direction) {
        case 'improving': return 'success';
        case 'declining': return 'error';
        default: return 'warning';
    }
});
var trendText = (0, vue_1.computed)(function () {
    var _a = trendData.value, direction = _a.direction, percentage = _a.percentage;
    if (direction === 'improving') {
        return "+".concat(percentage.toFixed(0), "%");
    }
    else if (direction === 'declining') {
        return "-".concat(percentage.toFixed(0), "%");
    }
    else {
        return 'Stable';
    }
});
// Load data
var loadChartData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = urges;
                return [4 /*yield*/, storageService_1.storageService.getUrges()];
            case 1:
                _a.value = _b.sent();
                return [2 /*return*/];
        }
    });
}); };
// Watch theme changes
(0, vue_1.watch)(function () { return theme.global.current.value.dark; }, function () {
    // Force chart update by recreating data
    if (hasData.value) {
        loadChartData();
    }
});
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadChartData()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var __VLS_exposed = { loadChartData: loadChartData };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ class: "h-100" }, { flat: true })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "h-100" }, { flat: true })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
var __VLS_6 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "text-h5 font-weight-medium pa-6" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "text-h5 font-weight-medium pa-6" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
var __VLS_10 = __VLS_9.slots.default;
var __VLS_11 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
VIcon;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(__assign({ class: "mr-2" }, { color: "primary" })));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([__assign({ class: "mr-2" }, { color: "primary" })], __VLS_functionalComponentArgsRest(__VLS_12), false));
var __VLS_15 = __VLS_14.slots.default;
var __VLS_14;
var __VLS_9;
var __VLS_16 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(__assign({ class: "pa-6" })));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ class: "pa-6" })], __VLS_functionalComponentArgsRest(__VLS_17), false));
var __VLS_20 = __VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-subtitle-2 text-medium-emphasis mb-4 text-center" }));
var __VLS_21 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign({ class: "mb-4" }, { align: "center" })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ class: "mb-4" }, { align: "center" })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25 = __VLS_24.slots.default;
var __VLS_26 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    cols: "12",
    md: "6",
}));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
        cols: "12",
        md: "6",
    }], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_30 = __VLS_29.slots.default;
var __VLS_31 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    modelValue: (__VLS_ctx.selectedUrgeType),
    items: (__VLS_ctx.urgeTypeOptions),
    label: "Filter by type",
    density: "compact",
    variant: "outlined",
    hideDetails: true,
}));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.selectedUrgeType),
        items: (__VLS_ctx.urgeTypeOptions),
        label: "Filter by type",
        density: "compact",
        variant: "outlined",
        hideDetails: true,
    }], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_35 = __VLS_34.slots.default;
// @ts-ignore
[selectedUrgeType, urgeTypeOptions,];
{
    var __VLS_36 = __VLS_34.slots["prepend-inner"];
    var __VLS_37 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        size: "small",
    }));
    var __VLS_39 = __VLS_38.apply(void 0, __spreadArray([{
            size: "small",
        }], __VLS_functionalComponentArgsRest(__VLS_38), false));
    var __VLS_41 = __VLS_40.slots.default;
    var __VLS_40;
}
var __VLS_34;
var __VLS_29;
var __VLS_42 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    cols: "12",
    md: "6",
}));
var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([{
        cols: "12",
        md: "6",
    }], __VLS_functionalComponentArgsRest(__VLS_43), false));
var __VLS_46 = __VLS_45.slots.default;
var __VLS_47 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    modelValue: (__VLS_ctx.timeUnit),
    items: (__VLS_ctx.timeUnitOptions),
    label: "Display unit",
    density: "compact",
    variant: "outlined",
    hideDetails: true,
}));
var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.timeUnit),
        items: (__VLS_ctx.timeUnitOptions),
        label: "Display unit",
        density: "compact",
        variant: "outlined",
        hideDetails: true,
    }], __VLS_functionalComponentArgsRest(__VLS_48), false));
var __VLS_51 = __VLS_50.slots.default;
// @ts-ignore
[timeUnit, timeUnitOptions,];
{
    var __VLS_52 = __VLS_50.slots["prepend-inner"];
    var __VLS_53 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        size: "small",
    }));
    var __VLS_55 = __VLS_54.apply(void 0, __spreadArray([{
            size: "small",
        }], __VLS_functionalComponentArgsRest(__VLS_54), false));
    var __VLS_57 = __VLS_56.slots.default;
    var __VLS_56;
}
var __VLS_50;
var __VLS_45;
var __VLS_24;
if (__VLS_ctx.hasData) {
    // @ts-ignore
    [hasData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "chart-container" }, { style: {} }));
    var __VLS_58 = {}.Bar;
    /** @type {[typeof __VLS_components.Bar, ]} */ ;
    // @ts-ignore
    vue_chartjs_1.Bar;
    // @ts-ignore
    var __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        data: (__VLS_ctx.chartData),
        options: (__VLS_ctx.chartOptions),
    }));
    var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{
            data: (__VLS_ctx.chartData),
            options: (__VLS_ctx.chartOptions),
        }], __VLS_functionalComponentArgsRest(__VLS_59), false));
    // @ts-ignore
    [chartData, chartOptions,];
}
else {
    var __VLS_63 = {}.VEmptyState;
    /** @type {[typeof __VLS_components.VEmptyState, typeof __VLS_components.vEmptyState, ]} */ ;
    // @ts-ignore
    VEmptyState;
    // @ts-ignore
    var __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63(__assign({ icon: "mdi-chart-bar", title: "Not enough data", text: "Record at least 2 urges to see interval progress" }, { class: "my-8" })));
    var __VLS_65 = __VLS_64.apply(void 0, __spreadArray([__assign({ icon: "mdi-chart-bar", title: "Not enough data", text: "Record at least 2 urges to see interval progress" }, { class: "my-8" })], __VLS_functionalComponentArgsRest(__VLS_64), false));
}
if (__VLS_ctx.hasData) {
    // @ts-ignore
    [hasData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "mt-4" }));
    var __VLS_68 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({}));
    var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_69), false));
    var __VLS_72 = __VLS_71.slots.default;
    var __VLS_73 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        cols: "12",
        sm: "4",
    }));
    var __VLS_75 = __VLS_74.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_74), false));
    var __VLS_77 = __VLS_76.slots.default;
    var __VLS_78 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
        variant: "tonal",
        color: "info",
    }));
    var __VLS_80 = __VLS_79.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "info",
        }], __VLS_functionalComponentArgsRest(__VLS_79), false));
    var __VLS_82 = __VLS_81.slots.default;
    var __VLS_83 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83(__assign({ class: "text-center" })));
    var __VLS_85 = __VLS_84.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_84), false));
    var __VLS_87 = __VLS_86.slots.default;
    var __VLS_88 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        color: "info",
        size: "large",
    }));
    var __VLS_90 = __VLS_89.apply(void 0, __spreadArray([{
            color: "info",
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_89), false));
    var __VLS_92 = __VLS_91.slots.default;
    var __VLS_91;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.averageInterval);
    // @ts-ignore
    [averageInterval,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_86;
    var __VLS_81;
    var __VLS_76;
    var __VLS_93 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        cols: "12",
        sm: "4",
    }));
    var __VLS_95 = __VLS_94.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_94), false));
    var __VLS_97 = __VLS_96.slots.default;
    var __VLS_98 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
        variant: "tonal",
        color: "success",
    }));
    var __VLS_100 = __VLS_99.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "success",
        }], __VLS_functionalComponentArgsRest(__VLS_99), false));
    var __VLS_102 = __VLS_101.slots.default;
    var __VLS_103 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103(__assign({ class: "text-center" })));
    var __VLS_105 = __VLS_104.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_104), false));
    var __VLS_107 = __VLS_106.slots.default;
    var __VLS_108 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
        color: "success",
        size: "large",
    }));
    var __VLS_110 = __VLS_109.apply(void 0, __spreadArray([{
            color: "success",
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_109), false));
    var __VLS_112 = __VLS_111.slots.default;
    var __VLS_111;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.longestInterval);
    // @ts-ignore
    [longestInterval,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_106;
    var __VLS_101;
    var __VLS_96;
    var __VLS_113 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        cols: "12",
        sm: "4",
    }));
    var __VLS_115 = __VLS_114.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_114), false));
    var __VLS_117 = __VLS_116.slots.default;
    var __VLS_118 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
        variant: "tonal",
        color: (__VLS_ctx.trendColor),
    }));
    var __VLS_120 = __VLS_119.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: (__VLS_ctx.trendColor),
        }], __VLS_functionalComponentArgsRest(__VLS_119), false));
    var __VLS_122 = __VLS_121.slots.default;
    // @ts-ignore
    [trendColor,];
    var __VLS_123 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123(__assign({ class: "text-center" })));
    var __VLS_125 = __VLS_124.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_124), false));
    var __VLS_127 = __VLS_126.slots.default;
    var __VLS_128 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
        color: (__VLS_ctx.trendColor),
        size: "large",
    }));
    var __VLS_130 = __VLS_129.apply(void 0, __spreadArray([{
            color: (__VLS_ctx.trendColor),
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_129), false));
    var __VLS_132 = __VLS_131.slots.default;
    // @ts-ignore
    [trendColor,];
    (__VLS_ctx.trendIcon);
    // @ts-ignore
    [trendIcon,];
    var __VLS_131;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.trendText);
    // @ts-ignore
    [trendText,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_126;
    var __VLS_121;
    var __VLS_116;
    var __VLS_71;
}
var __VLS_19;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['my-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () { return (__VLS_exposed); },
});
exports.default = {};
