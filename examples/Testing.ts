import CASAuthenticator from "../lib/classes/CASAuthenticator";
import Tomuss from "../lib/classes/Tomuss";
import {Semester} from "../lib/util/Semester";
import {fillXlsxFile} from "../lib/util/MoyButCalculator";
import * as fs from "fs";
import {mergeSubjectsWithSameUeId} from "../lib/util/SubjectUtil";

/**
 * Exemple d'utilisation du CASAuthenticator et de Tomuss (et de la fonction fillXlsxFile)
 */
async function main() {
    const casAuthenticator = new CASAuthenticator()
    await casAuthenticator.login('pXXXXXXX', 'password')

    const tomuss = new Tomuss(casAuthenticator)
    const subjects = await tomuss.getSubjects(Semester.S1, Semester.S2)
    const mergedSubjects = mergeSubjectsWithSameUeId(subjects)

    const path = '/chemin/vers/le/fichier.xlsx'
    const modifiedXlsxFileBuffer = await fillXlsxFile(mergedSubjects, path, false)
    fs.writeFileSync(path, modifiedXlsxFileBuffer)
}
main().catch(console.error)