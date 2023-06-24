import JSON5 from "json5";
import {Column, GradeElement, Stats} from "../models/tomuss/TomussGradesModel";
import {Note, Subject} from "../models/SubjectModel";
import {tomussDateToDate} from "./TomussTransformer";

export const extractGradesArray = (html: string) => {
    const arrayArg = html.split('display_update(')[1].split(',"Top"')[0]
    const array = JSON5.parse(arrayArg)

    for (const item of array)
        if (item[0] === 'Grades')
            return item[1][0]
}

export const parseSubject = (subjectJson: GradeElement): Subject => {
    const noteColumns: Column[] = subjectJson.columns.filter(column => column.type === 'Note') as Column[]
    const notes: Note[] = []

    for (const column of noteColumns) {
        // @ts-ignore
        const stats = subjectJson.stats[column.the_id] as Stats
        const note = subjectJson.line[column.position] as [number, string, string]

        // Note not valid or not set yet
        if(!note || !note.length) continue

        notes.push({
            title: column.title,
            comment: column.comment,
            note: note[0],
            teacherName: note[1],
            date: tomussDateToDate(note[2]),
            stats: {
                average: stats.average,
                mediane: stats.mediane,
                statsGroup: {
                    students: stats.nr_in_grp,
                    rank: stats.rank_grp,
                },
                statsPromo: {
                    students: stats.nr,
                    rank: stats.rank,
                }
            }
        })
    }

    return {
        title: subjectJson.table_title,
        ue: subjectJson.ue,
        notes: notes,
    }
}