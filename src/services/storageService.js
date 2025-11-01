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
exports.storageService = void 0;
var encryptionService_1 = require("./encryptionService");
var STORAGE_KEY = 'smokingUrges';
var THEME_STORAGE_KEY = 'themePreference';
var URGE_TYPE_STORAGE_KEY = 'urgeTypePreference';
var CALENDAR_INTERVAL_STORAGE_KEY = 'calendarIntervalPreference';
var CUSTOM_DATE_RANGE_STORAGE_KEY = 'customDateRange';
var DISCLAIMER_ACCEPTED_KEY = 'disclaimerAccepted';
var MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
// Sanitize string to prevent XSS
function sanitizeString(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
// Validate timestamp format
function isValidTimestamp(timestamp) {
    var date = new Date(timestamp);
    return date instanceof Date && !isNaN(date.getTime()) &&
        date.getTime() <= Date.now() && // No future dates
        date.getTime() > new Date('2020-01-01').getTime(); // Reasonable past limit
}
// Check storage size to prevent quota exceeded attacks
function checkStorageSize() {
    var totalSize = 0;
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length + key.length;
        }
    }
    return totalSize < MAX_STORAGE_SIZE;
}
exports.storageService = {
    getUrges: function () {
        return __awaiter(this, void 0, void 0, function () {
            var urgesJson, decryptedUrges, urges, error_1, urgesJson, urges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        urgesJson = localStorage.getItem(STORAGE_KEY);
                        if (!urgesJson)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, encryptionService_1.encryptionService.decrypt(urgesJson)];
                    case 1:
                        decryptedUrges = _a.sent();
                        urges = JSON.parse(decryptedUrges);
                        // Validate data structure
                        if (!Array.isArray(urges)) {
                            console.error('Invalid data format in localStorage');
                            return [2 /*return*/, []];
                        }
                        // Filter out invalid entries
                        return [2 /*return*/, urges.filter(function (urge) {
                                return urge &&
                                    typeof urge.intensity === 'number' &&
                                    urge.intensity >= 1 &&
                                    urge.intensity <= 10 &&
                                    typeof urge.timestamp === 'string' &&
                                    isValidTimestamp(urge.timestamp);
                            }).map(function (urge) { return (__assign(__assign({}, urge), { type: urge.type || 'resisted' // Default to 'resisted' if no type
                             })); })];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error reading from localStorage:', error_1);
                        // If decryption fails, it might be old unencrypted data.
                        // Try to parse it as-is. If that also fails, return empty.
                        try {
                            urgesJson = localStorage.getItem(STORAGE_KEY);
                            if (!urgesJson)
                                return [2 /*return*/, []];
                            urges = JSON.parse(urgesJson);
                            if (!Array.isArray(urges))
                                return [2 /*return*/, []];
                            // If successful, re-encrypt the data
                            this.saveUrges(urges);
                            return [2 /*return*/, urges];
                        }
                        catch (e) {
                            return [2 /*return*/, []];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    saveUrges: function (urges) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedUrges, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, encryptionService_1.encryptionService.encrypt(JSON.stringify(urges))];
                    case 1:
                        encryptedUrges = _a.sent();
                        localStorage.setItem(STORAGE_KEY, encryptedUrges);
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error saving urges to localStorage:', error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    saveUrge: function (urge) {
        return __awaiter(this, void 0, void 0, function () {
            var urges, MAX_URGES, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Validate input
                        if (!urge ||
                            typeof urge.intensity !== 'number' ||
                            urge.intensity < 1 ||
                            urge.intensity > 10 ||
                            !isValidTimestamp(urge.timestamp)) {
                            throw new Error('Invalid urge data');
                        }
                        // Check storage size
                        if (!checkStorageSize()) {
                            throw new Error('Storage quota exceeded');
                        }
                        return [4 /*yield*/, this.getUrges()];
                    case 1:
                        urges = _a.sent();
                        MAX_URGES = 10000;
                        if (urges.length >= MAX_URGES) {
                            // Remove oldest entries
                            urges.splice(0, urges.length - MAX_URGES + 1);
                        }
                        urges.push({
                            intensity: Math.floor(urge.intensity), // Ensure integer
                            timestamp: sanitizeString(urge.timestamp),
                            type: urge.type || 'resisted' // Include type with default
                        });
                        return [2 /*return*/, this.saveUrges(urges)];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error saving to localStorage:', error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    downloadUrges: function () {
        return __awaiter(this, void 0, void 0, function () {
            var urges, dataStr, downloadAnchorNode, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getUrges()];
                    case 1:
                        urges = _a.sent();
                        dataStr = "data:text/json;charset=utf-8," +
                            encodeURIComponent(JSON.stringify(urges, null, 2));
                        downloadAnchorNode = document.createElement('a');
                        downloadAnchorNode.setAttribute("href", dataStr);
                        downloadAnchorNode.setAttribute("download", "i-dont-smoke-data-".concat(Date.now(), ".json"));
                        downloadAnchorNode.style.display = 'none';
                        document.body.appendChild(downloadAnchorNode);
                        downloadAnchorNode.click();
                        downloadAnchorNode.remove();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error downloading data:', error_4);
                        alert('Failed to download data. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    importUrges: function (file, mergeWithExisting) {
        var _this = this;
        if (mergeWithExisting === void 0) { mergeWithExisting = false; }
        return new Promise(function (resolve, reject) {
            // Validate file type
            if (!file.name.endsWith('.json')) {
                reject(new Error('Invalid file type. Please upload a JSON file.'));
                return;
            }
            // Limit file size to 10MB
            var MAX_FILE_SIZE = 10 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                reject(new Error('File too large. Maximum size is 10MB.'));
                return;
            }
            var reader = new FileReader();
            reader.onload = function (event) { return __awaiter(_this, void 0, void 0, function () {
                var result, importedUrges, MAX_IMPORT, validUrges, _i, importedUrges_1, urge, finalUrges, existingUrges, mergedUrges, uniqueUrges, error_5;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            result = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                            if (typeof result !== 'string') {
                                throw new Error('Failed to read file content');
                            }
                            importedUrges = void 0;
                            try {
                                importedUrges = JSON.parse(result);
                            }
                            catch (_c) {
                                throw new Error('Invalid JSON format');
                            }
                            // Validate data structure
                            if (!Array.isArray(importedUrges)) {
                                throw new Error('Invalid data format: expected an array of urges');
                            }
                            MAX_IMPORT = 10000;
                            if (importedUrges.length > MAX_IMPORT) {
                                throw new Error("Too many urges. Maximum is ".concat(MAX_IMPORT, "."));
                            }
                            validUrges = [];
                            for (_i = 0, importedUrges_1 = importedUrges; _i < importedUrges_1.length; _i++) {
                                urge = importedUrges_1[_i];
                                if (typeof urge.intensity === 'number' &&
                                    typeof urge.timestamp === 'string' &&
                                    urge.intensity >= 1 &&
                                    urge.intensity <= 10 &&
                                    isValidTimestamp(urge.timestamp)) {
                                    validUrges.push({
                                        intensity: Math.floor(urge.intensity),
                                        timestamp: sanitizeString(urge.timestamp),
                                        type: urge.type || 'resisted' // Default to 'resisted' if no type
                                    });
                                }
                            }
                            if (validUrges.length === 0) {
                                throw new Error('No valid urges found in the file');
                            }
                            finalUrges = void 0;
                            if (!mergeWithExisting) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getUrges()];
                        case 1:
                            existingUrges = _b.sent();
                            mergedUrges = __spreadArray(__spreadArray([], existingUrges, true), validUrges, true);
                            uniqueUrges = mergedUrges.filter(function (urge, index, self) {
                                return index === self.findIndex(function (u) { return u.timestamp === urge.timestamp; });
                            });
                            // Sort by timestamp
                            uniqueUrges.sort(function (a, b) {
                                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
                            });
                            // Limit total size
                            finalUrges = uniqueUrges.slice(-MAX_IMPORT);
                            return [3 /*break*/, 3];
                        case 2:
                            finalUrges = validUrges;
                            _b.label = 3;
                        case 3: return [4 /*yield*/, this.saveUrges(finalUrges)];
                        case 4:
                            _b.sent();
                            resolve();
                            return [3 /*break*/, 6];
                        case 5:
                            error_5 = _b.sent();
                            reject(error_5);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); };
            reader.onerror = function () {
                reject(new Error('Failed to read file'));
            };
            // Use readAsText with UTF-8 encoding
            reader.readAsText(file, 'UTF-8');
        });
    },
    getThemePreference: function () {
        try {
            var theme = localStorage.getItem(THEME_STORAGE_KEY);
            // Validate theme value - now includes 'system'
            if (theme && ['light', 'dark', 'system'].includes(theme)) {
                return theme;
            }
            return null;
        }
        catch (error) {
            console.error('Error reading theme preference:', error);
            return null;
        }
    },
    saveThemePreference: function (theme) {
        try {
            // Validate theme value - now includes 'system'
            if (!['light', 'dark', 'system'].includes(theme)) {
                throw new Error('Invalid theme value');
            }
            localStorage.setItem(THEME_STORAGE_KEY, theme);
            return true;
        }
        catch (error) {
            console.error('Error saving theme preference:', error);
            return false;
        }
    },
    getUrgeTypePreference: function () {
        try {
            var urgeType = localStorage.getItem(URGE_TYPE_STORAGE_KEY);
            // Validate urge type value
            if (urgeType && ['resisted', 'smoking', 'gum'].includes(urgeType)) {
                return urgeType;
            }
            return 'resisted'; // Default value
        }
        catch (error) {
            console.error('Error reading urge type preference:', error);
            return 'resisted';
        }
    },
    saveUrgeTypePreference: function (urgeType) {
        try {
            // Validate urge type value
            if (!['resisted', 'smoking', 'gum'].includes(urgeType)) {
                throw new Error('Invalid urge type value');
            }
            localStorage.setItem(URGE_TYPE_STORAGE_KEY, urgeType);
            return true;
        }
        catch (error) {
            console.error('Error saving urge type preference:', error);
            return false;
        }
    },
    getCalendarIntervalPreference: function () {
        try {
            var interval = localStorage.getItem(CALENDAR_INTERVAL_STORAGE_KEY);
            // Validate interval value
            if (interval && ['all', 'week', 'month', 'custom'].includes(interval)) {
                return interval;
            }
            return 'all'; // Default value
        }
        catch (error) {
            console.error('Error reading calendar interval preference:', error);
            return 'all';
        }
    },
    saveCalendarIntervalPreference: function (interval) {
        try {
            // Validate interval value
            if (!['all', 'week', 'month', 'custom'].includes(interval)) {
                throw new Error('Invalid calendar interval value');
            }
            localStorage.setItem(CALENDAR_INTERVAL_STORAGE_KEY, interval);
            return true;
        }
        catch (error) {
            console.error('Error saving calendar interval preference:', error);
            return false;
        }
    },
    getCustomDateRange: function () {
        try {
            var dateRange = localStorage.getItem(CUSTOM_DATE_RANGE_STORAGE_KEY);
            if (!dateRange) {
                return null;
            }
            // Parse the stored value (format: "2025-10-07_2025-10-08")
            var parts = dateRange.split('_');
            if (parts.length !== 2) {
                console.error('getCustomDateRange - Invalid format:', dateRange);
                return null;
            }
            var startDate = parts[0], endDate = parts[1];
            // Validate date format (YYYY-MM-DD)
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
                console.error('getCustomDateRange - Invalid date format');
                return null;
            }
            // Validate dates are valid
            var start = new Date(startDate);
            var end = new Date(endDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.error('getCustomDateRange - Invalid dates');
                return null;
            }
            return { startDate: startDate, endDate: endDate };
        }
        catch (error) {
            console.error('Error reading custom date range:', error);
            return null;
        }
    },
    saveCustomDateRange: function (startDate, endDate) {
        try {
            // Validate date format (YYYY-MM-DD)
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
                throw new Error('Invalid date format. Expected YYYY-MM-DD');
            }
            // Validate dates are valid
            var start = new Date(startDate);
            var end = new Date(endDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error('Invalid dates');
            }
            // Validate start date is before or equal to end date
            if (start > end) {
                throw new Error('Start date must be before or equal to end date');
            }
            // Store in format: "2025-10-07_2025-10-08"
            var dateRangeString = "".concat(startDate, "_").concat(endDate);
            localStorage.setItem(CUSTOM_DATE_RANGE_STORAGE_KEY, dateRangeString);
            return true;
        }
        catch (error) {
            console.error('Error saving custom date range:', error);
            return false;
        }
    },
    getDisclaimerAccepted: function () {
        try {
            var accepted = localStorage.getItem(DISCLAIMER_ACCEPTED_KEY);
            return accepted === 'true';
        }
        catch (error) {
            console.error('Error reading disclaimer acceptance:', error);
            return false;
        }
    },
    saveDisclaimerAccepted: function (accepted) {
        try {
            localStorage.setItem(DISCLAIMER_ACCEPTED_KEY, accepted.toString());
            return true;
        }
        catch (error) {
            console.error('Error saving disclaimer acceptance:', error);
            return false;
        }
    },
    // Clear all data (with confirmation)
    clearAllData: function () {
        try {
            if (confirm('Are you sure you want to delete all your tracking data? This cannot be undone.')) {
                localStorage.removeItem(STORAGE_KEY);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }
};
