import {Subject} from "../models/SubjectModel";

/**
 * Merge subjects with the same UE ID
 * Example : UE-XXXXX and UE-XXXXX@1 are the same UE
 *
 * @param subjects The subjects array
 */
export const mergeSubjectsWithSameUeId = (subjects: Subject[]): Subject[] => {
    const treatedSubjects: Subject[] = []

    for (const subject of subjects) {
        const treatedSubject = treatedSubjects.find(treatedSubject => treatedSubject.ue.split('@')[0] === subject.ue.split('@')[0])
        if (!treatedSubject) {
            treatedSubjects.push(subject)
            continue
        }

        treatedSubject.notes.push(...subject.notes)
    }

    return treatedSubjects
}