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
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
var theme = (0, vuetify_1.useTheme)();
var chartData = (0, vue_1.ref)({ labels: [], datasets: [] });
var urges = (0, vue_1.ref)([]);
var filteredUrges = (0, vue_1.ref)([]);
// Date range state
var dateMenu = (0, vue_1.ref)(false);
// Initialize as undefined to avoid conflicts with loaded preference
var dateRangeType = (0, vue_1.ref)();
var startDate = (0, vue_1.ref)('');
var endDate = (0, vue_1.ref)('');
// Maximum data points to display for performance
var MAX_DATA_POINTS = 100;
// Current date display
var currentDateDisplay = (0, vue_1.computed)(function () {
    var now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});
// Date range display text
var dateRangeDisplay = (0, vue_1.computed)(function () {
    switch (dateRangeType.value) {
        case 'all':
            return 'All Time';
        case 'week':
            return 'Last 7 Days';
        case 'month':
            return 'Last 30 Days';
        case 'custom':
            if (startDate.value && endDate.value) {
                var start = new Date(startDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                var end = new Date(endDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return "".concat(start, " - ").concat(end);
            }
            return 'Select Dates';
        default:
            return 'All Time';
    }
});
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
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time',
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: gridColor,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Intensity (1-10)',
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: gridColor,
                },
                min: 0,
                max: 10,
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    };
});
var hasData = (0, vue_1.computed)(function () { return filteredUrges.value.length > 0; });
var totalUrges = (0, vue_1.computed)(function () { return filteredUrges.value.length; });
var averageIntensity = (0, vue_1.computed)(function () {
    if (filteredUrges.value.length === 0)
        return '0';
    var avg = filteredUrges.value.reduce(function (sum, urge) { return sum + urge.intensity; }, 0) / filteredUrges.value.length;
    return avg.toFixed(1);
});
var resistedCount = (0, vue_1.computed)(function () { return filteredUrges.value.filter(function (u) { return !u.type || u.type === 'resisted'; }).length; });
var smokingCount = (0, vue_1.computed)(function () { return filteredUrges.value.filter(function (u) { return u.type === 'smoking'; }).length; });
var gumCount = (0, vue_1.computed)(function () { return filteredUrges.value.filter(function (u) { return u.type === 'gum'; }).length; });
var lastUrgeTime = (0, vue_1.computed)(function () {
    // Always use all urges for last urge time, not filtered
    if (urges.value.length === 0)
        return 'Never';
    var lastUrge = urges.value[urges.value.length - 1];
    var date = new Date(lastUrge.timestamp);
    var now = new Date();
    var diffMs = now.getTime() - date.getTime();
    var diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    var diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours > 0) {
        return "".concat(diffHours, "h ago");
    }
    else if (diffMins > 0) {
        return "".concat(diffMins, "m ago");
    }
    else {
        return 'Just now';
    }
});
// Apply date filter to urges
var applyDateFilter = function () {
    var filtered = __spreadArray([], urges.value, true);
    var now = new Date();
    switch (dateRangeType.value) {
        case 'week': {
            var weekAgo_1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = urges.value.filter(function (u) { return new Date(u.timestamp) >= weekAgo_1; });
            break;
        }
        case 'month': {
            var monthAgo_1 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            filtered = urges.value.filter(function (u) { return new Date(u.timestamp) >= monthAgo_1; });
            break;
        }
        case 'custom': {
            if (startDate.value && endDate.value) {
                var start_1 = new Date(startDate.value);
                start_1.setHours(0, 0, 0, 0);
                var end_1 = new Date(endDate.value);
                end_1.setHours(23, 59, 59, 999);
                filtered = urges.value.filter(function (u) {
                    var urgeDate = new Date(u.timestamp);
                    return urgeDate >= start_1 && urgeDate <= end_1;
                });
                // Save custom date range when Apply is clicked (if component is mounted)
                if (isMounted.value && !isInitializing.value) {
                    storageService_1.storageService.saveCustomDateRange(startDate.value, endDate.value);
                }
            }
            break;
        }
        case 'all':
        default:
            filtered = __spreadArray([], urges.value, true);
            break;
    }
    // Limit data points for performance
    if (filtered.length > MAX_DATA_POINTS) {
        // Sample the data to keep it under MAX_DATA_POINTS
        var step = Math.ceil(filtered.length / MAX_DATA_POINTS);
        var sampled = [];
        for (var i = 0; i < filtered.length; i += step) {
            sampled.push(filtered[i]);
        }
        // Always include the last data point
        if (sampled[sampled.length - 1] !== filtered[filtered.length - 1]) {
            sampled.push(filtered[filtered.length - 1]);
        }
        filtered = sampled;
    }
    filteredUrges.value = filtered;
    updateChartData();
    dateMenu.value = false;
};
// Update chart with filtered data
var updateChartData = function () {
    var isDark = theme.global.current.value.dark;
    // Function to get point color based on urge type
    var getPointColor = function (urgeType) {
        switch (urgeType) {
            case 'resisted':
                return isDark ? '#4ade80' : '#22c55e'; // Green
            case 'smoking':
                return isDark ? '#f87171' : '#ef4444'; // Red
            case 'gum':
                return isDark ? '#fb923c' : '#f97316'; // Orange
            default:
                return isDark ? '#4ade80' : '#22c55e'; // Default to green for backward compatibility
        }
    };
    chartData.value = {
        labels: filteredUrges.value.map(function (urge) {
            var date = new Date(urge.timestamp);
            return (date.toLocaleDateString() +
                ' ' +
                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }),
        datasets: [
            {
                label: 'Urge Intensity',
                borderColor: isDark ? '#60a5fa' : '#1976D2',
                backgroundColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(25, 118, 210, 0.1)',
                data: filteredUrges.value.map(function (urge) { return urge.intensity; }),
                fill: true,
                pointBackgroundColor: filteredUrges.value.map(function (urge) { return getPointColor(urge.type); }),
                pointBorderColor: isDark ? '#1e293b' : '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };
};
var loadChartData = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (skipFilter) {
        var _a;
        if (skipFilter === void 0) { skipFilter = false; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = urges;
                    return [4 /*yield*/, storageService_1.storageService.getUrges()
                        // Initialize filtered urges with all urges
                    ];
                case 1:
                    _a.value = _b.sent();
                    // Initialize filtered urges with all urges
                    filteredUrges.value = __spreadArray([], (urges.value || []), true);
                    // Apply current filter unless explicitly skipped
                    if (!skipFilter) {
                        applyDateFilter();
                    }
                    return [2 /*return*/];
            }
        });
    });
};
// Watch for theme changes and update chart
(0, vue_1.watch)(function () { return theme.global.current.value.dark; }, function () {
    updateChartData();
});
// Track if component is mounted to avoid saving on initial load
var isMounted = (0, vue_1.ref)(false);
var isInitializing = (0, vue_1.ref)(true);
// Initialize date range to current date for custom range
(0, vue_1.watch)(dateRangeType, function (newType, oldType) {
    if (newType === 'custom' && !startDate.value && !endDate.value) {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        startDate.value = weekAgo.toISOString().split('T')[0];
        endDate.value = now.toISOString().split('T')[0];
    }
    // Only save preference after component is mounted (user interaction)
    // Skip saving if oldType is undefined (initial setup) or during initialization
    if (isMounted.value && newType && oldType !== newType) {
        storageService_1.storageService.saveCalendarIntervalPreference(newType);
        // If switching away from custom, we don't need to save the dates
        // If switching to custom, dates will be saved when user clicks Apply
    }
    else {
    }
});
// Watch for custom date changes and save them
(0, vue_1.watch)([startDate, endDate], function (_a, _b) {
    var newStart = _a[0], newEnd = _a[1];
    var oldStart = _b[0], oldEnd = _b[1];
    // Only save if component is mounted, dates are set, and this is a user interaction
    if (isMounted.value && !isInitializing.value && dateRangeType.value === 'custom') {
        if (newStart && newEnd && (newStart !== oldStart || newEnd !== oldEnd)) {
            storageService_1.storageService.saveCustomDateRange(newStart, newEnd);
        }
    }
});
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var savedInterval, savedDateRange, now, weekAgo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                savedInterval = storageService_1.storageService.getCalendarIntervalPreference();
                // Set the date range type from storage (or use default)
                if (savedInterval && ['all', 'week', 'month', 'custom'].includes(savedInterval)) {
                    dateRangeType.value = savedInterval;
                    // If the saved interval is 'custom', load the saved custom date range
                    if (savedInterval === 'custom') {
                        savedDateRange = storageService_1.storageService.getCustomDateRange();
                        if (savedDateRange) {
                            startDate.value = savedDateRange.startDate;
                            endDate.value = savedDateRange.endDate;
                        }
                        else {
                            now = new Date();
                            weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            startDate.value = weekAgo.toISOString().split('T')[0];
                            endDate.value = now.toISOString().split('T')[0];
                        }
                    }
                }
                else {
                    dateRangeType.value = 'all';
                }
                // Load the urges data
                return [4 /*yield*/, loadChartData(true)];
            case 1:
                // Load the urges data
                _a.sent();
                // Apply the filter with the dateRangeType that was set from storage
                applyDateFilter();
                // Mark component as mounted after initial load - use nextTick to ensure reactivity is complete
                (0, vue_1.nextTick)(function () {
                    isMounted.value = true;
                    // Clear the initializing flag after a short delay to ensure all reactivity is complete
                    setTimeout(function () {
                        isInitializing.value = false;
                    }, 100);
                });
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "d-flex align-center" }));
var __VLS_31 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
VIcon;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31(__assign({ class: "mr-2" }, { color: "primary" })));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([__assign({ class: "mr-2" }, { color: "primary" })], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_35 = __VLS_34.slots.default;
var __VLS_34;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "text-body-1 mr-3" }));
(__VLS_ctx.currentDateDisplay);
// @ts-ignore
[currentDateDisplay,];
var __VLS_36 = {}.VMenu;
/** @type {[typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, ]} */ ;
// @ts-ignore
VMenu;
// @ts-ignore
var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.dateMenu),
    closeOnContentClick: (false),
    transition: "scale-transition",
    offsetY: true,
    minWidth: "auto",
}));
var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.dateMenu),
        closeOnContentClick: (false),
        transition: "scale-transition",
        offsetY: true,
        minWidth: "auto",
    }], __VLS_functionalComponentArgsRest(__VLS_37), false));
