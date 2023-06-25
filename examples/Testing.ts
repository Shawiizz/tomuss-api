import CASAuthenticator from "../lib/classes/CASAuthenticator";
import Tomuss from "../lib/classes/Tomuss";
import {Semester} from "../lib/util/Semester";
import {fillXlsxFile} from "../lib/util/MoyButCalculator";

/**
 * Exemple d'utilisation du CASAuthenticator et de Tomuss (et de la fonction fillXlsxFile)
 */
async function main() {
    const casAuthenticator = new CASAuthenticator()
    await casAuthenticator.login('pXXXXXXX', 'password')

    const tomuss = new Tomuss(casAuthenticator)
    const subjects = await tomuss.getSubjects(Semester.S1, Semester.S2)

    await fillXlsxFile(subjects, '/chemin/vers/fichier.xlsx', true)
}
main().catch(console.error)