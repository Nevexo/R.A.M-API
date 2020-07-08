// R.A.M API
// Database system

// TODO: Replace this with MongoDB
import { State } from '../interfaces/state';


export class Data {
    data: any; // Temporary store for all data.
    logger: any;
    always_online: boolean = false;

    constructor (logger: any) {
        this.logger = logger
        // Setup default data payload
        const date = new Date().toISOString()
        this.data = {
            "ram_online": false,
            "ram_location": "",
            "ram_server": "",
            "ram_pid": 0,
            "ram_parameters": {
                "task": {"data": "Unknown", "last_changed": date},
                "mode": {"data": "Unknown", "last_changed": date},
                "vehicle": {"data": "Unknown", "last_changed": date},
                "path": {"data": "Unknown", "last_changed": date},
                "control_mode": {"data": "Unknown", "last_changed": date},
                "vehicle_damage": {"data": "Unknown", "last_changed": date}
            },
            "last_uplink_time": "2020-01-30T21:52:16+0000"
        }
    }

    public set(data: State) {
        this.data = data
        this.data['last_uplink_time'] = new Date().toISOString()
        this.logger.debug("Database updated.")
    }

    public get() {
        return this.data
    }

    public get_safe() {
        // To stop data overriding, the API should use this function
        let i = Object.assign({}, this.data)
        if (this.always_online) {
            i['ram_online'] = true
            if (i['ram_pid'] == 0) {
                // Not logged in at all, add some fake data
                i['ram_pid'] = 1337
                i['ram_server'] = "Simulation 99"
                i['ram_location'] = "Planet Earth"
            }
        }
        return i
    }

    public force_online(value: boolean) {
        this.always_online = value
        this.logger.info(`Always report online: ${value}.`)
    }
}
