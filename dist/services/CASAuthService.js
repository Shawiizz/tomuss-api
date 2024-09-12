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
Object.defineProperty(exports, "__esModule", { value: true });
const tough_cookie_1 = require("tough-cookie");
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const Constants_1 = require("../config/Constants");
const axios_1 = require("axios");
class CASAuthService {
    constructor() {
        /**
         * Get the execution token from the CAS login page (needed for login)
         */
        this.getExecToken = () => __awaiter(this, void 0, void 0, function* () {
            const axReq = yield this.client.get(Constants_1.Constants.CAS_URL + '/cas/login');
            return axReq.data.split('name="execution" value="')[1].split('"')[0];
        });
        /**
         * Redirect to the given service URL
         * If unsafe is true, the user will be redirected to the unsafe version of the service
         *
         * @param serviceUrl The service URL
         * @param unsafe Whether to redirect to the unsafe version of the service
         */
        this.serviceRedirect = (serviceUrl_1, ...args_1) => __awaiter(this, [serviceUrl_1, ...args_1], void 0, function* (serviceUrl, unsafe = true) {
            const serviceResponse = yield this.client.get(`${Constants_1.Constants.CAS_URL}/cas/login?service=${serviceUrl}${unsafe ? '/?unsafe=1' : ''}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                }
            });
            if (serviceResponse.status >= 400)
                throw new Error('Service redirect failed');
            return serviceResponse.data;
        });
        /**
         * Get the given page content
         *
         * @param url The page URL
         */
        this.getPage = (url) => __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(url);
        });
        /**
         * Login to CAS
         *
         * @param username The username (pXXXXXXX)
         * @param password The password
         */
        this.login = (username, password) => __awaiter(this, void 0, void 0, function* () {
            // First get the execution token
            if (!this.execToken || !this.execToken.length) {
                yield this.client.get((0, Constants_1.getCasLoginUrl)());
                this.execToken = yield this.getExecToken();
            }
            yield this.client.post(Constants_1.Constants.CAS_URL + '/cas/login', {
                username,
                password,
                lt: '',
                execution: this.execToken,
                _eventId: 'submit',
                submit: 'SE+CONNECTER'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
        });
        this.cookieJar = new tough_cookie_1.CookieJar();
        this.client = (0, axios_cookiejar_support_1.wrapper)(axios_1.default.create({ jar: this.cookieJar }));
        this.client.defaults.headers.common['User-Agent'] = Constants_1.Constants.USER_AGENT;
    }
}
exports.default = CASAuthService;
//# sourceMappingURL=CASAuthService.js.map