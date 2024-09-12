import { TomussGradeElement } from "../models/tomuss/TomussGradesModel";
import { Module } from "../models/ModuleModel";
/**
 * Extracts the grades array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * Note: The parsing isn't perfect, but it works
 *
 * @param html The HTML page
 */
export declare const extractGradesArray: (html: string) => any;
/**
 * Parses a module from the JSON5 string
 *
 * @param moduleJson The grade element (JSON5 string)
 *
 * @returns The module object
 */
export declare const parseModule: (moduleJson: TomussGradeElement) => Module;
