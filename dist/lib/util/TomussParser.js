"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSubject = exports.extractGradesArray = void 0;
var TomussGradesModel_1 = require("../models/tomuss/TomussGradesModel");
var TomussTransformer_1 = require("./TomussTransformer");
var json5_1 = require("json5");
/**
 * Extracts the grades array from the HTML page
 * The grades array is a JSON5 string inside a JS function call
 * Note: The parsing isn't perfect, but it works
 *
 * @param html The HTML page
 */
var extractGradesArray = function (html) {
    var arrayArg = html.split('display_update(')[1].split(',"Top"')[0];
    var array = (0, json5_1.parse)(arrayArg);
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        if (item[0] === 'Grades')
            return item[1][0];
    }
};
exports.extractGradesArray = extractGradesArray;
/**
 * Parses a subject from the JSON5 string
 *
 * @param subjectJson The grade element (JSON5 string)
 *
 * @returns The subject object
 */
var parseSubject = function (subjectJson) {
    var noteColumnsWithPosition = [];
    for (var i = 0; i < subjectJson.columns.length; i++) {
        var column = subjectJson.columns[i];
        if (column.type === TomussGradesModel_1.TomussType.Note || column.type === TomussGradesModel_1.TomussType.Moy)
            noteColumnsWithPosition.push({
                position: i,
                column: column
            });
    }
    var notes = [];
    for (var _i = 0, noteColumnsWithPosition_1 = noteColumnsWithPosition; _i < noteColumnsWithPosition_1.length; _i++) {
        var _a = noteColumnsWithPosition_1[_i], position = _a.position, column = _a.column;
        // @ts-ignore
        var stats = subjectJson.stats[column.the_id];
        var note = subjectJson.line[position];
        // Note not valid or not set yet
        if (!note || !note.length || isNaN(note[0]))
            continue;
        var noteIsOn = column.minmax ? parseInt(column.minmax.split(';')[1]) : 20;
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
        title: subjectJson.table_title,
        ue: subjectJson.ue,
        notes: notes,
    };
};
exports.parseSubject = parseSubject;
