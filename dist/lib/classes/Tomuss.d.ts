import { Semester } from "../util/Semester";
import CASAuthenticator from "./CASAuthenticator";
import { Subject } from "../models/SubjectModel";
export default class Tomuss {
    private readonly CASAuthenticator;
    constructor(CASAuthenticator: CASAuthenticator);
    /**
     * Get the TOMUSS page for the given semester
     *
     * @param semester The semester
     */
    getTomussPage(semester: Semester): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the subjects of the given semesters
     *
     * @param semester The semesters
     */
    getSubjects(...semester: Semester[]): Promise<Subject[]>;
}
