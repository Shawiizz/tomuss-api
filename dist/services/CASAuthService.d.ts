export default class CASAuthService {
    private execToken;
    private readonly cookieJar;
    private readonly client;
    constructor();
    /**
     * Get the execution token from the CAS login page (needed for login)
     */
    getExecToken: () => Promise<string>;
    /**
     * Redirect to the given service URL
     * If unsafe is true, the user will be redirected to the unsafe version of the service
     *
     * @param serviceUrl The service URL
     * @param unsafe Whether to redirect to the unsafe version of the service
     */
    serviceRedirect: (serviceUrl: string, unsafe?: boolean) => Promise<any>;
    /**
     * Get the given page content
     *
     * @param url The page URL
     */
    getPage: (url: string) => Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Login to CAS
     *
     * @param username The username (pXXXXXXX)
     * @param password The password
     */
    login: (username: string, password: string) => Promise<void>;
}
