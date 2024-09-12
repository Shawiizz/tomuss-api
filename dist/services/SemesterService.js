"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterService = void 0;
const Season_1 = require("../util/enum/Season");
class SemesterService {
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
        return this.season === Season_1.Season.AUTOMNE ? new SemesterService(Season_1.Season.PRINTEMPS, this.year + 1) : new SemesterService(Season_1.Season.AUTOMNE, this.year);
    }
    /**
     * Returns the previous semester
     */
    previous() {
        return this.season === Season_1.Season.PRINTEMPS ? new SemesterService(Season_1.Season.AUTOMNE, this.year - 1) : new SemesterService(Season_1.Season.PRINTEMPS, this.year);
    }
    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year, season) {
        return new SemesterService(season, year);
    }
    /**
     * Returns the current semester
     */
    static current() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        return new SemesterService(month >= 8 ? Season_1.Season.AUTOMNE : Season_1.Season.PRINTEMPS, year);
    }
}
exports.SemesterService = SemesterService;
//# sourceMappingURL=SemesterService.js.map