import {buildTomussUrl, Semester} from "../util/Semester";
import {tomussGradesToSubjects} from "../util/TomussTransformer";
import {extractGradesArray} from "../util/TomussParser";
import CASAuthenticator from "./CASAuthenticator";
import {Subject} from "../models/SubjectModel";

export default class Tomuss {
    private readonly CASAuthenticator: CASAuthenticator

    constructor(CASAuthenticator: CASAuthenticator) {
        this.CASAuthenticator = CASAuthenticator
    }

    /**
     * Get the TOMUSS page for the given semester
     *
     * @param semester The semester
     */
    async getTomussPage(semester: Semester) {
        const regexUrl = /window.location = "(.*)"/
        const regexCountdown = /id="t">(\d+\.\d+)/;

        const redirectUrl = await this.CASAuthenticator.serviceRedirect(buildTomussUrl(semester))
        const tomussPageContent = await this.CASAuthenticator.getPage(redirectUrl.match(regexUrl)![1])

        const countdownMatch = tomussPageContent.data.match(regexCountdown)
        if(!countdownMatch) return tomussPageContent

        // Wait for the countdown to end
        if (parseFloat(countdownMatch[1]) > 0)
            await new Promise(resolve => setTimeout(resolve, parseFloat(countdownMatch[1]) * 1000))

        return await this.CASAuthenticator.getPage(redirectUrl.match(regexUrl)![1])
    }

    /**
     * Get the subjects of the given semesters
     *
     * @param semester The semesters
     */
    async getSubjects(...semester: Semester[]) {
        const subjects: Subject[] = []

        for (const sem of semester) {
            const page = await this.getTomussPage(sem)
            subjects.push(...tomussGradesToSubjects(extractGradesArray(page.data)))
        }

        return subjects
    }
}