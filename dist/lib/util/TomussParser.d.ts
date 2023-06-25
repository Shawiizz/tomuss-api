import { GradeElement } from "../models/tomuss/TomussGradesModel";
import { Subject } from "../models/SubjectModel";
/**
 * Extracts the grades array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * Note: The parsing isn't perfect, but it works
 *
 * @param html The HTML page
 */
export declare const extractGradesArray: (html: string) => any;
/**
 * Parses a subject from the JSON5 string
 *
 * @param subjectJson The grade element (JSON5 string)
 *
 * @returns The subject object
 */
export declare const parseSubject: (subjectJson: GradeElement) => Subject;
