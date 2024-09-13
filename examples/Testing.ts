import CASAuthService from "../lib/services/CASAuthService";
import TomussService from "../lib/services/TomussService";
import {mergeModulesWithSameUeId} from "../lib/util/ModuleUtil";
import {Season} from "../lib/util/enum/Season";
import * as fs from 'fs'
import {fillXlsxFile} from "../lib/util/MoyButCalculator";
import {Semester} from "../lib/util/Semester";

/**
 * Exemple d'utilisation du CASAuthService et du TomussService (et de la fonction fillXlsxFile)
 */
async function main() {
    // Pour se connecter via le CAS
    const authService = new CASAuthService()
    await authService.login('pXXXXXX', 'password')
    const tomussService = new TomussService(authService)

    // Pour récupérer les différents modules enseignés dans un semestre
    const subjects = await tomussService.getModules(Semester.fromYearAndSeason(2022, Season.AUTOMNE))
    const mergedModules = mergeModulesWithSameUeId(subjects)

    // Pour récupérer les semestres disponibles
    const semesters = await tomussService.getAvailableSemesters()

    // Pour remplir le fichier de calcul des moyennes pour le BUT 1 par exemple
    const path = '/chemin/vers/le/fichier.xlsx'
    const modifiedXlsxFileBuffer = await fillXlsxFile(mergedModules, path, false)
    fs.writeFileSync(path, modifiedXlsxFileBuffer)
}

main().catch(console.error)