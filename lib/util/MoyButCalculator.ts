import * as ExcelJS from "exceljs";
import {Subject} from "../models/SubjectModel";

/**
 * Fill the XLSX file with the given subjects array (works only for BUT1)
 *
 * @param subjects The subjects array
 * @param filePath The XLSX file path
 * @param calculateMoyIfNotFound If true, the moyenne will be calculated if not already calculated in Tomuss
 */
export const fillXlsxFile = async (subjects: Subject[], filePath: string, calculateMoyIfNotFound: boolean = false) => {
    const classeur = new ExcelJS.Workbook();

    await classeur.xlsx.readFile(filePath);
    const feuille = classeur.getWorksheet('BUT1'); // BUT1 is the name of the sheet
    const colonneB = feuille.getColumn('B'); // Column B => Codes UE

    colonneB.eachCell((cell, lineNumber) => {
        if (!cell.value?.toString().startsWith('A6')) return

        const FCell = feuille.getCell(`F${lineNumber}`);
        const style = FCell.fill;

        // Check if the cell is colorized
        if (style && style.type === 'pattern' && style.pattern === 'solid') {
            const notes = subjects.find(subject => subject.ue.includes(cell.value!.toString()) && subject.notes.length)?.notes
            if (!notes || !notes.length) return

            let moyenne = notes.find(note => note.title === 'moyenne')?.mark.value
            if (!moyenne && calculateMoyIfNotFound)
                moyenne = notes.reduce((sum, grade) => sum + (grade.mark.value / grade.mark.on * 20), 0) / notes.length

            if (!moyenne) return

            FCell.value = moyenne
        }
    });

    // Force re-calculation for cells with formulas
    feuille.eachRow(row => {
        row.eachCell(cell => {
            if (cell.type === ExcelJS.ValueType.Formula)
                cell.model.result = undefined;
        });
    })

    await classeur.xlsx.writeFile(filePath);
}