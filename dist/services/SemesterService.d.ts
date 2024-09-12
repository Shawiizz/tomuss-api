import { Season } from "../util/enum/Season";
export declare class SemesterService {
    season: Season;
    year: number;
    constructor(season: Season, year: number);
    /**
     * Returns the Tomuss url for the given semester
     */
    getTomussHomeUrl(): string;
    /**
     * Returns the next semester
     */
    next(): SemesterService;
    /**
     * Returns the previous semester
     */
    previous(): SemesterService;
    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year: number, season: Season): SemesterService;
    /**
     * Returns the current semester
     */
    static current(): SemesterService;
}
