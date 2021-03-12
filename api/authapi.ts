/**
 * API Class for the Auth API
 * Suitable for Axios injection and reuse
 * in the entire site
 */

import { UserLogin } from '@/utilities/types'

export default class AuthAPI {
    private $axios: any
    private apiURL: string | undefined
    private apiKEY: string | undefined

    constructor ($axios: any, apiKey: string) {
        this.apiURL = process.env.NUXT_ENV_AUTH_API_URL
        this.apiKEY = apiKey
        this.$axios = $axios
    }

    public login (payload: UserLogin) {
        return this.$axios.post(this.apiURL + '/login', payload, {
            headers: { Authorization: 'Bearer ' + this.apiKEY }
        })
    }
}
