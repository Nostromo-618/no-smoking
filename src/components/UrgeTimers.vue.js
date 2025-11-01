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
var lastResisted = (0, vue_1.ref)(null);
var lastSmoking = (0, vue_1.ref)(null);
var lastGum = (0, vue_1.ref)(null);
// Current time (updates every second)
var currentTime = (0, vue_1.ref)(new Date());
var intervalId = null;
// Computed property to check if we have any urges
var hasAnyUrges = (0, vue_1.computed)(function () {
    return lastResisted.value || lastSmoking.value || lastGum.value;
});
// Format time difference as HH:MM:SS
var formatTimeDifference = function (startDate) {
    var now = currentTime.value;
    var diffMs = now.getTime() - startDate.getTime();
    // Calculate hours, minutes, seconds
    var totalSeconds = Math.floor(diffMs / 1000);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    // Format as HH:MM:SS
    return "".concat(String(hours).padStart(2, '0'), ":").concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
};
// Computed timers for each type
var resistedTimer = (0, vue_1.computed)(function () {
    return lastResisted.value ? formatTimeDifference(lastResisted.value) : '00:00:00';
});
var smokingTimer = (0, vue_1.computed)(function () {
    return lastSmoking.value ? formatTimeDifference(lastSmoking.value) : '00:00:00';
});
var gumTimer = (0, vue_1.computed)(function () {
    return lastGum.value ? formatTimeDifference(lastGum.value) : '00:00:00';
});
// Load the last timestamp for each urge type
var loadLastUrges = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urges, i, urge, urgeType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storageService_1.storageService.getUrges()];
            case 1:
                urges = _a.sent();
                if (urges.length === 0) {
                    return [2 /*return*/];
                }
                // Find the most recent urge of each type
                // Iterate from the end (most recent) to the beginning
                for (i = urges.length - 1; i >= 0; i--) {
                    urge = urges[i];
                    urgeType = urge.type || 'resisted' // Default to 'resisted' for backward compatibility
                    ;
                    if (urgeType === 'resisted' && !lastResisted.value) {
                        lastResisted.value = new Date(urge.timestamp);
                    }
                    else if (urgeType === 'smoking' && !lastSmoking.value) {
                        lastSmoking.value = new Date(urge.timestamp);
                    }
                    else if (urgeType === 'gum' && !lastGum.value) {
                        lastGum.value = new Date(urge.timestamp);
                    }
                    // Break if we found all three types
                    if (lastResisted.value && lastSmoking.value && lastGum.value) {
                        break;
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
// Update current time every second
var startTimer = function () {
    intervalId = window.setInterval(function () {
        currentTime.value = new Date();
    }, 1000);
};
var stopTimer = function () {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
};
// Expose method to reload data (called when new urge is recorded)
var refresh = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Reset values
                lastResisted.value = null;
                lastSmoking.value = null;
                lastGum.value = null;
                // Reload
                return [4 /*yield*/, loadLastUrges()];
            case 1:
                // Reload
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadLastUrges()];
            case 1:
                _a.sent();
                startTimer();
                return [2 /*return*/];
        }
    });
}); });
(0, vue_1.onUnmounted)(function () {
    stopTimer();
});
// Expose the refresh method so parent can call it
var __VLS_exposed = { refresh: refresh };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['urge-timers']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-value']} */ ;
if (__VLS_ctx.hasAnyUrges) {
    // @ts-ignore
    [hasAnyUrges,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "urge-timers" }));
    if (__VLS_ctx.lastResisted) {
        // @ts-ignore
        [lastResisted,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "timer-item timer-success" }));
        var __VLS_0 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        VIcon;
        // @ts-ignore
        var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ size: "small", color: "success" }, { class: "mr-2" })));
        var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ size: "small", color: "success" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
        var __VLS_4 = __VLS_3.slots.default;
        var __VLS_3;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-label" }));
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-value" }));
        (__VLS_ctx.resistedTimer);
        // @ts-ignore
        [resistedTimer,];
    }
    if (__VLS_ctx.lastSmoking) {
        // @ts-ignore
        [lastSmoking,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "timer-item timer-error" }));
        var __VLS_5 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        VIcon;
        // @ts-ignore
        var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ size: "small", color: "error" }, { class: "mr-2" })));
        var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ size: "small", color: "error" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
        var __VLS_9 = __VLS_8.slots.default;
        var __VLS_8;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-label" }));
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-value" }));
        (__VLS_ctx.smokingTimer);
        // @ts-ignore
        [smokingTimer,];
    }
    if (__VLS_ctx.lastGum) {
        // @ts-ignore
        [lastGum,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "timer-item timer-orange" }));
        var __VLS_10 = {}.VIcon;
        /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
        // @ts-ignore
        VIcon;
        // @ts-ignore
        var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ size: "small", color: "orange" }, { class: "mr-2" })));
        var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ size: "small", color: "orange" }, { class: "mr-2" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
        var __VLS_14 = __VLS_13.slots.default;
        var __VLS_13;
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-label" }));
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "timer-value" }));
        (__VLS_ctx.gumTimer);
        // @ts-ignore
        [gumTimer,];
    }
}
/** @type {__VLS_StyleScopedClasses['urge-timers']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-success']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-label']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-value']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-error']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-label']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-value']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-item']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-orange']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-label']} */ ;
/** @type {__VLS_StyleScopedClasses['timer-value']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () { return (__VLS_exposed); },
});
exports.default = {};
