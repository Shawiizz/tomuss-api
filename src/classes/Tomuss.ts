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
        const redirectUrl = await this.CASAuthenticator.serviceRedirect(buildTomussUrl(semester))
        return this.CASAuthenticator.getPage(redirectUrl.split('= "')[1].split('"')[0])
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