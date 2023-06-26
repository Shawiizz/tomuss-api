import { Subject } from "../models/SubjectModel";
/**
 * Merge subjects with the same UE ID
 * Example : UE-XXXXX and UE-XXXXX@1 are the same UE
 *
 * @param subjects The subjects array
 */
export declare const mergeSubjectsWithSameUeId: (subjects: Subject[]) => Subject[];
