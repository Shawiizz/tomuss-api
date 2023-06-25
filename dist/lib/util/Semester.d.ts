export declare enum TomussSemester {
    AUTOMNE = "Automne",
    PRINTEMPS = "Printemps"
}
export type Semester = {
    semester: TomussSemester;
    year: number;
};
export declare const Semester: {
    S1: {
        semester: TomussSemester;
        year: number;
    };
    S2: {
        semester: TomussSemester;
        year: number;
    };
};
/**
 * Returns the current semester
 */
export declare const getCurrentSemester: () => Semester;
/**
 * Returns the semester corresponding to the given TomussSemester (AUTOMNE or PRINTEMPS)
 *
 * @param semester The TomussSemester
 */
export declare const getSemester: (semester: TomussSemester) => Semester;
/**
 * Returns the Tomuss url for the given semester
 * @param semester The semester
 */
export declare const buildTomussUrl: (semester: Semester) => string;