var __VLS_40 = __VLS_39.slots.default;
// @ts-ignore
[dateMenu,];
{
    var __VLS_41 = __VLS_39.slots.activator;
    var props = __VLS_getSlotParameters(__VLS_41)[0].props;
    var __VLS_42 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    VBtn;
    // @ts-ignore
    var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42(__assign(__assign({}, (props)), { variant: "outlined", size: "small", prependIcon: "mdi-calendar" })));
    var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([__assign(__assign({}, (props)), { variant: "outlined", size: "small", prependIcon: "mdi-calendar" })], __VLS_functionalComponentArgsRest(__VLS_43), false));
    var __VLS_46 = __VLS_45.slots.default;
    (__VLS_ctx.dateRangeDisplay);
    // @ts-ignore
    [dateRangeDisplay,];
    var __VLS_45;
}
var __VLS_47 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_48), false));
var __VLS_51 = __VLS_50.slots.default;
var __VLS_52 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_53), false));
var __VLS_56 = __VLS_55.slots.default;
var __VLS_57 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
var __VLS_59 = __VLS_58.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_58), false));
var __VLS_61 = __VLS_60.slots.default;
var __VLS_62 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    cols: "12",
}));
var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([{
        cols: "12",
    }], __VLS_functionalComponentArgsRest(__VLS_63), false));
