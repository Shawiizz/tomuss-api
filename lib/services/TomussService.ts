import {Semester} from "../util/Semester";
import {tomussGradesToModules} from "../util/TomussTransformer";
import {extractGradesArray, extractSemestersArray} from "../util/TomussParser";
import CASAuthService from "./CASAuthService";
import {Module} from "../models/ModuleModel";
import {asSeason} from "../util/enum/Season";

export default class TomussService {
    private readonly authService: CASAuthService

    constructor(authService: CASAuthService) {
        this.authService = authService
    }

    /**
     * Get the TOMUSS page for the given semester
     *
     * @param semester The semester
     */
    async getTomussPage(semester: Semester) {
        const regexUrl = /window.location = "(.*)"/
        const regexCountdown = /id="t">(\d+\.\d+)/;

        const redirectUrl = await this.authService.serviceRedirect(semester.getTomussHomeUrl())
        const tomussPageContent = await this.authService.getPage(redirectUrl.match(regexUrl)![1])

        const countdownMatch = tomussPageContent.data.match(regexCountdown)
        if (!countdownMatch) return tomussPageContent

        // Wait for the countdown to end
        if (parseFloat(countdownMatch[1]) > 0)
            await new Promise(resolve => setTimeout(resolve, parseFloat(countdownMatch[1]) * 1000))

        return await this.authService.getPage(redirectUrl.match(regexUrl)![1])
    }

    /**
     * Get the modules of the given semesters
     *
     * @param semester The semesters
     */
    async getModules(...semester: Semester[]): Promise<Module[]> {
        const modules: Module[] = []

        for (const sem of semester) {
            const page = await this.getTomussPage(sem)
            modules.push(...tomussGradesToModules(extractGradesArray(page.data)))
        }

        return modules
    }

    /**
     * Get the available semesters for the user
     * @return The available semesters (returns Semester objects that can be used with getModules for example)
     */
    async getAvailableSemesters(): Promise<Semester[]> {
        const homePageContent = await this.getTomussPage(Semester.current())
        return Object.keys(extractSemestersArray(homePageContent.data) ?? {}).map(semesterName => {
            const [year, season] = semesterName.split('/')
            return Semester.fromYearAndSeason(parseInt(year), asSeason(season))
        })
    }
}