"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTomussUrl = exports.getSemester = exports.getCurrentSemester = exports.Semester = exports.TomussSemester = void 0;
var TomussSemester;
(function (TomussSemester) {
    TomussSemester["AUTOMNE"] = "Automne";
    TomussSemester["PRINTEMPS"] = "Printemps";
})(TomussSemester || (exports.TomussSemester = TomussSemester = {}));
exports.Semester = {
    S1: {
        semester: TomussSemester.AUTOMNE,
        year: new Date().getFullYear() - 1
    },
    S2: {
        semester: TomussSemester.PRINTEMPS,
        year: new Date().getFullYear()
    }
};
/**
 * Returns the current semester
 */
var getCurrentSemester = function () {
    var month = new Date().getMonth();
    return month >= 9 ? exports.Semester.S1 : exports.Semester.S2;
};
exports.getCurrentSemester = getCurrentSemester;
/**
 * Returns the semester corresponding to the given TomussSemester (AUTOMNE or PRINTEMPS)
 *
 * @param semester The TomussSemester
 */
var getSemester = function (semester) {
    return semester === TomussSemester.AUTOMNE ? exports.Semester.S2 : exports.Semester.S1;
};
exports.getSemester = getSemester;
/**
 * Returns the Tomuss url for the given semester
 * @param semester The semester
 */
var buildTomussUrl = function (semester) {
    return "https://tomuss.univ-lyon1.fr/".concat(semester.year, "/").concat(semester.semester);
};
exports.buildTomussUrl = buildTomussUrl;
