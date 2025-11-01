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
// ...existing code...
var vue_1 = require("vue");
var vuetify_1 = require("vuetify");
var UrgeTracker_vue_1 = require("@/components/UrgeTracker.vue");
var UrgeChart_vue_1 = require("@/components/UrgeChart.vue");
var UrgeTimers_vue_1 = require("@/components/UrgeTimers.vue");
var IntervalChart_vue_1 = require("@/components/IntervalChart.vue");
var storageService_1 = require("@/services/storageService");
var theme = (0, vuetify_1.useTheme)();
var isDarkMode = (0, vue_1.computed)(function () { return theme.global.current.value.dark; });
var urgeChart = (0, vue_1.ref)(null);
var urgeTimers = (0, vue_1.ref)(null);
var intervalChart = (0, vue_1.ref)(null);
var hasUrges = (0, vue_1.ref)(false);
var fileInput = (0, vue_1.ref)(null);
var importDialog = (0, vue_1.ref)(false);
var importOption = (0, vue_1.ref)('merge');
var selectedFile = (0, vue_1.ref)(null);
var selectedFileName = (0, vue_1.ref)('');
var isImporting = (0, vue_1.ref)(false);
var snackbar = (0, vue_1.ref)(false);
var snackbarMessage = (0, vue_1.ref)('');
var snackbarColor = (0, vue_1.ref)('success');
var handleUrgeRecorded = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, ((_a = urgeChart.value) === null || _a === void 0 ? void 0 : _a.loadChartData())];
            case 1:
                _d.sent();
                return [4 /*yield*/, ((_b = urgeTimers.value) === null || _b === void 0 ? void 0 : _b.refresh())];
            case 2:
                _d.sent();
                return [4 /*yield*/, ((_c = intervalChart.value) === null || _c === void 0 ? void 0 : _c.loadChartData())];
            case 3:
                _d.sent();
                return [4 /*yield*/, checkHasUrges()];
            case 4:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
