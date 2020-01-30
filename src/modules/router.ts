// R.A.M API
// Express routing

import express from 'express';
import cors from 'cors';
import { Uplink }   from "./uplink";
import { Response } from './response';
import { State }    from '../interfaces/state';
import * as config from '../config.json';

export class Router {
    app: any;
    logger: any;

    constructor(logger: any) {
        // Setup logger
        this.logger = logger;
        // Setup handlers instance
        this.app = express();
        // Enable CORS headers
        this.app.use(cors());
        // Enable default handler
        this.app.use((req: any, res: any, next: any) => {
            this.default(req, res, next);
        });

        // Add aggregates endpoint
        this.app.get(`${config.api.base_endpoint}/aggregates`, (req: any, res: any) => {
            this.aggregates(req, res);
        })

        // Start API
        this.app.listen(config.api.port, (error: Error) => {
            if (error) {
                this.logger.error("FATAL! Failed to start Express Server.");
                this.logger.error(error);
            }
            this.logger.info(`API Started successfully, now listening on port ${config.api.port}.`);
        })
    }

    default(req: any, res: any, next: any) {
        // Called for every API call
        res.set("Content-Type", "application/json")
        res.set("X-Powered-By", "R.A.M")
        this.logger.verbose(`API Act: ${req.hostname} ${req.originalUrl}`)
        next()
    }

    aggregates(req: any, res: any) {
        res.json({"yeet": "woo, api"})
    }
}