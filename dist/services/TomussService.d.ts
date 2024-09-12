import { SemesterService } from "./SemesterService";
import CASAuthService from "./CASAuthService";
import { Module } from "../models/ModuleModel";
export default class TomussService {
    private readonly authService;
    constructor(authService: CASAuthService);
    /**
     * Get the TOMUSS page for the given semester
     *
     * @param semester The semester
     */
    getTomussPage(semester: SemesterService): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the modules of the given semesters
     *
     * @param semester The semesters
     */
    getModules(...semester: SemesterService[]): Promise<Module[]>;
}
