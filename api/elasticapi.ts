/**
 * API Class for the Elastic API
 */

 export default class ElasticAPI {
    private $axios: any
    private apiURL: string | undefined

    constructor (context: any) {
        this.apiURL = context.$config.curationAPIURL
        this.$axios = context.$axios
    }
}
