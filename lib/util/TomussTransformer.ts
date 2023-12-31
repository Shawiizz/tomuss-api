import {TomussGradeElement} from "../models/tomuss/TomussGradesModel";
import {Subject} from "../models/SubjectModel";
import {parseSubject} from "./TomussParser";

/**
 * Converts a TOMUSS grades array to a subjects array
 *
 * @param gradesArray The TOMUSS grades array
 */
export const tomussGradesToSubjects = (gradesArray: TomussGradeElement[]): Subject[] => {
    const subjects: Subject[] = []

    for (const subjectJson of gradesArray)
        subjects.push(parseSubject(subjectJson))

    return subjects
}

/**
 * Converts a TOMUSS date to a Date object
 *
 * @param tomussDate The TOMUSS date (YYYYMMDDHHmmss)
 */
export const tomussDateToDate = (tomussDate: string): Date | null => {
    if (!tomussDate || !tomussDate.length) return null

    const year = parseInt(tomussDate.slice(0, 4), 10);
    const month = parseInt(tomussDate.slice(4, 6), 10) - 1; // Les mois sont indexés de 0 à 11
    const day = parseInt(tomussDate.slice(6, 8), 10);
    const hour = parseInt(tomussDate.slice(8, 10), 10);
    const minute = parseInt(tomussDate.slice(10, 12), 10);
    const second = parseInt(tomussDate.slice(12, 14), 10);

    return new Date(year, month, day, hour, minute, second);
}