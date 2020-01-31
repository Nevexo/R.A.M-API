// R.A.M API
// Data uplink handler

import { State } from '../interfaces/state';

export class Uplink {
    // This class handles data uplinking from R.A.M
    logger: any;
    data: any;

    constructor (logger: any, data: any) {
        this.logger = logger;
        this.data = data;
    }

    // TODO: Remove callback!!!
    createFullObject(changes: any, callback: any) {
        // Takes the uploaded object and adds them to the main data
        // Temporary until mongodb is implemented
        let data = this.data.get(); // Get current object
        const properties = Object.keys(data['ram_parameters'])
        for (let property in properties) {
            property = properties[property]
            if (changes.hasOwnProperty(property)) {
                data['ram_parameters'][property]['data'] = changes[property]
                data['ram_parameters'][property]['last_changed'] = new Date().toISOString()
            }
        }
        callback(data)
    }
    // TODO: Remove callback!!!
    public uplinkRequest(form: any, callback: any) {
        this.createFullObject(form, (new_data: any) => {
            console.dir(new_data)
            if (new_data == this.data.get()) {
                callback("No new data.")
            }else {
                new_data['last_uplink_time'] = new Date().toISOString()
                this.data.set(new_data)
                callback(true)
            }
        });
    }
}