import {Season} from "../util/enum/Season";

export class SemesterService {
    season: Season
    year: number

    constructor(season: Season, year: number) {
        this.season = season
        this.year = year
    }

    /**
     * Returns the Tomuss url for the given semester
     */
    getTomussHomeUrl(): string {
        return `https://tomuss.univ-lyon1.fr/${this.year}/${this.season}`
    }

    /**
     * Returns the next semester
     */
    next(): SemesterService {
        return this.season === Season.AUTOMNE ? new SemesterService(Season.PRINTEMPS, this.year + 1) : new SemesterService(Season.AUTOMNE, this.year)
    }

    /**
     * Returns the previous semester
     */
    previous(): SemesterService {
        return this.season === Season.PRINTEMPS ? new SemesterService(Season.AUTOMNE, this.year - 1) : new SemesterService(Season.PRINTEMPS, this.year)
    }

    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year: number, season: Season): SemesterService {
        return new SemesterService(season, year)
    }

    /**
     * Returns the current semester
     */
    static current(): SemesterService {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()

        return new SemesterService(month >= 8 ? Season.AUTOMNE : Season.PRINTEMPS, year)
    }
}