"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tomussDateToDate = exports.tomussGradesToSubjects = void 0;
var TomussParser_1 = require("./TomussParser");
/**
 * Converts a TOMUSS grades array to a subjects array
 *
 * @param gradesArray The TOMUSS grades array
 */
var tomussGradesToSubjects = function (gradesArray) {
    var subjects = [];
    for (var _i = 0, gradesArray_1 = gradesArray; _i < gradesArray_1.length; _i++) {
        var subjectJson = gradesArray_1[_i];
        subjects.push((0, TomussParser_1.parseSubject)(subjectJson));
    }
    return subjects;
};
exports.tomussGradesToSubjects = tomussGradesToSubjects;
/**
 * Converts a TOMUSS date to a Date object
 *
 * @param tomussDate The TOMUSS date (YYYYMMDDHHmmss)
 */
var tomussDateToDate = function (tomussDate) {
    if (!tomussDate || !tomussDate.length)
        return null;
    var year = parseInt(tomussDate.slice(0, 4), 10);
    var month = parseInt(tomussDate.slice(4, 6), 10) - 1; // Les mois sont indexés de 0 à 11
    var day = parseInt(tomussDate.slice(6, 8), 10);
    var hour = parseInt(tomussDate.slice(8, 10), 10);
    var minute = parseInt(tomussDate.slice(10, 12), 10);
    var second = parseInt(tomussDate.slice(12, 14), 10);
    return new Date(year, month, day, hour, minute, second);
};
exports.tomussDateToDate = tomussDateToDate;
