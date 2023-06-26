"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCasLogoutUrl = exports.getCasLoginUrl = exports.Constant = void 0;
exports.Constant = {
    TOMUSS_URL: 'https://tomuss.univ-lyon1.fr',
    CAS_URL: 'https://cas.univ-lyon1.fr',
    USER_AGENT: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0'
};
/**
 * Returns the CAS login URL
 */
var getCasLoginUrl = function () {
    return exports.Constant.CAS_URL + '/cas/login';
};
exports.getCasLoginUrl = getCasLoginUrl;
/**
 * Returns the CAS logout URL
 */
var getCasLogoutUrl = function () {
    return exports.Constant.CAS_URL + '/cas/logout';
};
exports.getCasLogoutUrl = getCasLogoutUrl;
