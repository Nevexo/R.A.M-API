// R.A.M API
// Data uplink handler

export class Uplink {
    // This class handles data uplinking from R.A.M
    logger: any;
    data: any;

    constructor (logger: any, data: any) {
        this.logger = logger;
        this.data = data;
    }

    createFullObject(changes: any) {
        // Takes the uploaded object and adds them to the main data
        // Temporary until mongodb is implemented
        let data = this.data.get(); // Get current object
        for (let property in data) {
            if (data['ram_parameters'].hasOwnProperty(property)) {
                if (changes[property] != undefined) {
                    // A change has been made to this property
                    data['ram_parameters'][property]['data'] = changes[property]
                    // Update date/time
                    data['ram_parameters'][property]['last_changed'] = new Date().toISOString()
                } 
            }
        }
        return data
    }

    uplinkRequest(form: any) {
        
    }
}