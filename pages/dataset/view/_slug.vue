<template>
    <div id="dataset-view">
        <v-container fluid class="pt-0">
            <v-row dense>
                <v-col
                    cols="12"
                    xl="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                >
                    <DatasetDetails :dark="darkMode" :collapsed="false" :dataset="dataset" />
                </v-col>
            </v-row>
            <v-row dense>
                <v-col
                    cols="12"
                    xl="12"
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                >
                    <DatasetTools :dark="darkMode" :dataset="dataset" :history="history" @closeDataset="closeDataset" />
                </v-col>
            </v-row>
            <v-row
                dense
                cols="12"
                xl="12"
                lg="12"
                md="12"
                sm="12"
                xs="12"
            >
                <v-tabs
                    v-model="tab"
                    background-color="primary"
                    class="elevation-2 mt-1 mb-2"
                    dark
                    :centered="true"
                    :grow="true"
                >
                    <v-tab href="#history">
                        History
                        <v-icon class="ml-2" color="green lighten-3">
                            mdi-history
                        </v-icon>
                    </v-tab>
                    <v-tab href="#data">
                        Curated Data
                        <v-icon class="ml-2" color="orange lighten-1">
                            mdi-folder
                        </v-icon>
                    </v-tab>
                    <v-tab href="#curate">
                        Curate New Data
                        <v-icon class="ml-2" color="yellow lighten-3">
                            mdi-folder-plus
                        </v-icon>
                    </v-tab>
                    <v-tab href="#notes">
                        Notes
                        <v-icon class="ml-2" color="purple lighten-3">
                            mdi-file-document-edit
                        </v-icon>
                    </v-tab>
                    <v-tab href="#files">
                        Files <v-icon class="ml-2" color="light-blue lighten-3">
                            mdi-file-cabinet
                        </v-icon>
                    </v-tab>
                    <v-tab-item class="" value="history">
                        <HistoryList
                            :dark="darkMode"
                            :show-note="false"
                            :history="history"
                        />
                    </v-tab-item>

                    <v-tab-item class="pa-0 ma-0" value="data">
                        <DatasetEntities :dataset="dataset" />
                    </v-tab-item>

                    <v-tab-item class="pa-0 ma-0" value="curate">
                        <!--<DatasetCurate :dataset="dataset" />-->
                    </v-tab-item>
                </v-tabs>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DatasetDetails from '@/components/datasets/DatasetDetails.vue'
import notification from '@/utilities/notifications'
import DatasetTools from '@/components/datasets/DatasetTools.vue'
import HistoryList from '@/components/history/HistoryList.vue'
import DatasetEntities from '@/components/datasets/DatasetEntities.vue'
// import DatasetCurate from '@/components/datasets/DatasetCurate.vue'
import { HistoryEntry } from '@/utilities/types'

@Component({
    components: {
        DatasetDetails,
        DatasetTools,
        HistoryList,
        DatasetEntities
        // DatasetCurate,
    }
})
export default class DatasetView extends Vue {
    private datasetID: number = 0;
    private darkMode: boolean = false;
    private dataset: any = {};
    private history: HistoryEntry[] = [];
    private tab: string = 'history';
    private isActive: boolean = false;

    private created () {
    }

    public async asyncData (context: any) {
        let datasetID: number = context.route.params.slug
        if (!Number.isInteger(Number(datasetID))) {
            return context.redirect('/error/notfound')
        }

        datasetID = Number(datasetID)

        let dataset = context.store.getters['curation/getOpenDataset'](datasetID)
        let history = context.store.getters['curation/getOpenHistory'](datasetID)
        if (!dataset) {
            datasetID = await context.store.dispatch('curation/fetch_dataset_by_id', {
                datasetID
            })
            if (datasetID === undefined || datasetID === 0) {
                context.store.dispatch('notify/displayNotification', notification('error', 'dataset_fetch_nonexistant'), { root: true })
                context.redirect('/error/notfound')
            }
            dataset = context.store.getters['curation/getOpenDataset'](datasetID)
            history = context.store.getters['curation/getOpenHistory'](datasetID)
        }

        return {
            datasetID: Number(datasetID),
            history,
            dataset
        }
    }

    private closeDataset () {
        this.$store.dispatch('curation/remove_dataset', { dataset_id: this.datasetID }).then(() => {
            this.$store.dispatch('incrementPathCache', { path: this.$route.path })
            this.$destroy()
        })
    }

    private activated () {
        this.isActive = true
    }

    private deactivated () {
        this.isActive = false
    }

    private destroyed () {
        if (this.isActive) {
            this.$router.push('/elements/Dashboard')
        }
    }
}

</script>
