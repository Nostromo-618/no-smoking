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
var emit = defineEmits();
var handleAgree = function () {
    emit('agree');
};
var handleDecline = function () {
    emit('decline');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['disclaimer-text']} */ ;
var __VLS_0 = {}.VDialog;
/** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
// @ts-ignore
VDialog;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: true,
    persistent: true,
    maxWidth: "700",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        modelValue: true,
        persistent: true,
        maxWidth: "700",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
var __VLS_6 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "disclaimer-card" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "disclaimer-card" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
var __VLS_10 = __VLS_9.slots.default;
var __VLS_11 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(__assign({ class: "text-h5 font-weight-bold mb-4" })));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([__assign({ class: "text-h5 font-weight-bold mb-4" })], __VLS_functionalComponentArgsRest(__VLS_12), false));
var __VLS_15 = __VLS_14.slots.default;
var __VLS_14;
var __VLS_16 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(__assign({ class: "disclaimer-text" })));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ class: "disclaimer-text" })], __VLS_functionalComponentArgsRest(__VLS_17), false));
var __VLS_20 = __VLS_19.slots.default;
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-3" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-3" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-3" }));
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-3" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-3" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-0" }));
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
var __VLS_19;
var __VLS_21 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
VCardActions;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign({ class: "pa-4 pt-0" })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ class: "pa-4 pt-0" })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25 = __VLS_24.slots.default;
var __VLS_26 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_31 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31(__assign({ 'onClick': {} }, { color: "grey", variant: "outlined", size: "large" })));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { color: "grey", variant: "outlined", size: "large" })], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_35;
var __VLS_36;
var __VLS_37 = ({ click: {} },
    { onClick: (__VLS_ctx.handleDecline) });
var __VLS_38 = __VLS_34.slots.default;
// @ts-ignore
[handleDecline,];
var __VLS_34;
var __VLS_39 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
var __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39(__assign({ 'onClick': {} }, { color: "primary", variant: "elevated", size: "large" })));
var __VLS_41 = __VLS_40.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { color: "primary", variant: "elevated", size: "large" })], __VLS_functionalComponentArgsRest(__VLS_40), false));
var __VLS_43;
var __VLS_44;
var __VLS_45 = ({ click: {} },
    { onClick: (__VLS_ctx.handleAgree) });
var __VLS_46 = __VLS_42.slots.default;
// @ts-ignore
[handleAgree,];
var __VLS_42;
var __VLS_24;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['disclaimer-card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-text']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-0']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
});
exports.default = {};
