"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillXlsxFile = void 0;
var ExcelJS = require("exceljs");
/**
 * Fill the XLSX file with the given subjects array (works only for BUT1)
 *
 * @param subjects The subjects array
 * @param filePath The XLSX file path
 * @param calculateMoyIfNotFound If true, the moyenne will be calculated if not already calculated in Tomuss
 */
var fillXlsxFile = function (subjects, filePath, calculateMoyIfNotFound) {
    if (calculateMoyIfNotFound === void 0) { calculateMoyIfNotFound = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var classeur, feuille, colonneB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classeur = new ExcelJS.Workbook();
                    return [4 /*yield*/, classeur.xlsx.readFile(filePath)];
                case 1:
                    _a.sent();
                    feuille = classeur.getWorksheet('BUT1');
                    colonneB = feuille.getColumn('B');
                    colonneB.eachCell(function (cell, lineNumber) {
                        var _a, _b, _c;
                        if (!((_a = cell.value) === null || _a === void 0 ? void 0 : _a.toString().startsWith('A6')))
                            return;
                        var FCell = feuille.getCell("F".concat(lineNumber));
                        var style = FCell.fill;
                        // Check if the cell is colorized
                        if (style && style.type === 'pattern' && style.pattern === 'solid') {
                            var notes = (_b = subjects.find(function (subject) { return subject.ue.includes(cell.value.toString()) && subject.notes.length; })) === null || _b === void 0 ? void 0 : _b.notes;
                            if (!notes || !notes.length)
                                return;
                            var moyenne = (_c = notes.find(function (note) { return note.title === 'moyenne'; })) === null || _c === void 0 ? void 0 : _c.mark.value;
                            if (!moyenne && calculateMoyIfNotFound)
                                moyenne = notes.reduce(function (sum, grade) { return sum + (grade.mark.value / grade.mark.on * 20); }, 0) / notes.length;
                            if (!moyenne)
                                return;
                            FCell.value = moyenne;
                        }
                    });
                    // Force re-calculation for cells with formulas
                    feuille.eachRow(function (row) {
                        row.eachCell(function (cell) {
                            if (cell.type === ExcelJS.ValueType.Formula)
                                cell.model.result = undefined;
                        });
                    });
                    return [4 /*yield*/, classeur.xlsx.writeFile(filePath)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.fillXlsxFile = fillXlsxFile;
