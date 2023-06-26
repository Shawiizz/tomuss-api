import {FastifyInstance} from "fastify";
import * as path from "path";
import * as fs from "fs";
import {CASAuthenticator, fillXlsxFile, mergeSubjectsWithSameUeId, Semester, Tomuss} from "tomuss-api";

export default (app: FastifyInstance) => {
    const rootPath = path.join(__dirname, '../..');

    app.get('/', async (request, reply) => {
        const htmlPath = path.join(rootPath, 'src', 'client', 'index.html')
        console.log(htmlPath)
        return reply.type('text/html').send(fs.createReadStream(path.join(rootPath, 'src', 'client', 'index.html')))
    });

    app.post('/calculate', async (request, reply) => {
        const {username, password, calcMoy} = request.body as { username: string, password: string, calcMoy: boolean };

        reply.code(400)

        if(!username || !password)
            return reply.send({ error: 'Missing username or password' });

        if(typeof username !== 'string' || typeof password !== 'string' || username.length < 1 || password.length < 1)
            return reply.send({ error: 'Invalid username or password' });

        if(calcMoy && typeof calcMoy !== 'boolean')
            return reply.send({ error: 'Invalid calcMoy' });

        const casAuthenticator = new CASAuthenticator()
        await casAuthenticator.login(username, password)

        const tomuss = new Tomuss(casAuthenticator)
        const subjects = await tomuss.getSubjects(Semester.S1, Semester.S2)
        const mergedSubjects = mergeSubjectsWithSameUeId(subjects)

        const pathToXlsx = path.join(rootPath, 'Calculer ses moyennes BUT - Info Doua.xlsx');

        const modifiedXlsxFileBuffer = await fillXlsxFile(mergedSubjects, pathToXlsx, calcMoy)
        return reply.code(200).send(modifiedXlsxFileBuffer);
    })

    // Start the server
    app.listen({port: 8745, host: '::'}, function (err, address) {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.info(`Server listening on ${address}`)
    })
}