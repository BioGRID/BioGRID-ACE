<template>
    <v-container fluid class="index-page pa-2">
        <v-container fluid class="pt-0">
            <div v-if="datasetType === 'pubmed'">
                <h1>Contacting PubMed to retrieve dataset...</h1>
                <v-progress-linear
                    indeterminate
                    color="blue"
                />
                <p class="title">
                    Attempting to retreive dataset from the pubmed remote api. You will be redirected as soon as soon as the dataset is available...
                </p>
                <v-img
                    :src="require('~/assets/images/pubmed_logo.png')"
                    contain
                    max-height="150"
                />
            </div>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import notification from '@/utilities/notifications'
import { asyncTimeout } from '@/utilities/helpers'

const curation = namespace('curation')

@Component
export default class DatasetLoadPage extends Vue {
    @curation.State private openDatasets!: Map<number, any[]>
    @curation.State private processingTasks!: any
    private datasetID: number = 0
    private datasetSourceID: number = 0
    private datasetType: string = 'pubmed'
    private maxOpenDatasets: number = 5
    private asyncTimeoutTime: number = 1000
    private maxTaskCheckAttempts: number = 20
    private fetchPubmedPriority: number = 55
    private datasetTypes: string[] = [
        'pubmed',
        'prepub',
        'biorxiv'
    ]

    public created () {
        if (!this.datasetTypes.includes(this.datasetType)) {
            return this.$router.push('/error/notfound')
        }
        this.fetchDataset()
    }

    public asyncData (context: any) {
        const slug: number = context.route.params.slug
        const type: string = context.route.query.type
        if (!Number.isInteger(Number(slug))) {
            return context.redirect('/error/notfound')
        }

        return {
            datasetSourceID: Number(slug),
            datasetType: type
        }
    }

    private async fetchDataset () {
        if (this.$auth.loggedIn) {
            this.$store.dispatch('enableLoadingOverlay', {}, { root: true })

            try {
                if (this.openDatasets.size >= this.maxOpenDatasets) {
                    this.$store.dispatch('notify/displayNotification', notification('error', 'dataset_fetch_maximumreached'), { root: true })
                    this.$router.push('/')
                } else {
                    let datasetID: number | undefined = await this.$store.dispatch('curation/fetch_dataset', {
                        sourceID: this.datasetSourceID,
                        sourceType: this.datasetType
                    })

                    if (datasetID === undefined) {
                        this.$router.push('/')
                    } else if (datasetID !== 0) {
                        this.$store.dispatch('curation/add_curation_drawer_link', { dataset_id: datasetID })
                        this.$router.push('/dataset/view/' + datasetID)
                    } else {
                        // No pubmed has been found to already exist
                        // Create a task to grab the pubmed
                        const payload = this.$curationapi.createProcessingTask(this.$store.getters['users/getUser'], 'fetch_pubmed', { id: String(this.datasetSourceID) }, null, this.fetchPubmedPriority)
                        const taskdata = await this.$curationapi.TASK_ADD(this.$store.getters['users/getToken'], payload)
                        let notificationMessage: string = 'dataset_fetch_timeout'
                        if (taskdata !== undefined) {
                            const taskID = taskdata.processing_id
                            datasetID = 0
                            // Wait here for up to maxTaskCheckAttempts or until the task
                            // we submitted shows up in the processing tasks list
                            for (let i = 0; i < this.maxTaskCheckAttempts; i++) {
                                console.log('Loop ' + i)
                                await asyncTimeout(this.asyncTimeoutTime)
                                if (this.processingTasks[taskID] !== undefined) {
                                    console.log('TASK ARRIVED')
                                    // Check for errors here, if we find some, deal with them here
                                    const statusCode: number = this.processingTasks[taskID].status_code
                                    if (statusCode === 200) {
                                        // It's complete, re-call fetch_current_dataset
                                        datasetID = await this.$store.dispatch('curation/fetch_dataset', {
                                            sourceID: this.datasetSourceID,
                                            sourceType: this.datasetType
                                        })
                                    } else if (statusCode === 404) {
                                        notificationMessage = 'dataset_fetch_nonexistant'
                                        datasetID = undefined
                                    }

                                    break
                                }
                            }

                            if (datasetID !== undefined && datasetID !== 0) {
                                // We've now fetched successfully, take us to the page
                                this.$router.push('/dataset/view/' + datasetID)
                            } else {
                                // We've failed yet again. Show an error message and go
                                // back to the dashboard. Could be because there are too many
                                // tasks running
                                this.$store.dispatch('notify/displayNotification', notification('error', notificationMessage), { root: true })
                                this.$router.push('/')
                            }
                        } else {
                            // Unable to submit the task
                        }
                    }
                }
            } finally {
                this.$store.dispatch('disableLoadingOverlay', {}, { root: true })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