var __VLS_66 = __VLS_65.slots.default;
var __VLS_67 = {}.VBtnToggle;
/** @type {[typeof __VLS_components.VBtnToggle, typeof __VLS_components.vBtnToggle, typeof __VLS_components.VBtnToggle, typeof __VLS_components.vBtnToggle, ]} */ ;
// @ts-ignore
VBtnToggle;
// @ts-ignore
var __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67(__assign({ modelValue: (__VLS_ctx.dateRangeType), mandatory: true, color: "primary", density: "compact" }, { class: "mb-3" })));
var __VLS_69 = __VLS_68.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.dateRangeType), mandatory: true, color: "primary", density: "compact" }, { class: "mb-3" })], __VLS_functionalComponentArgsRest(__VLS_68), false));
var __VLS_71 = __VLS_70.slots.default;
// @ts-ignore
[dateRangeType,];
var __VLS_72 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    value: "all",
    size: "small",
}));
var __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
        value: "all",
        size: "small",
    }], __VLS_functionalComponentArgsRest(__VLS_73), false));
var __VLS_76 = __VLS_75.slots.default;
var __VLS_75;
var __VLS_77 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    value: "week",
    size: "small",
}));
var __VLS_79 = __VLS_78.apply(void 0, __spreadArray([{
        value: "week",
        size: "small",
    }], __VLS_functionalComponentArgsRest(__VLS_78), false));