var checkHasUrges = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urges;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storageService_1.storageService.getUrges()];
            case 1:
                urges = _a.sent();
                hasUrges.value = urges.length > 0;
                return [2 /*return*/];
        }
    });
}); };
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkHasUrges()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var downloadData = function () {
    storageService_1.storageService.downloadUrges();
};
var triggerFileInput = function () {
    var _a;
    (_a = fileInput.value) === null || _a === void 0 ? void 0 : _a.click();
};
var handleFileSelect = function (event) {
    var _a;
    var target = event.target;
    var file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        if (!file.name.endsWith('.json')) {
            showSnackbar('Please select a valid JSON file', 'error');
            return;
        }
        selectedFile.value = file;
        selectedFileName.value = file.name;
        importDialog.value = true;
    }
    // Reset the input so the same file can be selected again
    target.value = '';
};
var performImport = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mergeWithExisting, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!selectedFile.value)
                    return [2 /*return*/];
                isImporting.value = true;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 8]);
                mergeWithExisting = importOption.value === 'merge';
                return [4 /*yield*/, storageService_1.storageService.importUrges(selectedFile.value, mergeWithExisting)
                    // Refresh the chart, timers, and interval chart with new data
                ];
            case 2:
                _d.sent();
                // Refresh the chart, timers, and interval chart with new data
                (_a = urgeChart.value) === null || _a === void 0 ? void 0 : _a.loadChartData();
                return [4 /*yield*/, ((_b = urgeTimers.value) === null || _b === void 0 ? void 0 : _b.refresh())];
            case 3:
                _d.sent();
                return [4 /*yield*/, ((_c = intervalChart.value) === null || _c === void 0 ? void 0 : _c.loadChartData())];
            case 4:
                _d.sent();
                return [4 /*yield*/, checkHasUrges()];
            case 5:
                _d.sent();
                importDialog.value = false;
                showSnackbar(mergeWithExisting
                    ? 'Data successfully merged with existing records'
                    : 'Data successfully imported (existing data replaced)', 'success');
                selectedFile.value = null;
                selectedFileName.value = '';
                return [3 /*break*/, 8];
            case 6:
                error_1 = _d.sent();
                showSnackbar("Import failed: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'), 'error');
                return [3 /*break*/, 8];
            case 7:
                isImporting.value = false;
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var showSnackbar = function (message, color) {
    snackbarMessage.value = message;
    snackbarColor.value = color;
    snackbar.value = true;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['home-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['v-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['v-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "home-responsive" }, { class: ({ 'dark-mode': __VLS_ctx.isDarkMode }) }));
// @ts-ignore
[isDarkMode,];
var __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
VContainer;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ fluid: true }, { class: "pa-0 pt-16" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ fluid: true }, { class: "pa-0 pt-16" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
var __VLS_5 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ class: "mb-8 mt-4 header-row" })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ class: "mb-8 mt-4 header-row" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9 = __VLS_8.slots.default;
var __VLS_10 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ cols: "12" }, { class: "text-center" })));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ cols: "12" }, { class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
var __VLS_14 = __VLS_13.slots.default;
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)(__assign({ class: "font-weight-light mb-2" }, { class: (__VLS_ctx.hasUrges ? 'text-h5' : 'text-h3') }));
// @ts-ignore
[hasUrges,];
if (!__VLS_ctx.hasUrges) {
    // @ts-ignore
    [hasUrges,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "text-subtitle-1 text-medium-emphasis subtitle" }));
}
else {
    /** @type {[typeof UrgeTimers, ]} */ ;
    // @ts-ignore
    var __VLS_15 = __VLS_asFunctionalComponent(UrgeTimers_vue_1.default, new UrgeTimers_vue_1.default({
        ref: "urgeTimers",
    }));
    var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
            ref: "urgeTimers",
        }], __VLS_functionalComponentArgsRest(__VLS_15), false));
    /** @type {typeof __VLS_ctx.urgeTimers} */ ;
    var __VLS_18 = {};
    // @ts-ignore
    [urgeTimers,];
    var __VLS_17;
}
var __VLS_13;
var __VLS_8;
var __VLS_21 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign({ class: "main-content" }, { align: "stretch", justify: "center", noGutters: true })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ class: "main-content" }, { align: "stretch", justify: "center", noGutters: true })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25 = __VLS_24.slots.default;
var __VLS_26 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26(__assign({ cols: "12", md: "6", lg: "5" }, { class: "pa-4" })));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([__assign({ cols: "12", md: "6", lg: "5" }, { class: "pa-4" })], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_30 = __VLS_29.slots.default;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "content-wrapper h-100" }));
/** @type {[typeof UrgeTracker, ]} */ ;
// @ts-ignore
var __VLS_31 = __VLS_asFunctionalComponent(UrgeTracker_vue_1.default, new UrgeTracker_vue_1.default(__assign({ 'onUrgeRecorded': {} })));
var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([__assign({ 'onUrgeRecorded': {} })], __VLS_functionalComponentArgsRest(__VLS_31), false));
var __VLS_34;
var __VLS_35;
var __VLS_36 = ({ urgeRecorded: {} },
    { onUrgeRecorded: (__VLS_ctx.handleUrgeRecorded) });
// @ts-ignore
[handleUrgeRecorded,];
var __VLS_33;
var __VLS_29;
var __VLS_38 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38(__assign({ cols: "12", md: "6", lg: "7" }, { class: "pa-4" })));
var __VLS_40 = __VLS_39.apply(void 0, __spreadArray([__assign({ cols: "12", md: "6", lg: "7" }, { class: "pa-4" })], __VLS_functionalComponentArgsRest(__VLS_39), false));
var __VLS_42 = __VLS_41.slots.default;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "content-wrapper h-100" }));
/** @type {[typeof UrgeChart, ]} */ ;
// @ts-ignore
var __VLS_43 = __VLS_asFunctionalComponent(UrgeChart_vue_1.default, new UrgeChart_vue_1.default({
    ref: "urgeChart",
}));
var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([{
        ref: "urgeChart",
    }], __VLS_functionalComponentArgsRest(__VLS_43), false));
