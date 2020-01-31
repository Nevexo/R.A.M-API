// R.A.M API
// Express routing

import express from 'express';
import cors from 'cors';
import { Uplink }   from "./uplink";
import { State }    from '../interfaces/state';
import * as config from '../config.json';

export class Router {
    app: any;
    logger: any;
    data: any;
    uplink: any;

    constructor(logger: any, data: any) {
        // Setup database interface
        this.data = data
        // Setup uplink module
        this.uplink = new Uplink(logger, this.data)
        // Setup logger
        this.logger = logger;
        // Setup handlers instance
        this.app = express();
        // Enable CORS headers
        this.app.use(cors());
        // Enable forms 
        this.app.use(express.urlencoded({extended: true}))
        // Enable default handler
        this.app.use((req: any, res: any, next: any) => {
            this.default(req, res, next);
        });

        // Add aggregates endpoint
        this.app.get(`${config.api.base_endpoint}/aggregates`, (req: any, res: any) => {
            this.aggregates(req, res);
        })

        // Add uplink endpoint
        this.app.post(`${config.api.base_endpoint}/uplink`, (req: any, res: any) => {
            if (req.headers.authorization != undefined) {
                if (config.authentication.tokens.indexOf(req.headers.authorization) > -1) {
                    this.uplink.uplinkRequest(req.body, (status: any) => {
                        if (status) {
                            this.logger.verbose("API Act Response (204): Updated everything.")
                            res.sendStatus(204)
                        }else {
                            res.status(500)
                            res.json({"error": status})
                        }
                    })
                }else {
                    this.logger.verbose("API Act Response (401): Invalid authentication token")
                    res.status(401)
                    res.json({"error": "Invalid token"})
                }
            }else {
                this.logger.verbose("API Act Response (401): No authentication token")
                res.status(401)
                res.json({"error": "No auth header"})
            }
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
        const current_data = this.data.get()
        res.json(current_data)
    }
}