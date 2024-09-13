import { Semester } from "../util/Semester";
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
    getTomussPage(semester: Semester): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the modules of the given semesters
     *
     * @param semester The semesters
     */
    getModules(...semester: Semester[]): Promise<Module[]>;
    /**
     * Get the available semesters for the user
     * @return The available semesters (returns Semester objects that can be used with getModules for example)
     */
    getAvailableSemesters(): Promise<Semester[]>;
}
