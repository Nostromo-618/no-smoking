"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptionService = void 0;
var KEY_STORAGE_KEY = 'cryptoKey';
var EncryptionService = /** @class */ (function () {
    function EncryptionService() {
        this.key = null;
        this.init();
    }
    EncryptionService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storedKey, _a, _b, exportedKey, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        storedKey = localStorage.getItem(KEY_STORAGE_KEY);
                        if (!storedKey) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.importKey(JSON.parse(storedKey))];
                    case 1:
                        _a.key = _c.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, this.generateKey()];
                    case 3:
                        _b.key = _c.sent();
                        return [4 /*yield*/, this.exportKey(this.key)];
                    case 4:
                        exportedKey = _c.sent();
                        localStorage.setItem(KEY_STORAGE_KEY, JSON.stringify(exportedKey));
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        console.error('Error initializing encryption service:', error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EncryptionService.prototype.generateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, window.crypto.subtle.generateKey({
                        name: 'AES-GCM',
                        length: 256,
                    }, true, ['encrypt', 'decrypt'])];
            });
        });
    };
    EncryptionService.prototype.exportKey = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, window.crypto.subtle.exportKey('jwk', key)];
            });
        });
    };
    EncryptionService.prototype.importKey = function (jwk) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, window.crypto.subtle.importKey('jwk', jwk, {
                        name: 'AES-GCM',
                    }, true, ['encrypt', 'decrypt'])];
            });
        });
    };
    EncryptionService.prototype.encrypt = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var iv, encodedData, encryptedData, encryptedArray, ivArray, encryptedDataArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.key) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.key) {
                            throw new Error('Encryption key not available');
                        }
                        iv = window.crypto.getRandomValues(new Uint8Array(12));
                        encodedData = new TextEncoder().encode(data);
                        return [4 /*yield*/, window.crypto.subtle.encrypt({
                                name: 'AES-GCM',
                                iv: iv,
                            }, this.key, encodedData)];
                    case 3:
                        encryptedData = _a.sent();
                        encryptedArray = new Uint8Array(encryptedData);
                        ivArray = Array.from(iv);
                        encryptedDataArray = Array.from(encryptedArray);
                        return [2 /*return*/, JSON.stringify({ iv: ivArray, data: encryptedDataArray })];
                }
            });
        });
    };
    EncryptionService.prototype.decrypt = function (encrypted) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, iv, data, ivArray, encryptedData, decryptedData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.key) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!this.key) {
                            throw new Error('Decryption key not available');
                        }
                        _a = JSON.parse(encrypted), iv = _a.iv, data = _a.data;
                        ivArray = new Uint8Array(iv);
                        encryptedData = new Uint8Array(data);
                        return [4 /*yield*/, window.crypto.subtle.decrypt({
                                name: 'AES-GCM',
                                iv: ivArray,
                            }, this.key, encryptedData)];
                    case 3:
                        decryptedData = _b.sent();
                        return [2 /*return*/, new TextDecoder().decode(decryptedData)];
                }
            });
        });
    };
    return EncryptionService;
}());
exports.encryptionService = new EncryptionService();
