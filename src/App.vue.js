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
var vue_router_1 = require("vue-router");
var vuetify_1 = require("vuetify");
var vue_1 = require("vue");
var storageService_1 = require("@/services/storageService");
var DisclaimerModal_vue_1 = require("@/components/DisclaimerModal.vue");
var theme = (0, vuetify_1.useTheme)();
var currentThemePreference = (0, vue_1.ref)('system');
var showDisclaimer = (0, vue_1.ref)(false);
var disclaimerDeclined = (0, vue_1.ref)(false);
// Function to get system theme preference
var getSystemTheme = function () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
// Function to apply theme based on preference
var applyTheme = function (preference) {
    var actualTheme;
    if (preference === 'system') {
        actualTheme = getSystemTheme();
    }
    else {
        actualTheme = preference;
    }
    theme.global.name.value = actualTheme;
};
// Listen for system theme changes
var mediaQuery = null;
var handleSystemThemeChange = function (e) {
    // Only apply system theme if user preference is 'system'
    if (currentThemePreference.value === 'system') {
        var systemTheme = e.matches ? 'dark' : 'light';
        theme.global.name.value = systemTheme;
    }
};
// Computed property for theme icon and tooltip
var themeIcon = (0, vue_1.computed)(function () {
    switch (currentThemePreference.value) {
        case 'light':
            return 'mdi-weather-sunny';
        case 'dark':
            return 'mdi-weather-night';
        case 'system':
            return 'mdi-theme-light-dark';
        default:
            return 'mdi-theme-light-dark';
    }
});
var themeTooltip = (0, vue_1.computed)(function () {
    switch (currentThemePreference.value) {
        case 'light':
            return 'Current: Light theme - Click for Dark';
        case 'dark':
            return 'Current: Dark theme - Click for System';
        case 'system':
            return "Current: System theme (".concat(getSystemTheme(), ") - Click for Light");
        default:
            return 'Switch theme';
    }
});
// Load saved theme preference on app initialization
(0, vue_1.onMounted)(function () {
    // Check disclaimer acceptance first
    var disclaimerAccepted = storageService_1.storageService.getDisclaimerAccepted();
    if (!disclaimerAccepted) {
        showDisclaimer.value = true;
    }
    var savedTheme = storageService_1.storageService.getThemePreference();
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        currentThemePreference.value = savedTheme;
    }
    else {
        // Default to system theme if no preference is saved
        currentThemePreference.value = 'system';
        // Save the default preference
        storageService_1.storageService.saveThemePreference('system');
    }
    // Apply the theme
    applyTheme(currentThemePreference.value);
    // Set up system theme change listener
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
});
(0, vue_1.onUnmounted)(function () {
    // Clean up the event listener
    if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
});
function toggleTheme() {
    // Cycle through: light -> dark -> system -> light...
    var newTheme;
    switch (currentThemePreference.value) {
        case 'light':
            newTheme = 'dark';
            break;
        case 'dark':
            newTheme = 'system';
            break;
        case 'system':
        default:
            newTheme = 'light';
            break;
    }
    currentThemePreference.value = newTheme;
    applyTheme(newTheme);
    // Save theme preference to localStorage
    storageService_1.storageService.saveThemePreference(newTheme);
}
function handleDisclaimerAgree() {
    storageService_1.storageService.saveDisclaimerAccepted(true);
    showDisclaimer.value = false;
}
function handleDisclaimerDecline() {
    showDisclaimer.value = false;
    disclaimerDeclined.value = true;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.VApp;
/** @type {[typeof __VLS_components.VApp, typeof __VLS_components.vApp, typeof __VLS_components.VApp, typeof __VLS_components.vApp, ]} */ ;
// @ts-ignore
VApp;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
if (__VLS_ctx.showDisclaimer) {
    // @ts-ignore
    [showDisclaimer,];
    /** @type {[typeof DisclaimerModal, ]} */ ;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(DisclaimerModal_vue_1.default, new DisclaimerModal_vue_1.default(__assign({ 'onAgree': {} }, { 'onDecline': {} })));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ 'onAgree': {} }, { 'onDecline': {} })], __VLS_functionalComponentArgsRest(__VLS_6), false));
    var __VLS_9 = void 0;
    var __VLS_10 = void 0;
    var __VLS_11 = ({ agree: {} },
        { onAgree: (__VLS_ctx.handleDisclaimerAgree) });
    var __VLS_12 = ({ decline: {} },
        { onDecline: (__VLS_ctx.handleDisclaimerDecline) });
    // @ts-ignore
    [handleDisclaimerAgree, handleDisclaimerDecline,];
    var __VLS_8;
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: ({ 'app-blurred': __VLS_ctx.showDisclaimer }) }));
// @ts-ignore
[showDisclaimer,];
var __VLS_14 = {}.VAppBar;
/** @type {[typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, ]} */ ;
// @ts-ignore
VAppBar;
// @ts-ignore
var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    app: true,
    elevation: "0",
    color: "transparent",
    absolute: true,
}));
var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
        app: true,
        elevation: "0",
        color: "transparent",
        absolute: true,
    }], __VLS_functionalComponentArgsRest(__VLS_15), false));
