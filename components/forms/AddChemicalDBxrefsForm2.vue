<template>
    <div>
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

                    <div class="add-chemical-dbxrefs-form">
                        <v-form>
                            <v-row>
                                <v-col
                                    cols="12"
                                    xl="6"
                                    lg="6"
                                    md="6"
                                    sm="12"
                                    xs="12"
                                >
                                    <v-select
                                        v-model="newSource"
                                        class="dbxrefSource"
                                        :items="chemicalSources"
                                        label="Select"
                                        attach
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    xl="6"
                                    lg="6"
                                    md="6"
                                    sm="12"
                                    xs="12"
                                >
                                    <v-text-field
                                        v-model.trim="newSourceID"
                                        label="Add New Source ID"
                                        :error-messages="newSourceIDErrors"
                                        dense
                                        required
                                        :disabled="isSourceEmpty"
                                        @input="$v.newSourceID.$touch()"
                                        @blur="$v.newSourceID.$touch()"
                                    />
                                </v-col>
                            </v-row>

                            <v-btn
                                size="x-large"
                                color="success"
                                :disabled="isInvalid"
                                @click="addEntry"
                            >
                                Add New Chemical Database Reference
                            </v-btn>
                        </v-form>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ACEDataTable from '@/components/data/ACEDataTable.vue'
import { required } from 'vuelidate/lib/validators'
import { inArrayOfObjects } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'

@Component({
    components: {
        ACEDataTable
    }
})
export default class AddChemicalDBxrefsForm2 extends Vue {
    @Prop({ type: String, default: '' }) private panelDataTableTitle!: string
    @Prop({ type: String, default: '' }) private panelLabel!: string
    @Prop({ type: String, default: '' }) private panelDesc!: string
    @Prop({ type: Array }) private fieldsToRemoveEntry!: string[]
    @Prop({ type: Array }) private panelEntryTableHeaders!: any[]
    @Prop({ type: Array, default: [] }) private panelDisplayRows!: any[]
    private entryCount: number = 0
    private showHint: boolean = false
    private newHint: string = ''
    private newSourceID: string = ''
    private newSource: string = ''
    private chemicalSources: string[] = ['ChemSpider', 'CHEMBL']

    private addEntry () {
        this.panelDisplayRows.push({
            source: this.newSource,
            source_id: this.newSourceID
        })
        this.newSource = ''
        this.newSourceID = ''
    }

    get isSourceEmpty () {
        return !this.newSource
    }

    get newSourceIDErrors () {
        const errors = []
        if (this.$v.newSourceID.$dirty) {
            if (!this.$v.newSourceID.required) {
                errors.push(generateValidationError('required', 'External Database ID', null))
            } else if (!this.$v.newSourceID.inArrayOfObjects) {
                errors.push(generateValidationError('valueinarray', 'Source and Source ID name', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private validations () {
        return {
            newSourceID: { required, inArrayOfObjects: inArrayOfObjects(this.panelDisplayRows, 'source_id', [{ source: this.newSource }]) }
        }
    }

    get panelEntryTableCount () {
        return this.panelDisplayRows.length
    }

    private panelDisplayValues () {
        return Object.values(this.panelDisplayRows)
    }

    private deletePanelListItem (valueToDelete: any) {
        const index = this.panelDisplayRows.indexOf(valueToDelete)
        if (index > -1) {
            this.panelDisplayRows.splice(index, 1)
            this.$emit('updateEntries', this.panelDisplayRows)
        }
    }
}
</script>

<style lang="scss" scoped>
    .add-chemical-dbxrefs-form {
        padding-top: 25px;
    }

    .dbxrefSource {
        margin-top: -14px;
    }
    table {
        tr {
            td {
                padding: 5px;
            }
        }
    }
</style>
