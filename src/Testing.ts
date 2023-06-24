import * as fs from "fs";
import CASAuthenticator from "./classes/CASAuthenticator";
import Tomuss from "./classes/Tomuss";
import {Semester} from "./util/Semester";

async function main() {
    const casAuthenticator = new CASAuthenticator()
    await casAuthenticator.login('username', 'password')

    const tomuss = new Tomuss(casAuthenticator)
    const subjects = await tomuss.getSubjects(Semester.S2)

    fs.writeFileSync('subjects.json', JSON.stringify(subjects, null, 4))
}
main()