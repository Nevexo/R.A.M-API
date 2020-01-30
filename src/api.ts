// R.A.M Central Logging API
// A TypeScript based caching API for R.A.M, the ETS2 self-driving vehicle.

import { Router }   from "./modules/router";
import { Uplink }   from "./modules/uplink";
import { Response } from './modules/response';
import { State }    from './interfaces/state';
import Winston from 'winston';

const logger = Winston.createLogger({
    level: 'info',
    format: Winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new Winston.transports.File({ filename: 'error.log', level: 'error' }),
      new Winston.transports.File({ filename: 'combined.log' }),
      new Winston.transports.Console( {format: Winston.format.simple() })
    ]
});

logger.info("Initalizing...")

const router = new Router(logger);