/** @type {typeof __VLS_ctx.urgeChart} */ ;
var __VLS_46 = {};
// @ts-ignore
[urgeChart,];
var __VLS_45;
var __VLS_41;
var __VLS_24;
if (__VLS_ctx.hasUrges) {
    // @ts-ignore
    [hasUrges,];
    var __VLS_49 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49(__assign({ class: "main-content" }, { justify: "center", noGutters: true })));
    var __VLS_51 = __VLS_50.apply(void 0, __spreadArray([__assign({ class: "main-content" }, { justify: "center", noGutters: true })], __VLS_functionalComponentArgsRest(__VLS_50), false));
    var __VLS_53 = __VLS_52.slots.default;
    var __VLS_54 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54(__assign({ cols: "12" }, { class: "pa-4" })));
    var __VLS_56 = __VLS_55.apply(void 0, __spreadArray([__assign({ cols: "12" }, { class: "pa-4" })], __VLS_functionalComponentArgsRest(__VLS_55), false));
    var __VLS_58 = __VLS_57.slots.default;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "content-wrapper" }));
    /** @type {[typeof IntervalChart, ]} */ ;
    // @ts-ignore
    var __VLS_59 = __VLS_asFunctionalComponent(IntervalChart_vue_1.default, new IntervalChart_vue_1.default({
        ref: "intervalChart",
    }));
    var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{
            ref: "intervalChart",
        }], __VLS_functionalComponentArgsRest(__VLS_59), false));
    /** @type {typeof __VLS_ctx.intervalChart} */ ;
    var __VLS_62 = {};
    // @ts-ignore
    [intervalChart,];
    var __VLS_61;
    var __VLS_57;
    var __VLS_52;
}
var __VLS_65 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_66), false));
var __VLS_69 = __VLS_68.slots.default;
var __VLS_70 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70(__assign({ cols: "12" }, { class: "text-center" })));
var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([__assign({ cols: "12" }, { class: "text-center" })], __VLS_functionalComponentArgsRest(__VLS_71), false));
var __VLS_74 = __VLS_73.slots.default;
var __VLS_75 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75(__assign(__assign({ 'onClick': {} }, { color: "white", variant: "flat", size: "large", prependIcon: "mdi-download" }), { class: "action-button mr-2" })));
var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { color: "white", variant: "flat", size: "large", prependIcon: "mdi-download" }), { class: "action-button mr-2" })], __VLS_functionalComponentArgsRest(__VLS_76), false));
var __VLS_79;
var __VLS_80;
var __VLS_81 = ({ click: {} },
    { onClick: (__VLS_ctx.downloadData) });
var __VLS_82 = __VLS_78.slots.default;
// @ts-ignore
[downloadData,];
var __VLS_78;
var __VLS_83 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83(__assign(__assign({ 'onClick': {} }, { color: "white", variant: "flat", size: "large", prependIcon: "mdi-upload" }), { class: "action-button ml-2" })));
var __VLS_85 = __VLS_84.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { color: "white", variant: "flat", size: "large", prependIcon: "mdi-upload" }), { class: "action-button ml-2" })], __VLS_functionalComponentArgsRest(__VLS_84), false));
var __VLS_87;
var __VLS_88;
var __VLS_89 = ({ click: {} },
    { onClick: (__VLS_ctx.triggerFileInput) });
var __VLS_90 = __VLS_86.slots.default;
// @ts-ignore
[triggerFileInput,];
var __VLS_86;
__VLS_asFunctionalElement(__VLS_elements.input)(__assign(__assign({ onChange: (__VLS_ctx.handleFileSelect) }, { ref: "fileInput", type: "file", accept: ".json" }), { style: {} }));
/** @type {typeof __VLS_ctx.fileInput} */ ;
// @ts-ignore
[handleFileSelect, fileInput,];
var __VLS_73;
var __VLS_68;
var __VLS_91 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
VDialog;
// @ts-ignore
var __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
    modelValue: (__VLS_ctx.importDialog),
    maxWidth: "500",
}));
var __VLS_93 = __VLS_92.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.importDialog),
        maxWidth: "500",
    }], __VLS_functionalComponentArgsRest(__VLS_92), false));
