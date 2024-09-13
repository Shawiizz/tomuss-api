"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semester = void 0;
const Season_1 = require("./enum/Season");
class Semester {
    constructor(season, year) {
        this.season = season;
        this.year = year;
    }
    /**
     * Returns the Tomuss url for the given semester
     */
    getTomussHomeUrl() {
        return `https://tomuss.univ-lyon1.fr/${this.year}/${this.season}`;
    }
    /**
     * Returns the next semester
     */
    next() {
        return this.season === Season_1.Season.AUTOMNE ? new Semester(Season_1.Season.PRINTEMPS, this.year + 1) : new Semester(Season_1.Season.AUTOMNE, this.year);
    }
    /**
     * Returns the previous semester
     */
    previous() {
        return this.season === Season_1.Season.PRINTEMPS ? new Semester(Season_1.Season.AUTOMNE, this.year - 1) : new Semester(Season_1.Season.PRINTEMPS, this.year);
    }
    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year, season) {
        return new Semester(season, year);
    }
    /**
     * Returns the current semester
     */
    static current() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        return new Semester(month >= 8 ? Season_1.Season.AUTOMNE : Season_1.Season.PRINTEMPS, year);
    }
}
exports.Semester = Semester;
//# sourceMappingURL=Semester.js.map