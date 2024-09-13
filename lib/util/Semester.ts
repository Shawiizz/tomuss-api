import {Season} from "./enum/Season";

export class Semester {
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
    next(): Semester {
        return this.season === Season.AUTOMNE ? new Semester(Season.PRINTEMPS, this.year + 1) : new Semester(Season.AUTOMNE, this.year)
    }

    /**
     * Returns the previous semester
     */
    previous(): Semester {
        return this.season === Season.PRINTEMPS ? new Semester(Season.AUTOMNE, this.year - 1) : new Semester(Season.PRINTEMPS, this.year)
    }

    /**
     * Returns the semester from the given year and season
     */
    static fromYearAndSeason(year: number, season: Season): Semester {
        return new Semester(season, year)
    }

    /**
     * Returns the current semester
     */
    static current(): Semester {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()

        return new Semester(month >= 8 ? Season.AUTOMNE : Season.PRINTEMPS, year)
    }
}