var __VLS_18 = __VLS_17.slots.default;
var __VLS_19 = {}.VToolbarTitle;
/** @type {[typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, typeof __VLS_components.VToolbarTitle, typeof __VLS_components.vToolbarTitle, ]} */ ;
// @ts-ignore
VToolbarTitle;
// @ts-ignore
var __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19(__assign({ style: {} })));
var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([__assign({ style: {} })], __VLS_functionalComponentArgsRest(__VLS_20), false));
var __VLS_23 = __VLS_22.slots.default;
var __VLS_22;
var __VLS_24 = {}.VSpacer;
/** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
// @ts-ignore
VSpacer;
// @ts-ignore
var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_25), false));
var __VLS_29 = {}.VTooltip;
/** @type {[typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, typeof __VLS_components.VTooltip, typeof __VLS_components.vTooltip, ]} */ ;
// @ts-ignore
VTooltip;
// @ts-ignore
var __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    text: (__VLS_ctx.themeTooltip),
    location: "bottom",
}));
var __VLS_31 = __VLS_30.apply(void 0, __spreadArray([{
        text: (__VLS_ctx.themeTooltip),
        location: "bottom",
    }], __VLS_functionalComponentArgsRest(__VLS_30), false));
var __VLS_33 = __VLS_32.slots.default;
// @ts-ignore
[themeTooltip,];
{
    var __VLS_34 = __VLS_32.slots.activator;
    var props = __VLS_getSlotParameters(__VLS_34)[0].props;
    var __VLS_35 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    VBtn;
    // @ts-ignore
    var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(__assign(__assign(__assign({ 'onClick': {} }, { icon: true, variant: "text" }), (props)), { class: ({ 'theme-system': __VLS_ctx.currentThemePreference === 'system' }) })));
    var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onClick': {} }, { icon: true, variant: "text" }), (props)), { class: ({ 'theme-system': __VLS_ctx.currentThemePreference === 'system' }) })], __VLS_functionalComponentArgsRest(__VLS_36), false));
    var __VLS_39 = void 0;
    var __VLS_40 = void 0;
    var __VLS_41 = ({ click: {} },
        { onClick: (__VLS_ctx.toggleTheme) });
    var __VLS_42 = __VLS_38.slots.default;
    // @ts-ignore
    [currentThemePreference, toggleTheme,];
    var __VLS_43 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43(__assign({ style: {} })));
    var __VLS_45 = __VLS_44.apply(void 0, __spreadArray([__assign({ style: {} })], __VLS_functionalComponentArgsRest(__VLS_44), false));
    var __VLS_47 = __VLS_46.slots.default;
    (__VLS_ctx.themeIcon);
    // @ts-ignore
    [themeIcon,];
    var __VLS_46;
    var __VLS_38;
}
var __VLS_32;
var __VLS_17;
var __VLS_48 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
VMain;
// @ts-ignore
var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(__assign({ class: "pa-0" })));
var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([__assign({ class: "pa-0" })], __VLS_functionalComponentArgsRest(__VLS_49), false));
var __VLS_52 = __VLS_51.slots.default;
if (__VLS_ctx.disclaimerDeclined) {
    // @ts-ignore
    [disclaimerDeclined,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "farewell-container" }));
    var __VLS_53 = {}.VContainer;
    /** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
    // @ts-ignore
    VContainer;
    // @ts-ignore
    var __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53(__assign({ class: "fill-height" })));
    var __VLS_55 = __VLS_54.apply(void 0, __spreadArray([__assign({ class: "fill-height" })], __VLS_functionalComponentArgsRest(__VLS_54), false));
    var __VLS_57 = __VLS_56.slots.default;
    var __VLS_58 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    var __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        align: "center",
        justify: "center",
    }));
    var __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{
            align: "center",
            justify: "center",
        }], __VLS_functionalComponentArgsRest(__VLS_59), false));
    var __VLS_62 = __VLS_61.slots.default;
    var __VLS_63 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    var __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        cols: "12",
        sm: "10",
        md: "8",
        lg: "6",
    }));
    var __VLS_65 = __VLS_64.apply(void 0, __spreadArray([{
            cols: "12",
            sm: "10",
            md: "8",
            lg: "6",
        }], __VLS_functionalComponentArgsRest(__VLS_64), false));
    var __VLS_67 = __VLS_66.slots.default;
    var __VLS_68 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    VCard;
    // @ts-ignore
    var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68(__assign({ class: "farewell-card pa-6 text-center" }, { elevation: "8" })));
    var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([__assign({ class: "farewell-card pa-6 text-center" }, { elevation: "8" })], __VLS_functionalComponentArgsRest(__VLS_69), false));
    var __VLS_72 = __VLS_71.slots.default;
    var __VLS_73 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    VIcon;
    // @ts-ignore
    var __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73(__assign({ icon: "mdi-hand-wave", size: "80", color: "primary" }, { class: "mb-4" })));
    var __VLS_75 = __VLS_74.apply(void 0, __spreadArray([__assign({ icon: "mdi-hand-wave", size: "80", color: "primary" }, { class: "mb-4" })], __VLS_functionalComponentArgsRest(__VLS_74), false));
    __VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)(__assign({ class: "text-h4 font-weight-bold mb-4" }));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "text-body-1 mb-6" }));
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-4" }));
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-4" }));
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "mb-0" }));
    var __VLS_78 = {}.VDivider;
    /** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
    // @ts-ignore
    VDivider;
    // @ts-ignore
    var __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78(__assign({ class: "my-4" })));
    var __VLS_80 = __VLS_79.apply(void 0, __spreadArray([__assign({ class: "my-4" })], __VLS_functionalComponentArgsRest(__VLS_79), false));
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)(__assign({ class: "text-body-2 text-grey" }));
    var __VLS_71;
    var __VLS_66;
    var __VLS_61;
    var __VLS_56;
}
else {
    var __VLS_83 = {}.RouterView;
    /** @type {[typeof __VLS_components.RouterView, ]} */ ;
    // @ts-ignore
    vue_router_1.RouterView;
    // @ts-ignore
    var __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({}));
    var __VLS_85 = __VLS_84.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_84), false));
}
var __VLS_51;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['app-blurred']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-system']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['farewell-container']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-height']} */ ;
/** @type {__VLS_StyleScopedClasses['farewell-card']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
