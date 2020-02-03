// R.A.M API
// TruckyApp Interface

import Request from 'request';
import * as config from '../config.json';

export class TruckyApp {
    logger: any
    data: any

    constructor(Logger: any, Data: any) {
        this.logger = Logger
        this.data = Data
        this.update_data()
        setInterval(() => {
            this.update_data()
        }, 60000) // 1 minute
    }

    update_data() {
        // TODO: Refactor
        this.logger.debug("[!] Updating truckyapp data.")
        const request_url = `${config.truckyapp.base_url}?playerID=${config.truckyapp.ram_player_id}`
        let data = this.data.get()
        Request(request_url, (error, response, body) => {
            if (error) {
                this.logger.error("Failed to get truckyapp data.")
                this.logger.error(error)
            }else {
                if (response.statusCode == 200) {
                    const cache = JSON.parse(body)
                    if (cache['response']['online']) {
                        // R.A.M online
                        data['ram_online'] = true
                        data['ram_location'] = `${cache['response']['location']['poi']['realName']}`
                         + ` (${cache['response']['location']['poi']['country']})`
                        data['ram_server'] = cache['response']['serverDetails']['name']
                    }else {
                        data['ram_online'] = false
                        data['ram_location'] = ""
                        data['ram_server'] = ""
                    }
                    // Write to database
                    this.logger.debug("Truckyapp update complete, writing to DB.")
                    this.data.set(data)

                }else {
                    this.logger.error(`Error updating truckyapp data, response ${response.statusCode} (${response.statusMessage})`)
                }
            }
        })
    }
}