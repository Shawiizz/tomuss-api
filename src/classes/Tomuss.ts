import {buildTomussUrl, Semester} from "../util/Semester";
import {tomussGradesToSubjects} from "../util/TomussTransformer";
import {extractGradesArray} from "../util/TomussParser";
import CASAuthenticator from "./CASAuthenticator";

export default class Tomuss {
    private readonly CASAuthenticator: CASAuthenticator

    constructor(CASAuthenticator: CASAuthenticator) {
        this.CASAuthenticator = CASAuthenticator
    }

    async getTomussPage(Semester: Semester) {
        const redirectUrl = await this.CASAuthenticator.serviceRedirect(buildTomussUrl(Semester))
        return this.CASAuthenticator.getPage(redirectUrl.split('= "')[1].split('"')[0])
    }

    async getSubjects(Semester: Semester) {
        const page = await this.getTomussPage(Semester)
        return tomussGradesToSubjects(extractGradesArray(page.data))
    }
}