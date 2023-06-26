import { TomussGradeElement } from "../models/tomuss/TomussGradesModel";
import { Subject } from "../models/SubjectModel";
/**
 * Converts a TOMUSS grades array to a subjects array
 *
 * @param gradesArray The TOMUSS grades array
 */
export declare const tomussGradesToSubjects: (gradesArray: TomussGradeElement[]) => Subject[];
/**
 * Converts a TOMUSS date to a Date object
 *
 * @param tomussDate The TOMUSS date (YYYYMMDDHHmmss)
 */
export declare const tomussDateToDate: (tomussDate: string) => Date | null;
