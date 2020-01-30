// R.A.M API
// Express routing

import express from 'express';
import cors from 'cors';
import path from 'path';
import * as config from '../config.json';

class Handlers {
    public default(req: any, res: any, next: any) {
        // Called for every API call
        res.set("Content-Type", "application/json")
        res.set("X-Powered-By", "R.A.M")
        next()
    }

    public aggregates(req: any, res: any, next: any) {
        res.json({"yeet": "woo, api"})
    }
}

export class Router {
    app: any;
    handlers: any;
    logger: any;

    constructor(logger: any) {
        // Setup logger
        this.logger = logger
        // Setup handlers instance
        this.handlers = new Handlers;
        // Setup Express router
        this.app = express();
        // Enable CORS headers
        this.app.use(cors());
        // Enable default handler
        this.app.use(this.handlers.default);

        // Add aggregates endpoint
        this.app.get(`${config.api.base_endpoint}/aggregates`, this.handlers.aggregates)

        // Start API
        this.app.listen(config.api.port, (error: Error) => {
            if (error) {
                this.logger.error("FATAL! Failed to start Express Server.")
                this.logger.error(error)
            }
            this.logger.info(`API Started successfully, now listening on port ${config.api.port}.`)
        })
    }

}