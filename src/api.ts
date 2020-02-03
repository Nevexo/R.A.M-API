// R.A.M Central Logging API
// A TypeScript based caching API for R.A.M, the ETS2 self-driving vehicle.

import { Router } from "./modules/router";
import { State }  from './interfaces/state';
import { Data }   from './modules/data';  
import { TruckyApp } from './modules/truckyapp';
import Winston from 'winston';

const logger = Winston.createLogger({
    level: 'debug',
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

let data = new Data(logger);
const router = new Router(logger, data);
const trucky = new TruckyApp(logger, data);