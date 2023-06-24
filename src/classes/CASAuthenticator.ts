import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import {Constant, getCasLoginUrl} from "../Constant";
import axios, {AxiosInstance} from "axios";

export default class CASAuthenticator {
    private execToken!: string
    private readonly cookieJar: CookieJar
    private readonly client: AxiosInstance

    constructor() {
        this.cookieJar = new CookieJar()
        this.client = wrapper(axios.create({jar: this.cookieJar}));
        this.client.defaults.headers.common['User-Agent'] = Constant.USER_AGENT
    }

    getExecToken = async (cookiesJar: CookieJar): Promise<string> => {
        const axReq = await this.client.get(Constant.CAS_URL + '/cas/login')
        return axReq.data.split('name="execution" value="')[1].split('"')[0]
    }

    serviceRedirect = async (serviceUrl: string, unsafe: boolean = true) => {
        const serviceResponse = await this.client.get(`${Constant.CAS_URL}/cas/login?service=${serviceUrl}${unsafe ? '/?unsafe=1' : ''}`, {
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

    getPage = async (url: string) => {
        return await this.client.get(url)
    }

    login = async (username: string, password: string) => {
        // First get the execution token
        if(!this.execToken || !this.execToken.length) {
            const {config} = await this.client.get(getCasLoginUrl())
            this.execToken = await this.getExecToken(config.jar!)
        }

        await this.client.post(Constant.CAS_URL + '/cas/login', {
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

    getCookieJar = () => {
        return this.cookieJar
    }
}