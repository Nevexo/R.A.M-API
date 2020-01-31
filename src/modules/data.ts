// R.A.M API
// Database system

// TODO: Replace this with MongoDB
import { State } from '../interfaces/state';


export class Data {
    data: any; // Temporary store for all data.
    logger: any;

    constructor (logger: any) {
        this.logger = logger
        // Setup default data payload
        const date = new Date().toISOString()
        this.data = {
            "ram_online": true,
            "ram_location": "Calais",
            "ram_parameters": {
                "task": {"data": "Unknown", "last_changed": date},
                "mode": {"data": "Unknown", "last_changed": date},
                "vehicle": {"data": "Unknown", "last_changed": date},
                "path": {"data": "Unknown", "last_changed": date},
                "control_mode": {"data": "Unknown", "last_changed": date}
            },
            "last_uplink_time": "2020-01-30T21:52:16+0000"
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