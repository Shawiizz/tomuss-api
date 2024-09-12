import { Module } from "../models/ModuleModel";
/**
 * Fill the XLSX file with the given modules array (works only for BUT1)
 *
 * @param modules The modules array
 * @param filePath The XLSX file path
 * @param calculateMoyIfNotFound If true, the moyenne will be calculated if not already calculated in Tomuss
 *
 * @returns The XLSX file buffer
 */
export declare const fillXlsxFile: (modules: Module[], filePath: string, calculateMoyIfNotFound?: boolean) => Promise<Buffer>;
