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
var storageService_1 = require("@/services/storageService");
var emit = defineEmits(['urgeRecorded']);
var intensity = (0, vue_1.ref)(5);
var isRecording = (0, vue_1.ref)(false);
var showSuccessMessage = (0, vue_1.ref)(false);
var urgeType = (0, vue_1.ref)('resisted');
var cardTitle = (0, vue_1.computed)(function () {
    return 'Track a New Urge';
});
// Computed property to get button color based on selected urge type
var buttonColor = (0, vue_1.computed)(function () {
    switch (urgeType.value) {
        case 'resisted':
            return 'success'; // Green
        case 'smoking':
            return 'error'; // Red
        case 'gum':
            return 'orange'; // Orange
        default:
            return 'primary'; // Blue (fallback)
    }
});
// Computed property for card background gradient class based on selected urge type
var cardGradientClass = (0, vue_1.computed)(function () {
    switch (urgeType.value) {
        case 'resisted':
            return 'gradient-success'; // Green gradient
        case 'smoking':
            return 'gradient-error'; // Red gradient
        case 'gum':
            return 'gradient-orange'; // Orange gradient
        default:
            return 'gradient-primary'; // Blue gradient (fallback)
    }
});
var getIntensityColor = function (value) {
    if (value <= 3)
        return 'success';
    if (value <= 6)
        return 'warning';
    return 'error';
};
var getIntensityLabel = function (value) {
    if (value <= 2)
        return 'Very Low';
    if (value <= 4)
        return 'Low';
    if (value <= 6)
        return 'Moderate';
    if (value <= 8)
        return 'High';
    return 'Very High';
};
var getAlertType = function () {
    switch (urgeType.value) {
        case 'resisted':
            return 'success';
        case 'smoking':
            return 'error';
        case 'gum':
            return 'warning';
        default:
            return 'info';
    }
};
var getSuccessMessage = function () {
    switch (urgeType.value) {
        case 'resisted':
            return 'Urge resisted successfully! Keep going strong! 💪';
        case 'smoking':
            return 'Recorded. Don\'t be too hard on yourself - tomorrow is a new day! 🌟';
        case 'gum':
            return 'Nicotine gum recorded.🌱 Better than smoking!';
        default:
            return 'Urge recorded successfully 📊';
    }
};
var recordUrge = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urgeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isRecording.value = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 4]);
                urgeData = {
                    intensity: intensity.value,
                    timestamp: new Date().toISOString(),
                    type: urgeType.value
                };
                return [4 /*yield*/, storageService_1.storageService.saveUrge(urgeData)];
            case 2:
                _a.sent();
                emit('urgeRecorded');
                showSuccessMessage.value = true;
                // Auto-hide success message after 3 seconds
                setTimeout(function () {
                    showSuccessMessage.value = false;
                }, 3000);
                return [3 /*break*/, 4];
            case 3:
                isRecording.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Load and save urge type preference
