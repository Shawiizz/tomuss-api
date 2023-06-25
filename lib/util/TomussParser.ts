import {TomussColumn, TomussGradeElement, TomussStats, TomussType} from "../models/tomuss/TomussGradesModel";
import {Grade, Subject} from "../models/SubjectModel";
import {tomussDateToDate} from "./TomussTransformer";
import {parse} from "json5";

/**
 * Extracts the grades array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * Note: The parsing isn't perfect, but it works
 *
 * @param html The HTML page
 */
export const extractGradesArray = (html: string) => {
    const arrayArg = html.split('display_update(')[1].split(',"Top"')[0]
    const array = parse(arrayArg)

    for (const item of array)
        if (item[0] === 'Grades')
            return item[1][0]
}

/**
 * Parses a subject from the JSON5 string
 *
 * @param subjectJson The grade element (JSON5 string)
 *
 * @returns The subject object
 */
export const parseSubject = (subjectJson: TomussGradeElement): Subject => {
    const noteColumnsWithPosition: {
        position: number,
        column: TomussColumn
    }[] = []

    for (let i = 0; i < subjectJson.columns.length; i++) {
        const column = subjectJson.columns[i]
        if (column.type === TomussType.Note || column.type === TomussType.Moy)
            noteColumnsWithPosition.push({
                position: i,
                column: column
            })
    }

    const notes: Grade[] = []

    for (const {position, column} of noteColumnsWithPosition) {
        // @ts-ignore
        const stats = subjectJson.stats[column.the_id] as TomussStats
        const note = subjectJson.line[position] as [number, string, string]

        // Note not valid or not set yet
        if (!note || !note.length || isNaN(note[0])) continue

        const noteIsOn = column.minmax ? parseInt(column.minmax.split(';')[1]) : 20

        notes.push({
            title: column.title,
            comment: column.comment,
            mark: {
                value: note[0],
                on: noteIsOn,
            },
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