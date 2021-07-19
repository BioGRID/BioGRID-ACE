<template>
    <div class="expandable-input-panel">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <template #default="{ open }">
                        <v-row no-gutters>
                        <v-col cols="4">
                            {{ panelLabel }}:
                        </v-col>
                        <v-col
                            cols="8"
                            class="text--secondary"
                        >
                            <v-fade-transition leave-absolute>
                            <span
                                v-if="open"
                                key="0"
                            >
                                {{ panelDesc }}
                            </span>
                            <span
                                v-else
                                key="1"
                            >
                                {{ panelDisplayValues() }}
                            </span>
                            </v-fade-transition>
                        </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <ACEDataTable
                        class="mt-5"
                        :title="panelDataTableTitle"
                        table-class="pa-1"
                        :columns="panelEntryTableHeaders"
                        :rows="panelDisplayRows"
                        :rows-per-page="100"
                        :total-rows="panelEntryTableCount"
                        :pagination="true"
                        :show-search="true"
                    >
                        <template slot-scope="{ row }">
                            <td v-for="(column, colIndex) in panelEntryTableHeaders" :key="colIndex" class="text-left" wrap>
                                <div v-if="colIndex < panelEntryTableHeaders.length - 1">
                                    {{ row[column.field] }}
                                </div>
                                <div v-else>
                                    <v-btn class="ma-2" color="red" dark @click="deletePanelListItem(row)">
                                        Delete
                                        <v-icon dark right>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </td>
                        </template>
                    </ACEDataTable>

                    <div v-if="panelLabel==='Synonyms'">
                        <AddChemicalNameForm
                            :panel-display-rows="panelDisplayRows"
                        />
                    </div>
                    <div v-else>
                        <AddChemicalDBxrefsForm
                            :panel-display-rows="panelDisplayRows"
                        />
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ACEDataTable from '@/components/data/ACEDataTable.vue'
import AddChemicalNameForm from '@/components/forms/AddChemicalNameForm.vue'
import AddChemicalDBxrefsForm from '@/components/forms/AddChemicalDBxrefsForm.vue'

@Component({
    components: {
        ACEDataTable,
        AddChemicalNameForm,
        AddChemicalDBxrefsForm
    }
})
export default class ExpandableInputPanel extends Vue {
    @Prop({ type: String, default: '' }) private panelDataTableTitle!: string
    @Prop({ type: String, default: '' }) private panelLabel!: string
    @Prop({ type: String, default: '' }) private panelDesc!: string
    @Prop({ type: Array }) private fieldsToRemoveEntry!: string[]
    @Prop({ type: String, default: 'Add New Entry' }) private panelFieldPlaceholder!: string
    @Prop({ type: Array }) private panelEntryTableHeaders!: any[]
    @Prop({ type: Array, default: () => [] }) private panelDisplayRows!: any[]
    private entryCount: number = 0

    get panelEntryTableCount () {
        return this.panelDisplayRows.length
    }

    private panelDisplayValues () {
        return Object.values(this.panelDisplayRows)
    }

    private deletePanelListItem (rowToDelete: any) {
        // go through fieldsToRemoveEntry and find any matches that need to be deleted
        let indexToRemove = -1
        for (const [index, val] of this.panelDisplayRows.entries()) {
            let foundHit = true
            for (const fieldType of this.fieldsToRemoveEntry) {
                if (val[fieldType] !== rowToDelete[fieldType]) {
                    foundHit = false
                }
            }
            if (foundHit) {
                indexToRemove = index
            }
        }

        if (indexToRemove !== -1) {
            Vue.delete(this.panelDisplayRows, indexToRemove)
            this.$emit('updateEntries', this.panelDisplayRows)
        }
    }
}
</script>

<style lang="scss" scoped>
    table {
        tr {
            td {
                padding: 5px;
            }
        }
    }
</style>
