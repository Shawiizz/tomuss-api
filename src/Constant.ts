export const Constant = {
    TOMUSS_URL: 'https://tomuss.univ-lyon1.fr',
    CAS_URL: 'https://cas.univ-lyon1.fr',
    USER_AGENT: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0'
}

/**
 * Returns the CAS login URL
 */
export const getCasLoginUrl = () => {
    return Constant.CAS_URL + '/cas/login'
}

/**
 * Returns the CAS logout URL
 */
export const getCasLogoutUrl = () => {
    return Constant.CAS_URL + '/cas/logout'
}