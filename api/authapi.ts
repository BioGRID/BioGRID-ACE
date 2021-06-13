/**
 * API Class for the Auth API
 * Suitable for Axios injection and reuse
 * in the entire site
 */

export default class AuthAPI {
    private $axios: any
    private apiURL: string | undefined

    constructor (context: any) {
        this.apiURL = context.$config.authAPIURL
        this.$axios = context.$axios
    }

    public GET_ALL_USERS (apiKey: string) {
        return this.$axios.get(this.apiURL + '/users', {
            headers: { Authorization: apiKey }
        })
    }
}
