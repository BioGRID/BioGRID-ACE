/**
 * API Class for the Annotation API
 * Suitable for Axios injection and reuse
 * in the entire site
 */

export default class AnnotationAPI {
    private $axios: any
    private apiURL: string | undefined

    constructor (context: any) {
        this.apiURL = context.$config.annotationAPIURL
        this.$axios = context.$axios
    }

    // Get Organisms from the Annotation API
    public async ORGANISM_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/organisms?count=10000', {
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

    // Get Ontologies
    public async ONTOLOGY_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/ontologies?count=10000', {
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

    // Get Chemical/s from the Annotation API
    public async CHEMICAL_FETCH (apiKey: string, chemicalQueryID: string) {
        try {
            const res = await this.$axios.get(this.apiURL! + '/chemical/' + chemicalQueryID, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return res.data
            }
        } catch (error) {
            console.error(error)
            throw new Error(error.response.data.message)
        }

        return undefined
    }

    // Get All Chemical/s from the Annotation API
    public async CHEMICAL_FETCH_ALL (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL! + '/chemicals', {
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
}
