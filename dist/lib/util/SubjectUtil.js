"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSubjectsWithSameUeId = void 0;
/**
 * Merge subjects with the same UE ID
 * Example : UE-XXXXX and UE-XXXXX@1 are the same UE
 *
 * @param subjects The subjects array
 */
var mergeSubjectsWithSameUeId = function (subjects) {
    var treatedSubjects = [];
    var _loop_1 = function (subject) {
        var _a;
        var treatedSubject = treatedSubjects.find(function (treatedSubject) { return treatedSubject.ue.split('@')[0] === subject.ue.split('@')[0]; });
        if (!treatedSubject) {
            treatedSubjects.push(subject);
            return "continue";
        }
        (_a = treatedSubject.notes).push.apply(_a, subject.notes);
    };
    for (var _i = 0, subjects_1 = subjects; _i < subjects_1.length; _i++) {
        var subject = subjects_1[_i];
        _loop_1(subject);
    }
    return treatedSubjects;
};
exports.mergeSubjectsWithSameUeId = mergeSubjectsWithSameUeId;