var __VLS_81 = __VLS_80.slots.default;
var __VLS_80;
var __VLS_82 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    value: "month",
    size: "small",
}));
var __VLS_84 = __VLS_83.apply(void 0, __spreadArray([{
        value: "month",
        size: "small",
    }], __VLS_functionalComponentArgsRest(__VLS_83), false));
var __VLS_86 = __VLS_85.slots.default;
var __VLS_85;
var __VLS_87 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    value: "custom",
    size: "small",
}));
var __VLS_89 = __VLS_88.apply(void 0, __spreadArray([{
        value: "custom",
        size: "small",
    }], __VLS_functionalComponentArgsRest(__VLS_88), false));
var __VLS_91 = __VLS_90.slots.default;
var __VLS_90;
var __VLS_70;
var __VLS_65;
var __VLS_60;
if (__VLS_ctx.dateRangeType === 'custom') {
    // @ts-ignore
    [dateRangeType,];
    var __VLS_92 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
    var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_93), false));
    var __VLS_96 = __VLS_95.slots.default;
    var __VLS_97 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        cols: "12",
        md: "6",
    }));
    var __VLS_99 = __VLS_98.apply(void 0, __spreadArray([{
            cols: "12",
            md: "6",
        }], __VLS_functionalComponentArgsRest(__VLS_98), false));
    var __VLS_101 = __VLS_100.slots.default;
    var __VLS_102 = {}.VTextField;
    /** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
    // @ts-ignore
    VTextField;
    // @ts-ignore
    var __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        modelValue: (__VLS_ctx.startDate),
        label: "Start Date",
        type: "date",
        density: "compact",
        variant: "outlined",
    }));
    var __VLS_104 = __VLS_103.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.startDate),
            label: "Start Date",
            type: "date",
            density: "compact",
            variant: "outlined",
        }], __VLS_functionalComponentArgsRest(__VLS_103), false));
    // @ts-ignore
    [startDate,];
    var __VLS_100;
    var __VLS_107 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
        cols: "12",
        md: "6",
    }));
    var __VLS_109 = __VLS_108.apply(void 0, __spreadArray([{
            cols: "12",
            md: "6",
        }], __VLS_functionalComponentArgsRest(__VLS_108), false));
    var __VLS_111 = __VLS_110.slots.default;
    var __VLS_112 = {}.VTextField;
    /** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
    // @ts-ignore
    VTextField;
    // @ts-ignore
    var __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
        modelValue: (__VLS_ctx.endDate),
        label: "End Date",
        type: "date",
        density: "compact",
        variant: "outlined",
    }));
    var __VLS_114 = __VLS_113.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.endDate),
            label: "End Date",
            type: "date",
            density: "compact",
            variant: "outlined",
        }], __VLS_functionalComponentArgsRest(__VLS_113), false));
    // @ts-ignore
    [endDate,];
    var __VLS_110;
    var __VLS_95;
}
var __VLS_117 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({}));
var __VLS_119 = __VLS_118.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_118), false));
var __VLS_121 = __VLS_120.slots.default;
var __VLS_122 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122(__assign({ cols: "12" }, { class: "text-right" })));
var __VLS_124 = __VLS_123.apply(void 0, __spreadArray([__assign({ cols: "12" }, { class: "text-right" })], __VLS_functionalComponentArgsRest(__VLS_123), false));
var __VLS_126 = __VLS_125.slots.default;
var __VLS_127 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127(__assign({ 'onClick': {} }, { variant: "text" })));
var __VLS_129 = __VLS_128.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { variant: "text" })], __VLS_functionalComponentArgsRest(__VLS_128), false));
var __VLS_131;
var __VLS_132;
var __VLS_133 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.dateMenu = false;
            // @ts-ignore
            [dateMenu,];
        } });
var __VLS_134 = __VLS_130.slots.default;
var __VLS_130;
var __VLS_135 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135(__assign({ 'onClick': {} }, { color: "primary", variant: "flat" })));
var __VLS_137 = __VLS_136.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { color: "primary", variant: "flat" })], __VLS_functionalComponentArgsRest(__VLS_136), false));
var __VLS_139;
var __VLS_140;
var __VLS_141 = ({ click: {} },
    { onClick: (__VLS_ctx.applyDateFilter) });
var __VLS_142 = __VLS_138.slots.default;
// @ts-ignore
[applyDateFilter,];
var __VLS_138;
var __VLS_125;
var __VLS_120;
var __VLS_55;
var __VLS_50;
var __VLS_39;
var __VLS_29;
var __VLS_143 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143(__assign({ cols: "12", md: "6" }, { class: "text-md-right" })));
var __VLS_145 = __VLS_144.apply(void 0, __spreadArray([__assign({ cols: "12", md: "6" }, { class: "text-md-right" })], __VLS_functionalComponentArgsRest(__VLS_144), false));
var __VLS_147 = __VLS_146.slots.default;
if (__VLS_ctx.filteredUrges.length !== __VLS_ctx.urges.length) {
    // @ts-ignore
    [filteredUrges, urges,];
    var __VLS_148 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    VChip;
    // @ts-ignore
    var __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
        color: "info",
        variant: "outlined",
        size: "small",
    }));
    var __VLS_150 = __VLS_149.apply(void 0, __spreadArray([{
            color: "info",
            variant: "outlined",
            size: "small",
        }], __VLS_functionalComponentArgsRest(__VLS_149), false));
    var __VLS_152 = __VLS_151.slots.default;
    (__VLS_ctx.filteredUrges.length);
    (__VLS_ctx.urges.length);
    // @ts-ignore
    [filteredUrges, urges,];
    var __VLS_151;
}
else if (__VLS_ctx.urges.length > 0) {
    // @ts-ignore
    [urges,];
    var __VLS_153 = {}.VChip;
    /** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
    // @ts-ignore
    VChip;
    // @ts-ignore
    var __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
        color: "success",
        variant: "outlined",
        size: "small",
    }));
    var __VLS_155 = __VLS_154.apply(void 0, __spreadArray([{
            color: "success",
            variant: "outlined",
            size: "small",
        }], __VLS_functionalComponentArgsRest(__VLS_154), false));
    var __VLS_157 = __VLS_156.slots.default;
    (__VLS_ctx.urges.length);
    // @ts-ignore
    [urges,];
    var __VLS_156;
}
var __VLS_146;
var __VLS_24;
if (__VLS_ctx.hasData) {
    // @ts-ignore
    [hasData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "chart-container" }, { style: {} }));
    var __VLS_158 = {}.Line;
    /** @type {[typeof __VLS_components.Line, ]} */ ;
    // @ts-ignore
    vue_chartjs_1.Line;
    // @ts-ignore
    var __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
        data: (__VLS_ctx.chartData),
        options: (__VLS_ctx.chartOptions),
    }));
    var __VLS_160 = __VLS_159.apply(void 0, __spreadArray([{
            data: (__VLS_ctx.chartData),
            options: (__VLS_ctx.chartOptions),
        }], __VLS_functionalComponentArgsRest(__VLS_159), false));
    // @ts-ignore
    [chartData, chartOptions,];
}
else {
    var __VLS_163 = {}.VEmptyState;
    /** @type {[typeof __VLS_components.VEmptyState, typeof __VLS_components.vEmptyState, ]} */ ;
    // @ts-ignore
    VEmptyState;
    // @ts-ignore
    var __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163(__assign({ icon: "mdi-chart-line-variant", title: "No data yet", text: "Start tracking your urges to see your progress over time" }, { class: "my-8" })));
    var __VLS_165 = __VLS_164.apply(void 0, __spreadArray([__assign({ icon: "mdi-chart-line-variant", title: "No data yet", text: "Start tracking your urges to see your progress over time" }, { class: "my-8" })], __VLS_functionalComponentArgsRest(__VLS_164), false));
}
if (__VLS_ctx.hasData) {
    // @ts-ignore
    [hasData,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "mt-4" }));
    var __VLS_168 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({}));
    var __VLS_170 = __VLS_169.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_169), false));
    var __VLS_172 = __VLS_171.slots.default;
    var __VLS_173 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
        cols: "12",
        sm: "4",
    }));
    var __VLS_175 = __VLS_174.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_174), false));
    var __VLS_177 = __VLS_176.slots.default;
    var __VLS_178 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
        variant: "tonal",
        color: "info",
    }));
    var __VLS_180 = __VLS_179.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "info",
        }], __VLS_functionalComponentArgsRest(__VLS_179), false));
    var __VLS_182 = __VLS_181.slots.default;
    var __VLS_183 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_184 = __VLS_asFunctionalComponent(__VLS_183, new __VLS_183(__assign({ class: "text-center" })));
    var __VLS_185 = __VLS_184.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_184), false));
    var __VLS_187 = __VLS_186.slots.default;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h4 font-weight-bold" }));
    (__VLS_ctx.totalUrges);
    // @ts-ignore
    [totalUrges,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_186;
    var __VLS_181;
    var __VLS_176;
    var __VLS_188 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({
        cols: "12",
        sm: "4",
    }));
    var __VLS_190 = __VLS_189.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_189), false));
    var __VLS_192 = __VLS_191.slots.default;
    var __VLS_193 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
        variant: "tonal",
        color: "success",
    }));
    var __VLS_195 = __VLS_194.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "success",
        }], __VLS_functionalComponentArgsRest(__VLS_194), false));
    var __VLS_197 = __VLS_196.slots.default;
    var __VLS_198 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198(__assign({ class: "text-center" })));
    var __VLS_200 = __VLS_199.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_199), false));
    var __VLS_202 = __VLS_201.slots.default;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h4 font-weight-bold" }));
    (__VLS_ctx.averageIntensity);
    // @ts-ignore
    [averageIntensity,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_201;
    var __VLS_196;
    var __VLS_191;
    var __VLS_203 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_204 = __VLS_asFunctionalComponent(__VLS_203, new __VLS_203({
        cols: "12",
        sm: "4",
    }));
    var __VLS_205 = __VLS_204.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_204), false));
    var __VLS_207 = __VLS_206.slots.default;
    var __VLS_208 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_209 = __VLS_asFunctionalComponent(__VLS_208, new __VLS_208({
        variant: "tonal",
        color: "warning",
    }));
    var __VLS_210 = __VLS_209.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "warning",
        }], __VLS_functionalComponentArgsRest(__VLS_209), false));
    var __VLS_212 = __VLS_211.slots.default;
    var __VLS_213 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_214 = __VLS_asFunctionalComponent(__VLS_213, new __VLS_213(__assign({ class: "text-center" })));
    var __VLS_215 = __VLS_214.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_214), false));
    var __VLS_217 = __VLS_216.slots.default;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h4 font-weight-bold" }));
    (__VLS_ctx.lastUrgeTime);
    // @ts-ignore
    [lastUrgeTime,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_216;
    var __VLS_211;
    var __VLS_206;
    var __VLS_171;
    var __VLS_218 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218(__assign({ class: "mt-2" })));
    var __VLS_220 = __VLS_219.apply(void 0, __spreadArray([__assign({ class: "mt-2" })], __VLS_functionalComponentArgsRest(__VLS_219), false));
    var __VLS_222 = __VLS_221.slots.default;
    var __VLS_223 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_224 = __VLS_asFunctionalComponent(__VLS_223, new __VLS_223({
        cols: "12",
        sm: "4",
    }));
    var __VLS_225 = __VLS_224.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_224), false));
    var __VLS_227 = __VLS_226.slots.default;
    var __VLS_228 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({
        variant: "tonal",
        color: "success",
    }));
    var __VLS_230 = __VLS_229.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "success",
        }], __VLS_functionalComponentArgsRest(__VLS_229), false));
    var __VLS_232 = __VLS_231.slots.default;
    var __VLS_233 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233(__assign({ class: "text-center" })));
    var __VLS_235 = __VLS_234.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_234), false));
    var __VLS_237 = __VLS_236.slots.default;
    var __VLS_238 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
        color: "success",
        size: "large",
    }));
    var __VLS_240 = __VLS_239.apply(void 0, __spreadArray([{
            color: "success",
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_239), false));
    var __VLS_242 = __VLS_241.slots.default;
    var __VLS_241;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.resistedCount);
    // @ts-ignore
    [resistedCount,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_236;
    var __VLS_231;
    var __VLS_226;
    var __VLS_243 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_244 = __VLS_asFunctionalComponent(__VLS_243, new __VLS_243({
        cols: "12",
        sm: "4",
    }));
    var __VLS_245 = __VLS_244.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_244), false));
    var __VLS_247 = __VLS_246.slots.default;
    var __VLS_248 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_249 = __VLS_asFunctionalComponent(__VLS_248, new __VLS_248({
        variant: "tonal",
        color: "error",
    }));
    var __VLS_250 = __VLS_249.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "error",
        }], __VLS_functionalComponentArgsRest(__VLS_249), false));
    var __VLS_252 = __VLS_251.slots.default;
    var __VLS_253 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253(__assign({ class: "text-center" })));
    var __VLS_255 = __VLS_254.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_254), false));
    var __VLS_257 = __VLS_256.slots.default;
    var __VLS_258 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
        color: "error",
        size: "large",
    }));
    var __VLS_260 = __VLS_259.apply(void 0, __spreadArray([{
            color: "error",
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_259), false));
    var __VLS_262 = __VLS_261.slots.default;
    var __VLS_261;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.smokingCount);
    // @ts-ignore
    [smokingCount,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_256;
    var __VLS_251;
    var __VLS_246;
    var __VLS_263 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_264 = __VLS_asFunctionalComponent(__VLS_263, new __VLS_263({
        cols: "12",
        sm: "4",
    }));
    var __VLS_265 = __VLS_264.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "4",
        }], __VLS_functionalComponentArgsRest(__VLS_264), false));
    var __VLS_267 = __VLS_266.slots.default;
    var __VLS_268 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_269 = __VLS_asFunctionalComponent(__VLS_268, new __VLS_268({
        variant: "tonal",
        color: "orange",
    }));
    var __VLS_270 = __VLS_269.apply(void 0, __spreadArray([{
            variant: "tonal",
            color: "orange",
        }], __VLS_functionalComponentArgsRest(__VLS_269), false));
    var __VLS_272 = __VLS_271.slots.default;
    var __VLS_273 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    VCardText;
    // @ts-ignore
    var __VLS_274 = __VLS_asFunctionalComponent(__VLS_273, new __VLS_273(__assign({ class: "text-center" })));
    var __VLS_275 = __VLS_274.apply(void 0, __spreadArray([__assign({ class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_274), false));
    var __VLS_277 = __VLS_276.slots.default;
    var __VLS_278 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({
        color: "orange",
        size: "large",
    }));
    var __VLS_280 = __VLS_279.apply(void 0, __spreadArray([{
            color: "orange",
            size: "large",
        }], __VLS_functionalComponentArgsRest(__VLS_279), false));
    var __VLS_282 = __VLS_281.slots.default;
    var __VLS_281;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-h5 font-weight-bold mt-2" }));
    (__VLS_ctx.gumCount);
    // @ts-ignore
    [gumCount,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption" }));
    var __VLS_276;
    var __VLS_271;
    var __VLS_266;
    var __VLS_221;
}
var __VLS_19;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-md-right']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['my-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
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