(0, vue_1.onMounted)(function () {
    var savedUrgeType = storageService_1.storageService.getUrgeTypePreference();
    if (savedUrgeType && (savedUrgeType === 'resisted' || savedUrgeType === 'smoking' || savedUrgeType === 'gum')) {
        urgeType.value = savedUrgeType;
    }
});
// Watch for urge type changes and save preference
(0, vue_1.watch)(urgeType, function (newType) {
    storageService_1.storageService.saveUrgeTypePreference(newType);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['urge-tracker-card']} */ ;
/** @type {__VLS_StyleScopedClasses['urge-tracker-card']} */ ;
var __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ class: "h-100 urge-tracker-card" }, { flat: true }), { class: (__VLS_ctx.cardGradientClass) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ class: "h-100 urge-tracker-card" }, { flat: true }), { class: (__VLS_ctx.cardGradientClass) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
// @ts-ignore
[cardGradientClass,];
var __VLS_6 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "text-h5 font-weight-medium pa-6 text-center" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "text-h5 font-weight-medium pa-6 text-center" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
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
(__VLS_ctx.cardTitle);
// @ts-ignore
[cardTitle,];
var __VLS_9;
var __VLS_16 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(__assign({ class: "px-6 pb-2" })));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ class: "px-6 pb-2" })], __VLS_functionalComponentArgsRest(__VLS_17), false));
var __VLS_20 = __VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-center mb-4" }));
var __VLS_21 = {}.VChip;
/** @type {[typeof __VLS_components.VChip, typeof __VLS_components.vChip, typeof __VLS_components.VChip, typeof __VLS_components.vChip, ]} */ ;
// @ts-ignore
VChip;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign({ color: "primary", size: "large" }, { class: "text-h6 font-weight-bold" })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ color: "primary", size: "large" }, { class: "text-h6 font-weight-bold" })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25 = __VLS_24.slots.default;
(__VLS_ctx.intensity);
// @ts-ignore
[intensity,];
var __VLS_24;
var __VLS_26 = {}.VSlider;
/** @type {[typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, typeof __VLS_components.VSlider, typeof __VLS_components.vSlider, ]} */ ;
// @ts-ignore
VSlider;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26(__assign(__assign({ modelValue: (__VLS_ctx.intensity), min: (1), max: (10), step: (1), color: "primary", thumbLabel: "always", trackColor: "grey-lighten-2" }, { class: "mb-4" }), { trackFillColor: "primary" })));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.intensity), min: (1), max: (10), step: (1), color: "primary", thumbLabel: "always", trackColor: "grey-lighten-2" }, { class: "mb-4" }), { trackFillColor: "primary" })], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_30 = __VLS_29.slots.default;
// @ts-ignore
[intensity,];
{
    var __VLS_31 = __VLS_29.slots["thumb-label"];
    var modelValue = __VLS_getSlotParameters(__VLS_31)[0].modelValue;
    (modelValue);
}
var __VLS_29;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "d-flex justify-space-between text-caption text-medium-emphasis mb-4" }));
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
(__VLS_ctx.getIntensityLabel(__VLS_ctx.intensity));
// @ts-ignore
[intensity, getIntensityLabel,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
if (__VLS_ctx.showSuccessMessage) {
    // @ts-ignore
    [showSuccessMessage,];
    var __VLS_32 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(__assign(__assign(__assign({ 'onClick:close': {} }, { type: (__VLS_ctx.getAlertType()), variant: "tonal" }), { class: "mb-4" }), { closable: true })));
    var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onClick:close': {} }, { type: (__VLS_ctx.getAlertType()), variant: "tonal" }), { class: "mb-4" }), { closable: true })], __VLS_functionalComponentArgsRest(__VLS_33), false));
    var __VLS_36 = void 0;
    var __VLS_37 = void 0;
    var __VLS_38 = ({ 'click:close': {} },
        { 'onClick:close': function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.showSuccessMessage))
                    return;
                __VLS_ctx.showSuccessMessage = false;
                // @ts-ignore
                [showSuccessMessage, getAlertType,];
            } });
    var __VLS_39 = __VLS_35.slots.default;
    (__VLS_ctx.getSuccessMessage());
    // @ts-ignore
    [getSuccessMessage,];
    var __VLS_35;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "mb-4" }));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-caption text-medium-emphasis mb-3 text-center" }));
var __VLS_40 = {}.VRadioGroup;
/** @type {[typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, typeof __VLS_components.VRadioGroup, typeof __VLS_components.vRadioGroup, ]} */ ;
// @ts-ignore
VRadioGroup;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    modelValue: (__VLS_ctx.urgeType),
    hideDetails: true,
}));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.urgeType),
        hideDetails: true,
    }], __VLS_functionalComponentArgsRest(__VLS_41), false));
