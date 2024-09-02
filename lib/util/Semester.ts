export enum TomussSemester {
    AUTOMNE = "Automne",
    PRINTEMPS = "Printemps"
}

export type Semester = {
    semester: TomussSemester,
    year: number
}

export const Semester = {
    S1: {
        semester: TomussSemester.AUTOMNE,
        year: new Date().getFullYear() - 1
    },
    S2: {
        semester: TomussSemester.PRINTEMPS,
        year: new Date().getFullYear()
    }
}

/**
 * Returns the current semester
 */
export const getCurrentSemester = (): Semester => {
    const month = new Date().getMonth()
    return month >= 8 ? Semester.S1 : Semester.S2
}

/**
 * Returns the semester corresponding to the given TomussSemester (AUTOMNE or PRINTEMPS)
 *
 * @param semester The TomussSemester
 */
export const getSemester = (semester: TomussSemester): Semester => {
    return semester === TomussSemester.AUTOMNE ? Semester.S2 : Semester.S1
}

/**
 * Returns the Tomuss url for the given semester
 * @param semester The semester
 */
export const buildTomussUrl = (semester: Semester): string => {
    return `https://tomuss.univ-lyon1.fr/${semester.year}/${semester.semester}`
}
