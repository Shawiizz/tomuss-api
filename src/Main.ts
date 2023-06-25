import {fastify} from "fastify";
import FastifyConfig from "./config/FastifyConfig";

export const app = fastify({
    logger: false,
});

FastifyConfig(app) // Set up the Fastify server