var __VLS_44 = __VLS_43.slots.default;
// @ts-ignore
[urgeType,];
var __VLS_45 = {}.VRadio;
/** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
// @ts-ignore
VRadio;
// @ts-ignore
var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45(__assign({ value: "resisted", color: "success" }, { class: "mb-2" })));
var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([__assign({ value: "resisted", color: "success" }, { class: "mb-2" })], __VLS_functionalComponentArgsRest(__VLS_46), false));
var __VLS_49 = __VLS_48.slots.default;
{
    var __VLS_50 = __VLS_48.slots.label;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "d-flex align-center" }));
    var __VLS_51 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51(__assign({ color: "success", size: "small" }, { class: "mr-2" })));
    var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([__assign({ color: "success", size: "small" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_52), false));
    var __VLS_55 = __VLS_54.slots.default;
    var __VLS_54;
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "text-body-2" }));
}
var __VLS_48;
var __VLS_56 = {}.VRadio;
/** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
// @ts-ignore
VRadio;
// @ts-ignore
var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56(__assign({ value: "smoking", color: "error" }, { class: "mb-2" })));
var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([__assign({ value: "smoking", color: "error" }, { class: "mb-2" })], __VLS_functionalComponentArgsRest(__VLS_57), false));
var __VLS_60 = __VLS_59.slots.default;
{
    var __VLS_61 = __VLS_59.slots.label;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "d-flex align-center" }));
    var __VLS_62 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62(__assign({ color: "error", size: "small" }, { class: "mr-2" })));
    var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([__assign({ color: "error", size: "small" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_63), false));
    var __VLS_66 = __VLS_65.slots.default;
    var __VLS_65;
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "text-body-2" }));
}
var __VLS_59;
var __VLS_67 = {}.VRadio;
/** @type {[typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, typeof __VLS_components.VRadio, typeof __VLS_components.vRadio, ]} */ ;
// @ts-ignore
VRadio;
// @ts-ignore
var __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67(__assign({ value: "gum", color: "orange" }, { class: "mb-2" })));
var __VLS_69 = __VLS_68.apply(void 0, __spreadArray([__assign({ value: "gum", color: "orange" }, { class: "mb-2" })], __VLS_functionalComponentArgsRest(__VLS_68), false));
var __VLS_71 = __VLS_70.slots.default;
{
    var __VLS_72 = __VLS_70.slots.label;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "d-flex align-center" }));
    var __VLS_73 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73(__assign({ color: "orange", size: "small" }, { class: "mr-2" })));
    var __VLS_75 = __VLS_74.apply(void 0, __spreadArray([__assign({ color: "orange", size: "small" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_74), false));
    var __VLS_77 = __VLS_76.slots.default;
    var __VLS_76;
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "text-body-2" }));
}
var __VLS_70;
var __VLS_43;
var __VLS_19;
var __VLS_78 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
var __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78(__assign({ class: "px-6 pb-6" })));
var __VLS_80 = __VLS_79.apply(void 0, __spreadArray([__assign({ class: "px-6 pb-6" })], __VLS_functionalComponentArgsRest(__VLS_79), false));
var __VLS_82 = __VLS_81.slots.default;
var __VLS_83 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83(__assign({ 'onClick': {} }, { loading: (__VLS_ctx.isRecording), color: (__VLS_ctx.buttonColor), variant: "flat", size: "large", block: true })));
var __VLS_85 = __VLS_84.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { loading: (__VLS_ctx.isRecording), color: (__VLS_ctx.buttonColor), variant: "flat", size: "large", block: true })], __VLS_functionalComponentArgsRest(__VLS_84), false));
var __VLS_87;
var __VLS_88;
var __VLS_89 = ({ click: {} },
    { onClick: (__VLS_ctx.recordUrge) });
var __VLS_90 = __VLS_86.slots.default;
// @ts-ignore
[isRecording, buttonColor, recordUrge,];
var __VLS_91 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
VIcon;
// @ts-ignore
var __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91(__assign({ class: "mr-2" })));
var __VLS_93 = __VLS_92.apply(void 0, __spreadArray([__assign({ class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_92), false));
var __VLS_95 = __VLS_94.slots.default;
var __VLS_94;
var __VLS_86;
var __VLS_81;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
/** @type {__VLS_StyleScopedClasses['urge-tracker-card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    emits: {},
});
exports.default = {};
