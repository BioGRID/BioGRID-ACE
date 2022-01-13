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
                        :rows="chemicalSynonmsRows"
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

                    <div class="add-chemical-name-form">
                        <v-form>
                            <v-text-field
                                ref="addPanelField"
                                v-model.trim="newEntry"
                                label="Add New Entry"
                                :error-messages="newChemicalNameErrors"
                                dense
                                @input="$v.newEntry.$touch()"
                                @blur="$v.newEntry.$touch()"
                            />
                            <v-btn
                                size="x-large"
                                color="success"
                                :disabled="isInvalid"
                                @click="addEntry"
                            >
                                Add New Chemical Name
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
export default class AddChemicalNameForm2 extends Vue {
    @Prop({ type: String, default: '' }) private panelDataTableTitle!: string
    @Prop({ type: String, default: '' }) private panelLabel!: string
    @Prop({ type: String, default: '' }) private panelDesc!: string
    @Prop({ type: Array }) private fieldsToRemoveEntry!: string[]
    @Prop({ type: Array }) private panelEntryTableHeaders!: any[]
    @Prop(Array) private chemicalSynonmsRows!: any[]
    private entryCount: number = 0
    private newEntry: string = ''

     private addEntry () {
        this.chemicalSynonmsRows.push({
            name: this.newEntry
        })
        this.newEntry = ''
        this.$emit('updateEntries', this.chemicalSynonmsRows)
        this.$v.$reset()
    }

    get newChemicalNameErrors () {
        const errors = []
        if (this.$v.newEntry.$dirty) {
            if (!this.$v.newEntry.required) {
                errors.push(generateValidationError('required', 'Chemical Name', null))
            } else if (!this.$v.newEntry.inArrayOfObjects) {
                errors.push(generateValidationError('valueinarray', 'Chemical Name', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private validations () {
        return {
            newEntry: { required, inArrayOfObjects: inArrayOfObjects(this.chemicalSynonmsRows, 'name', []) }
        }
    }

    get panelEntryTableCount () {
        return this.chemicalSynonmsRows.length
    }

    private panelDisplayValues () {
        return Object.values(this.chemicalSynonmsRows)
    }

    private deletePanelListItem (valueToDelete: any) {
        const index = this.chemicalSynonmsRows.indexOf(valueToDelete)
        if (index > -1) {
            this.chemicalSynonmsRows.splice(index, 1)
            this.$emit('updateEntries', this.chemicalSynonmsRows)
        }
    }
}
</script>

<style lang="scss" scoped>
    .add-chemical-name-form {
        padding-top: 15px;
    }
    table {
        tr {
            td {
                padding: 5px;
            }
        }
    }
</style>
