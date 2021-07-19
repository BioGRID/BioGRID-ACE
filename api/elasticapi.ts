/**
 * API Class for the Elastic API
 */

 export default class ElasticAPI {
    private $axios: any
    private apiURL: string | undefined

    constructor (context: any) {
        this.apiURL = context.$config.searchAPIURL
        this.$axios = context.$axios
    }

    // Query Elastic Search
    public async ELASTIC_QUERY (apiKey: string, search: object, index: string, errorCallback?: (error: any) => void) {
        try {
            const res = await this.$axios.post(this.apiURL + '/query/' + index, search, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return res.data
            }
        } catch (error) {
            console.error(error.response)
            if (errorCallback !== undefined) {
                errorCallback(error)
            }
        }
        return undefined
    }

    // Get the count of results for a query, rather than the actual results
    public async ELASTIC_COUNT (apiKey: string, search: object, index: string) {
        try {
            const res = await this.$axios.post(this.apiURL + '/count/' + index, search, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return res.data.count
            }
        } catch (error) {
            console.error(error.response)
        }

        return 0
    }
}
