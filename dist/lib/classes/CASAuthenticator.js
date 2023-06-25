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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var tough_cookie_1 = require("tough-cookie");
var axios_cookiejar_support_1 = require("axios-cookiejar-support");
var Constant_1 = require("../Constant");
var axios_1 = require("axios");
var CASAuthenticator = /** @class */ (function () {
    function CASAuthenticator() {
        var _this = this;
        /**
         * Get the execution token from the CAS login page (needed for login)
         */
        this.getExecToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var axReq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get(Constant_1.Constant.CAS_URL + '/cas/login')];
                    case 1:
                        axReq = _a.sent();
                        return [2 /*return*/, axReq.data.split('name="execution" value="')[1].split('"')[0]];
                }
            });
        }); };
        /**
         * Redirect to the given service URL
         * If unsafe is true, the user will be redirected to the unsafe version of the service
         *
         * @param serviceUrl The service URL
         * @param unsafe Whether to redirect to the unsafe version of the service
         */
        this.serviceRedirect = function (serviceUrl, unsafe) {
            if (unsafe === void 0) { unsafe = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var serviceResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.get("".concat(Constant_1.Constant.CAS_URL, "/cas/login?service=").concat(serviceUrl).concat(unsafe ? '/?unsafe=1' : ''), {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Connection': 'keep-alive',
                                    'Upgrade-Insecure-Requests': '1',
                                }
                            })];
                        case 1:
                            serviceResponse = _a.sent();
                            if (serviceResponse.status >= 400)
                                throw new Error('Service redirect failed');
                            return [2 /*return*/, serviceResponse.data];
                    }
                });
            });
        };
        /**
         * Get the given page content
         *
         * @param url The page URL
         */
        this.getPage = function (url) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get(url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Login to CAS
         *
         * @param username The username (pXXXXXXX)
         * @param password The password
         */
        this.login = function (username, password) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.execToken || !this.execToken.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.get((0, Constant_1.getCasLoginUrl)())];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.getExecToken()];
                    case 2:
                        _a.execToken = _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.client.post(Constant_1.Constant.CAS_URL + '/cas/login', {
                            username: username,
                            password: password,
                            lt: '',
                            execution: this.execToken,
                            _eventId: 'submit',
                            submit: 'SE+CONNECTER'
                        }, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.cookieJar = new tough_cookie_1.CookieJar();
        this.client = (0, axios_cookiejar_support_1.wrapper)(axios_1.default.create({ jar: this.cookieJar }));
        this.client.defaults.headers.common['User-Agent'] = Constant_1.Constant.USER_AGENT;
    }
    return CASAuthenticator;
}());
exports.default = CASAuthenticator;
