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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillXlsxFile = void 0;
const ExcelJS = require("exceljs");
/**
 * Fill the XLSX file with the given modules array (works only for BUT1)
 *
 * @param modules The modules array
 * @param filePath The XLSX file path
 * @param calculateMoyIfNotFound If true, the moyenne will be calculated if not already calculated in Tomuss
 *
 * @returns The XLSX file buffer
 */
const fillXlsxFile = (modules_1, filePath_1, ...args_1) => __awaiter(void 0, [modules_1, filePath_1, ...args_1], void 0, function* (modules, filePath, calculateMoyIfNotFound = false) {
    const classeur = new ExcelJS.Workbook();
    yield classeur.xlsx.readFile(filePath);
    const feuille = classeur.getWorksheet('BUT1'); // BUT1 is the name of the sheet
    if (!feuille)
        throw new Error('The sheet BUT1 was not found in the XLSX file');
    const colonneB = feuille.getColumn('B'); // Column B => Codes UE
    colonneB.eachCell((cell, lineNumber) => {
        var _a, _b, _c;
        if (!((_a = cell.value) === null || _a === void 0 ? void 0 : _a.toString().startsWith('A6')))
            return;
        const FCell = feuille.getCell(`F${lineNumber}`);
        const style = FCell.fill;
        // Check if the cell is colorized
        if (style && style.type === 'pattern' && style.pattern === 'solid') {
            const notes = (_b = modules.find(subject => subject.ue.includes(cell.value.toString()) && subject.notes.length)) === null || _b === void 0 ? void 0 : _b.notes;
            if (!notes || !notes.length)
                return;
            let moyenne = (_c = notes.find(note => note.title === 'moyenne')) === null || _c === void 0 ? void 0 : _c.mark.value;
            if (!moyenne && calculateMoyIfNotFound)
                moyenne = notes.reduce((sum, grade) => sum + (grade.mark.value / grade.mark.on * 20), 0) / notes.length;
            if (!moyenne)
                return;
            FCell.value = moyenne.toString().replace('.', ',');
        }
    });
    // Force re-calculation for cells with formulas
    feuille.eachRow(row => {
        row.eachCell(cell => {
            if (cell.type === ExcelJS.ValueType.Formula)
                cell.model.result = undefined;
        });
    });
    return yield classeur.xlsx.writeBuffer();
});
exports.fillXlsxFile = fillXlsxFile;
//# sourceMappingURL=MoyButCalculator.js.map