import { ProcessingTask, HistoryEntry } from '@/utilities/types'

/**
 * API Class for the Curation API
 */

export default class CurationAPI {
    private $axios: any
    private apiURL: string | undefined

    constructor (context: any) {
        this.apiURL = context.$config.curationAPIURL
        this.$axios = context.$axios
    }

    // Get Attribute Types from the Curation API
    public async ATTRIBUTE_TYPE_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/attributetypes?count=100000&activeonly=1', {
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

    // Get Curation Groups from the Curation API
    public async CURATION_GROUP_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/curationgroups?count=100000&activeonly=1', {
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

    // Add a new curation group to the database
    public async CURATION_GROUP_ADD (apiKey: string, payload: object) {
        try {
            const res = await this.$axios.post(this.apiURL + '/curationgroup', payload, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            if (error.response.status === 409) {
                throw new Error('curationgroup_add_conflict')
            } else {
                throw new Error('curationgroup_add_unknown')
            }
        }

        return false
    }

    // Update an existing curation group
    public async CURATION_GROUP_UPDATE (apiKey: string, payload: object) {
        try {
            const res = await this.$axios.put(this.apiURL + '/curationgroup', payload, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            if (error.response.status === 409) {
                throw new Error('curationgroup_update_conflict')
            } else {
                console.error(error.response.data)
                throw new Error('curationgroup_update_unknown')
            }
        }

        return false
    }

    // Add a Task to the Processing Task Queue
    public async TASK_ADD (apiKey: string, task: ProcessingTask) {
        try {
            const res = await this.$axios.post(this.apiURL + '/task', task, {
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

    // Get Tasks from the Curation API
    public async TASK_FETCH (apiKey: string, count: number, userID: number = 0) {
        try {
            let url = this.apiURL + '/tasks'
            if (userID !== 0) {
                url += '/' + userID
            }
            const res = await this.$axios.get(url + '?count=' + count, {
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

    // Get entity families from the Curation API
    public async ENTITY_FAMILY_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/entityfamilies?count=100000&activeonly=1', {
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

    // Get entity families from the Curation API
    public async ENTITY_WORKFLOW_FETCH (apiKey: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/entityworkflows?count=100000&activeonly=1', {
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

    // Get Histories from the Curation API
    public async HISTORY_FETCH (apiKey: string, refID: number, refType: string) {
        try {
            const res = await this.$axios.get(this.apiURL + '/histories/' + refType + '/' + refID + '?count=100000', {
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

    // Add History entry
    public async HISTORY_ADD (apiKey: string, payload: HistoryEntry) {
        try {
            const res = await this.$axios.post(this.apiURL + '/history', payload, {
                headers: { Authorization: 'Bearer ' + apiKey }
            })

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            if (error.response.status === 500) {
                throw new Error('history_add_improper')
            } else {
                console.error(error)
                throw new Error('history_add_unknown')
            }
        }

        return false
    }
}
