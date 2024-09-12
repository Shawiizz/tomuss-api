import CASAuthService from "../lib/services/CASAuthService";
import TomussService from "../lib/services/TomussService";
import {mergeModulesWithSameUeId} from "../lib/util/ModuleUtil";
import {Season} from "../lib/util/enum/Season";
import {SemesterService} from "../lib/services/SemesterService";
import * as fs from 'fs'
import {fillXlsxFile} from "../lib/util/MoyButCalculator";

/**
 * Exemple d'utilisation du CASAuthService et du TomussService (et de la fonction fillXlsxFile)
 */
async function main() {
    // Pour se connecter via le CAS
    const authService = new CASAuthService()
    await authService.login('pXXXXXX', 'password')

    // Pour récupérer les différents modules enseignés dans un semestre
    const tomussService = new TomussService(authService)
    const subjects = await tomussService.getModules(SemesterService.fromYearAndSeason(2022, Season.AUTOMNE))
    const mergedModules = mergeModulesWithSameUeId(subjects)

    // Pour remplir le fichier de calcul des moyennes pour le BUT 1 par exemple
    const path = '/chemin/vers/le/fichier.xlsx'
    const modifiedXlsxFileBuffer = await fillXlsxFile(mergedModules, path, false)
    fs.writeFileSync(path, modifiedXlsxFileBuffer)
}

main().catch(console.error)