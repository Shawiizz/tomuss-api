import {FastifyInstance} from "fastify";
import * as path from "path";
import * as fs from "fs";
import TomussService from "tomuss-api/dist/services/TomussService";
import {CASService} from "../services/CASService";
import {mergeModulesWithSameUeId} from "tomuss-api/dist/util/ModuleUtil";
import {fillXlsxFile} from "tomuss-api/dist/util/MoyButCalculator";
import {Season} from "tomuss-api/dist/util/enum/Season";
import {Semester} from "tomuss-api/dist/util/Semester";

const casService = new CASService();

export default (app: FastifyInstance) => {
    const rootPath = path.join(__dirname, '../..');

    app.get('/', async (request, reply) => {
        const htmlPath = path.join(rootPath, 'src', 'client', 'index.html')
        console.log(htmlPath)
        return reply.type('text/html').send(fs.createReadStream(path.join(rootPath, 'src', 'client', 'index.html')))
    });

    app.post('/login', async (request, reply) => {
        const {username, password} = request.body as { username: string, password: string };

        if (casService.isLoggedIn)
            return reply.code(200).send(true);

        reply.code(400)

        if (!username || !password)
            return reply.send({error: 'Missing username or password'});

        if (typeof username !== 'string' || typeof password !== 'string' || username.length < 1 || password.length < 1)
            return reply.send({error: 'Invalid username or password'});

        await casService.login(username, password)
        return reply.code(200).send(true);
    })

    app.get('/semesters', async (request, reply) => {
        if (!casService.isLoggedIn)
            return reply.code(401).send({error: 'You need to be logged in'});

        const tomussService = new TomussService(casService.authService)
        const semesters = await tomussService.getAvailableSemesters()
        return reply.code(200).send({semesters});
    })

    app.post('/calculate', async (request, reply) => {
        const {semesters, calcMoy} = request.body as {
            semesters: {
                season: Season;
                year: number;
            }[], calcMoy: boolean
        };

        reply.code(400)

        if (calcMoy && typeof calcMoy !== 'boolean')
            return reply.send({error: 'Invalid calcMoy'});

        const tomussService = new TomussService(casService.authService);
        const subjects = await tomussService.getModules(...semesters.map(semester => Semester.fromYearAndSeason(semester.year, semester.season)))
        const mergedModules = mergeModulesWithSameUeId(subjects)

        const pathToXlsx = path.join(rootPath, 'Calculer ses moyennes BUT - Info Doua.xlsx');

        const modifiedXlsxFileBuffer = await fillXlsxFile(mergedModules, pathToXlsx, calcMoy)
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