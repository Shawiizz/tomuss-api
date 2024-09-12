"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModule = exports.extractGradesArray = void 0;
const TomussGradesModel_1 = require("../models/tomuss/TomussGradesModel");
const TomussTransformer_1 = require("./TomussTransformer");
const json5_1 = require("json5");
/**
 * Extracts the grades array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * Note: The parsing isn't perfect, but it works
 *
 * @param html The HTML page
 */
const extractGradesArray = (html) => {
    const arrayArg = html.split('display_update(')[1].split(',"Top"')[0];
    const array = (0, json5_1.parse)(arrayArg);
    for (const item of array)
        if (item[0] === 'Grades')
            return item[1][0];
};
exports.extractGradesArray = extractGradesArray;
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