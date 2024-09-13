import { Season } from "./enum/Season";
export declare class Semester {
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
    next(): Semester;
    /**
     * Returns the previous semester
     */
    previous(): Semester;
    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year: number, season: Season): Semester;
    /**
     * Returns the current semester
     */
    static current(): Semester;
}
