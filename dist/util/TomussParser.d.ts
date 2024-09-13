import { TomussGradeElement } from "../models/tomuss/TomussGradesModel";
import { Module } from "../models/ModuleModel";
/**
 * Extracts the data array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * @param html The HTML page
 */
export declare const extractDataArray: (html: string) => any;
/**
 * Extracts the grades array from the HTML page
 * @param html The HTML page
 */
export declare const extractGradesArray: (html: string) => any;
/**
 * Extracts the semesters array from the HTML page
 * @param html The HTML page
 */
export declare const extractSemestersArray: (html: string) => Record<string, string> | undefined;
/**
 * Parses a module from the JSON5 string
 *
 * @param moduleJson The grade element (JSON5 string)
 *
 * @returns The module object
 */
export declare const parseModule: (moduleJson: TomussGradeElement) => Module;
