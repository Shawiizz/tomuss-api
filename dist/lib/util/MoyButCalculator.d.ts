/// <reference types="node" />
import { Subject } from "../models/SubjectModel";
/**
 * Fill the XLSX file with the given subjects array (works only for BUT1)
 *
 * @param subjects The subjects array
 * @param filePath The XLSX file path
 * @param calculateMoyIfNotFound If true, the moyenne will be calculated if not already calculated in Tomuss
 *
 * @returns The XLSX file buffer
 */
export declare const fillXlsxFile: (subjects: Subject[], filePath: string, calculateMoyIfNotFound?: boolean) => Promise<Buffer>;
