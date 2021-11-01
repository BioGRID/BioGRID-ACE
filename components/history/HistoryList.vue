<template>
    <div class="history-list">
        <v-card
            outlined
            :color="color"
            :dark="dark"
            class="pa-5 p"
        >
            <div class="headline font-weight-bold">
                History ({{ historySize }})
            </div>
            <p class="body-2 mb-2 font-weight-regular">
                Most recent state changes for this dataset...
            </p>
            <v-sheet
                v-for="(history, i) in history"
                :key="i"
                class="mb-2 pa-1"
                color="grey lighten-4"
                elevation="1"
            >
                <v-chip
                    :color="historyColor( history.method )"
                    class="mt-0"
                    dark
                    small
                    label
                >
                    <v-avatar left>
                        <v-icon>{{ historyIcon(history.method) }}</v-icon>
                    </v-avatar>
                    <span class="font-weight-bold">
                        {{ historyMethod(history.method) }}
                    </span>
                </v-chip>
                <v-chip
                    color="grey darken-3"
                    dark
                    small
                    label
                    class="ml-1 mt-0"
                >
                    <v-avatar left>
                        <v-icon>mdi-account</v-icon>
                    </v-avatar>

                    <span class="font-weight-bold">
                        {{ userName(history.user_id) }}
                    </span>
                </v-chip>
                <v-chip
                    color="deep-orange darken-1"
                    dark
                    small
                    label
                    class="ml-1 mt-0"
                >
                    <v-avatar left>
                        <v-icon>mdi-account-group</v-icon>
                    </v-avatar>

                    <span class="font-weight-bold">
                        {{ curationGroup(history.curation_group_id) }}
                    </span>
                </v-chip>

                 <span v-if="showNote" class="pl-2">
                    {{ history.comment }}
                </span>
                 <span class="pl-2 caption">
                    {{ addedDate( history.added_date ) }}
                </span>
            </v-sheet>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import { HistoryEntry, CurationGroupHash, DatasetCurationOptionHash } from '@/utilities/types'

const curation = namespace('curation')
const users = namespace('users')

@Component
export default class HistoryList extends Vue {
    @curation.State private curationGroups!: CurationGroupHash;
    @curation.State private datasetCurationOptions!: DatasetCurationOptionHash;
    @users.State private users!: any;
    @Prop() private history!: HistoryEntry[];
    @Prop({ type: Number, default: 0 }) private refID!: number;
    @Prop({ type: String, default: '' }) private refType!: string;
    @Prop({ type: String, default: '' }) private color!: string;
    @Prop({ type: Boolean, default: false }) private dark!: boolean;
    @Prop({ type: Boolean, default: false }) private showNote!: boolean;

    private created () {
    }

    get historySize () {
        if (this.history) {
            return this.history.length
        }
        return 0
    }

    private historyColor (method: string) {
        return this.datasetCurationOptions[method].color
    }

    private historyIcon (method: string) {
        return this.datasetCurationOptions[method].icon
    }

    private historyMethod (method: string) {
        return this.datasetCurationOptions[method].text
    }

    private userName (userID: number) {
        return this.users[userID].name
    }

    private addedDate (addedDate: string) {
        const historyDate = new Date(addedDate)
        return historyDate.toUTCString()
    }

    private curationGroup (curationGroupID: number) {
        return this.curationGroups[curationGroupID].name
    }
}
</script>

<style lang="scss">
.v-card {
    overflow-wrap: normal !important;
}
</style>
