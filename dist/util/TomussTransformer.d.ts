import { TomussGradeElement } from "../models/tomuss/TomussGradesModel";
import { Module } from "../models/ModuleModel";
/**
 * Converts a TOMUSS grades array to a modules array
 *
 * @param gradesArray The TOMUSS grades array
 */
export declare const tomussGradesToModules: (gradesArray: TomussGradeElement[]) => Module[];
/**
 * Converts a TOMUSS date to a Date object
 *
 * @param tomussDate The TOMUSS date (YYYYMMDDHHmmss)
 */
export declare const tomussDateToDate: (tomussDate: string) => Date | null;
