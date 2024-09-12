import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import {Constants, getCasLoginUrl} from "../config/Constants";
import axios, {AxiosInstance} from "axios";

export default class CASAuthService {
    private execToken!: string
    private readonly cookieJar: CookieJar
    private readonly client: AxiosInstance

    constructor() {
        this.cookieJar = new CookieJar()
        this.client = wrapper(axios.create({jar: this.cookieJar}));
        this.client.defaults.headers.common['User-Agent'] = Constants.USER_AGENT
    }

    /**
     * Get the execution token from the CAS login page (needed for login)
     */
    getExecToken = async (): Promise<string> => {
        const axReq = await this.client.get(Constants.CAS_URL + '/cas/login')
        return axReq.data.split('name="execution" value="')[1].split('"')[0]
    }

    /**
     * Redirect to the given service URL
     * If unsafe is true, the user will be redirected to the unsafe version of the service
     *
     * @param serviceUrl The service URL
     * @param unsafe Whether to redirect to the unsafe version of the service
     */
    serviceRedirect = async (serviceUrl: string, unsafe: boolean = true) => {
        const serviceResponse = await this.client.get(`${Constants.CAS_URL}/cas/login?service=${serviceUrl}${unsafe ? '/?unsafe=1' : ''}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }
        })

        if (serviceResponse.status >= 400)
            throw new Error('Service redirect failed')

        return serviceResponse.data
    }

    /**
     * Get the given page content
     *
     * @param url The page URL
     */
    getPage = async (url: string) => {
        return await this.client.get(url)
    }

    /**
     * Login to CAS
     *
     * @param username The username (pXXXXXXX)
     * @param password The password
     */
    login = async (username: string, password: string) => {
        // First get the execution token
        if (!this.execToken || !this.execToken.length) {
            await this.client.get(getCasLoginUrl())
            this.execToken = await this.getExecToken()
        }

        await this.client.post(Constants.CAS_URL + '/cas/login', {
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
        })
    }
}