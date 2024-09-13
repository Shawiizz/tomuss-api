"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModule = exports.extractSemestersArray = exports.extractGradesArray = exports.extractDataArray = void 0;
const TomussGradesModel_1 = require("../models/tomuss/TomussGradesModel");
const TomussTransformer_1 = require("./TomussTransformer");
const json5_1 = require("json5");
/**
 * Extracts the data array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * @param html The HTML page
 */
const extractDataArray = (html) => {
    const arrayArg = html.split('display_update(')[1].split(',"Top"')[0];
    return (0, json5_1.parse)(arrayArg);
};
exports.extractDataArray = extractDataArray;
/**
 * Extracts the grades array from the HTML page
 * @param html The HTML page
 */
const extractGradesArray = (html) => {
    for (const item of (0, exports.extractDataArray)(html))
        if (item[0] === 'Grades')
            return item[1][0];
};
exports.extractGradesArray = extractGradesArray;
/**
 * Extracts the semesters array from the HTML page
 * @param html The HTML page
 */
const extractSemestersArray = (html) => {
    for (const item of (0, exports.extractDataArray)(html))
        if (item[0] === 'Semesters')
            return item[1];
};
exports.extractSemestersArray = extractSemestersArray;
/**
 * Parses a module from the JSON5 string
 *
 * @param moduleJson The grade element (JSON5 string)
 *
 * @returns The module object
 */
const parseModule = (moduleJson) => {
    const noteColumnsWithPosition = [];
    for (let i = 0; i < moduleJson.columns.length; i++) {
        const column = moduleJson.columns[i];
        if (column.type === TomussGradesModel_1.TomussType.Note || column.type === TomussGradesModel_1.TomussType.Moy || column.type === TomussGradesModel_1.TomussType.Replace)
            noteColumnsWithPosition.push({
                position: i,
                column: column
            });
    }
    const notes = [];
    for (const { position, column } of noteColumnsWithPosition) {
        const stats = moduleJson.stats[column.the_id];
        const note = moduleJson.line[position];
        // Note not valid or not set yet
        if (!note || !note.length || isNaN(note[0]))
            continue;
        const noteIsOn = column.minmax ? parseInt(column.minmax.split(';')[1]) : 20;
        notes.push({
            title: column.title,
            comment: column.comment,
            mark: {
                value: note[0],
                on: noteIsOn,
            },
            teacherName: note[1],
            date: (0, TomussTransformer_1.tomussDateToDate)(note[2]),
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
        });
    }
    return {
        title: moduleJson.table_title,
        ue: moduleJson.ue,
        notes: notes,
    };
};
exports.parseModule = parseModule;
//# sourceMappingURL=TomussParser.js.map