/**
 * API Class for the Annotation API
 * Suitable for Axios injection and reuse
 * in the entire site
 */

export interface OrganismEntry {
    id: number;
    common_name: string;
    official_name: string;
    abbreviation: string;
    strain: string;
    deprecated: number;
}

export interface OrganismHash {
    [key: number]: OrganismEntry;
}

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
            console.log(error)
            throw new Error(error.response.data.message)
        }

        return undefined
    }
}
