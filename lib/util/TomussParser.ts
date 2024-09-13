import {TomussColumn, TomussGradeElement, TomussStats, TomussType} from "../models/tomuss/TomussGradesModel";
import {Grade, Module} from "../models/ModuleModel";
import {tomussDateToDate} from "./TomussTransformer";
import {parse} from "json5";

/**
 * Extracts the data array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * @param html The HTML page
 */
export const extractDataArray = (html: string) => {
    const arrayArg = html.split('display_update(')[1].split(',"Top"')[0]
    return parse(arrayArg)
}

/**
 * Extracts the grades array from the HTML page
 * @param html The HTML page
 */
export const extractGradesArray = (html: string) => {
    for (const item of extractDataArray(html))
        if (item[0] === 'Grades')
            return item[1][0]
}

/**
 * Extracts the semesters array from the HTML page
 * @param html The HTML page
 */
export const extractSemestersArray = (html: string): Record<string, string> | undefined => {
    for (const item of extractDataArray(html))
        if (item[0] === 'Semesters')
            return item[1]
}

/**
 * Parses a module from the JSON5 string
 *
 * @param moduleJson The grade element (JSON5 string)
 *
 * @returns The module object
 */
export const parseModule = (moduleJson: TomussGradeElement): Module => {
    const noteColumnsWithPosition: {
        position: number,
        column: TomussColumn
    }[] = []

    for (let i = 0; i < moduleJson.columns.length; i++) {
        const column = moduleJson.columns[i]
        if (column.type === TomussType.Note || column.type === TomussType.Moy || column.type === TomussType.Replace)
            noteColumnsWithPosition.push({
                position: i,
                column: column
            })
    }

    const notes: Grade[] = []

    for (const {position, column} of noteColumnsWithPosition) {
        const stats = moduleJson.stats[column.the_id] as TomussStats
        const note = moduleJson.line[position] as [number, string, string]

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
        title: moduleJson.table_title,
        ue: moduleJson.ue,
        notes: notes,
    }
}