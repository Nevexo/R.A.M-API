// R.A.M API
// Database system

// TODO: Replace this with MongoDB

export class Data {
    data: any; // Temporary store for all data.
    logger: any;

    constructor (logger: any) {
        this.logger = logger
    }

    public set(data: any) {
        this.data = data
        this.logger.debug("Database updated.")
    }

    public get() {
        return this.data
    }
}