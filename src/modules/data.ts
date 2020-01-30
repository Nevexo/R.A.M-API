// R.A.M API
// Database system

// TODO: Replace this with MongoDB
import { State }    from '../interfaces/state';


export class Data {
    data: any; // Temporary store for all data.
    logger: any;

    constructor (logger: any) {
        this.logger = logger
        // Setup default data payload
        this.data = {
            "task": "Unknown",
            "mode": "Unknown",
            "vehicle": "Unknown",
            "path": "Unknown",
            "control_mode": "Unknown"
        }
    }

    public set(data: State) {
        this.data = data
        this.logger.debug("Database updated.")
    }

    public get() {
        return this.data
    }
}