var __VLS_95 = __VLS_94.slots.default;
// @ts-ignore
[importDialog,];
var __VLS_96 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
var __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
var __VLS_98 = __VLS_97.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_97), false));
var __VLS_100 = __VLS_99.slots.default;
var __VLS_101 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
var __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101(__assign({ class: "text-h5" })));
var __VLS_103 = __VLS_102.apply(void 0, __spreadArray([__assign({ class: "text-h5" })], __VLS_functionalComponentArgsRest(__VLS_102), false));
var __VLS_105 = __VLS_104.slots.default;
var __VLS_104;
var __VLS_106 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
var __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({}));
var __VLS_108 = __VLS_107.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_107), false));
var __VLS_110 = __VLS_109.slots.default;
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-4" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.selectedFileName);
// @ts-ignore
[selectedFileName,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
var __VLS_111 = {}.VRadioGroup;
/** @type {[typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, ]} */ ;
// @ts-ignore
VRadioGroup;
// @ts-ignore
var __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111(__assign({ modelValue: (__VLS_ctx.importOption) }, { class: "mt-4" })));
var __VLS_113 = __VLS_112.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.importOption) }, { class: "mt-4" })], __VLS_functionalComponentArgsRest(__VLS_112), false));
var __VLS_115 = __VLS_114.slots.default;
// @ts-ignore
[importOption,];
var __VLS_116 = {}.VRadio;
/** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
// @ts-ignore
VRadio;
// @ts-ignore
var __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    label: "Replace existing data (This will overwrite all current data)",
    value: "replace",
}));
var __VLS_118 = __VLS_117.apply(void 0, __spreadArray([{
        label: "Replace existing data (This will overwrite all current data)",
        value: "replace",
    }], __VLS_functionalComponentArgsRest(__VLS_117), false));
var __VLS_121 = {}.VRadio;
/** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
// @ts-ignore
VRadio;
// @ts-ignore
var __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    label: "Merge with existing data (Add imported data to current data)",
    value: "merge",
}));
var __VLS_123 = __VLS_122.apply(void 0, __spreadArray([{
        label: "Merge with existing data (Add imported data to current data)",
        value: "merge",
    }], __VLS_functionalComponentArgsRest(__VLS_122), false));
var __VLS_114;
var __VLS_109;
var __VLS_126 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
var __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
var __VLS_128 = __VLS_127.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_127), false));
var __VLS_130 = __VLS_129.slots.default;
var __VLS_131 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
var __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({}));
var __VLS_133 = __VLS_132.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_132), false));
var __VLS_136 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136(__assign({ 'onClick': {} }, { text: true })));
var __VLS_138 = __VLS_137.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { text: true })], __VLS_functionalComponentArgsRest(__VLS_137), false));
var __VLS_140;
var __VLS_141;
var __VLS_142 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.importDialog = false;
            // @ts-ignore
            [importDialog,];
        } });
var __VLS_143 = __VLS_139.slots.default;
var __VLS_139;
var __VLS_144 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144(__assign({ 'onClick': {} }, { color: "primary", variant: "flat", loading: (__VLS_ctx.isImporting) })));
var __VLS_146 = __VLS_145.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { color: "primary", variant: "flat", loading: (__VLS_ctx.isImporting) })], __VLS_functionalComponentArgsRest(__VLS_145), false));
var __VLS_148;
var __VLS_149;
var __VLS_150 = ({ click: {} },
    { onClick: (__VLS_ctx.performImport) });
var __VLS_151 = __VLS_147.slots.default;
// @ts-ignore
[isImporting, performImport,];
var __VLS_147;
var __VLS_129;
var __VLS_99;
var __VLS_94;
var __VLS_152 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
var __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({
    modelValue: (__VLS_ctx.snackbar),
    timeout: (3000),
    color: (__VLS_ctx.snackbarColor),
}));
var __VLS_154 = __VLS_153.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.snackbar),
        timeout: (3000),
        color: (__VLS_ctx.snackbarColor),
    }], __VLS_functionalComponentArgsRest(__VLS_153), false));
var __VLS_156 = __VLS_155.slots.default;
// @ts-ignore
[snackbar, snackbarColor,];
(__VLS_ctx.snackbarMessage);
// @ts-ignore
[snackbarMessage,];
{
    var __VLS_157 = __VLS_155.slots.actions;
    var __VLS_158 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    VBtn;
    // @ts-ignore
    var __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158(__assign({ 'onClick': {} }, { variant: "text" })));
    var __VLS_160 = __VLS_159.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { variant: "text" })], __VLS_functionalComponentArgsRest(__VLS_159), false));
    var __VLS_162 = void 0;
    var __VLS_163 = void 0;
    var __VLS_164 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.snackbar = false;
                // @ts-ignore
                [snackbar,];
            } });
    var __VLS_165 = __VLS_161.slots.default;
    var __VLS_161;
}
var __VLS_155;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['home-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['dark-mode']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-16']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-light']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
// @ts-ignore
var __VLS_19 = __VLS_18, __VLS_47 = __VLS_46, __VLS_63 = __VLS_62;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
