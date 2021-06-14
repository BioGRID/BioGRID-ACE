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

    public async GET_ALL_USERS (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/users', {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return res.data.data
            }
        } catch (error) {
            console.error(error)
            throw new Error(error.response.data.message)
        }

        return undefined
    }

    // Update an existing Permission
    public async PERMISSION_UPDATE (apiKey: string, payload: object, permID: number) {
        try {
            const res = await this.$axios.put(this.apiURL + '/permission/' + permID, payload, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            if (error.response === undefined) {
                console.error(error)
                throw new Error('permission_update_unknown')
            } else if (error.response.status === 409) {
                throw new Error('permission_update_conflict')
            } else {
                console.error(error)
                throw new Error('permission_update_unknown')
            }
        }

        return false
    }

    // Add a new Permission
    public async PERMISSION_ADD (apiKey: string, payload: object) {
        try {
            const res = await this.$axios.post(this.apiURL + '/permission', payload, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            if (error.response === undefined) {
                console.error(error)
                throw new Error('permission_add_unknown')
            } else if (error.response.status === 409) {
                console.error(error)
            } else {
                console.error(error)
                throw new Error('permission_add_unknown')
            }
        }

        return false
    }

    // Get Permissions
    public async PERMISSION_GETALL (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/permissions', {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return res.data.data
            }
        } catch (error) {
            console.error(error.response)
            throw new Error(error.response.data.message)
        }

        return undefined
    }
}
