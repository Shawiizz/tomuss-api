import CASAuthenticator from "./classes/CASAuthenticator";
import Tomuss from "./classes/Tomuss";
import {Semester} from "./util/Semester";
import {fillXlsxFile} from "./util/MoyButCalculator";

/**
 * Exemple d'utilisation du CASAuthenticator et de Tomuss (et de la fonction fillXlsxFile)
 */
async function main() {
    const casAuthenticator = new CASAuthenticator()
    await casAuthenticator.login('pXXXXXXX', 'password')

    const tomuss = new Tomuss(casAuthenticator)
    const subjects = await tomuss.getSubjects(Semester.S1, Semester.S2)

    await fillXlsxFile(subjects, '/home/shawiizz/Téléchargements/Calculer ses moyennes BUT - Info Doua11.xlsx', true)
}
main().catch(console.error)