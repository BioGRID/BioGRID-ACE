<template>
    <div id="chemical-edit">
        <v-container fluid class="pt-0">
            <v-btn
                class="float-right mt-4"
                small
                color="primary"
                to="/admin/chemical"
                dark
            >
                Back
            </v-btn>
            <h1>
                Chemical Edit
                <v-icon color="cyan darken-3" large class="">
                    mdi-account-group
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Use the following form to modify an existing chemical. Fill in the fields, and click the 'Update Chemical' button.
            </div>
            <v-card
                class="mt-2 pa-3"
                color="grey darken-3"
            >
                <v-card-text>
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
                                <v-text-field
                                    v-model.trim="chemicalName"
                                    label="Chemical Name"
                                    :error-messages="chemicalNameErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.chemicalName.$touch()"
                                    @blur="$v.chemicalName.$touch()"
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
                                    v-model.trim="chemicalType"
                                    label="Chemical Type"
                                    :error-messages="chemicalTypeErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.chemicalType.$touch()"
                                    @blur="$v.chemicalType.$touch()"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="chemicalSource"
                                    label="Chemical Source"
                                    :error-messages="chemicalSourceErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.chemicalSource.$touch()"
                                    @blur="$v.chemicalSource.$touch()"
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
                                    v-model.trim="chemicalSourceID"
                                    label="Chemical Source ID"
                                    :error-messages="chemicalSourceIDErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.chemicalSourceID.$touch()"
                                    @blur="$v.chemicalSourceID.$touch()"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <v-textarea
                                    v-model.trim="chemicalDescription"
                                    label="Chemical Description"
                                    :error-messages="chemicalDescriptionErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.chemicalDescription.$touch()"
                                    @blur="$v.chemicalDescription.$touch()"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <v-textarea
                                    v-model.trim="chemicalSmile"
                                    label="Chemical Smile"
                                    dark
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="chemicalFormula"
                                    label="Molecular Formula"
                                    dark
                                    dense
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
                                    v-model.trim="chemicalMolecularWeight"
                                    label="Molecular Weight"
                                    dark
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="chemicalInChiKey"
                                    label="InChiKey"
                                    dark
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <v-textarea
                                    v-model.trim="chemicalInChi"
                                    label="InChi"
                                    dark
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <ExpandableInputPanel
                                    panel-data-table-title="Chemical Synonyms"
                                    panel-label="Synonyms"
                                    panel-desc="Update/Add chemical synonyms"
                                    :fields-to-remove-entry="fieldsToRemoveSynonymEntry"
                                    :panel-entry-table-headers="synonymTableHeaders"
                                    :panel-display-rows="displaySynonmRows"
                                    @updateEntries="updateChemicalSynonyms"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="21"
                                sm="12"
                                xs="12"
                            >
                                <ExpandableInputPanel
                                    panel-data-table-title="Chemical External Database References"
                                    panel-label="External Database References"
                                    panel-desc="Update/Add chemical external database references"
                                    :fields-to-remove-entry="fieldsToRemoveDBxrefsEntry"
                                    :panel-entry-table-headers="dBxrefsTableHeaders"
                                    :panel-display-rows="chemicalDBxrefs"
                                    @updateEntries="updateChemicalDBxrefs"
                                />
                            </v-col>
                        </v-row>
                        <v-btn
                            class="mt-5"
                            size="x-large"
                            color="success"
                            dark
                            :disabled="isInvalid"
                            @click="submitChemical"
                        >
                            Update Chemical
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { printableAsciiOnly } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import ExpandableInputPanel from '@/components/forms/ExpandableInputPanel.vue'
import notification from '@/utilities/notifications'

@Component({
    components: {
        ExpandableInputPanel
    }
})
export default class ChemicalEdit extends Vue {
    private chemicalID: number = 0
    private chemicalName: string = ''
    private chemicalType: string = ''
    private chemicalSource: string = ''
    private chemicalSourceID: string = ''
    private chemicalDescription: string = ''
    private chemicalSynonyms: string[] = []
    private chemicalFormula: string = ''
    private chemicalMolecularWeight: string = ''
    private chemicalSmile: string = ''
    private chemicalInChi: string = ''
    private chemicalInChiKey: string = ''
    private fieldsToRemoveSynonymEntry: string[] = []
    private chemicalDBxrefs: string[] = []
    private synonymTableHeaders: any[] = [
        {
            title: 'Synonm Name',
            field: 'name',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Name',
            sortDirection: 'asc',
            sortOrder: 1,
            className: 'text-left'
        },
        {
            title: 'Tools',
            field: 'tools',
            sortable: false,
            searchable: false,
            searchType: '',
            searchName: 'Tools',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-center'
        }
    ];

    private displaySynonmRows: any[] = [];
    private fieldsToRemoveDBxrefsEntry: string[] = [];
    private dBxrefsTableHeaders: any[] = [
        {
            title: 'Source',
            field: 'source',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Name',
            sortDirection: 'asc',
            sortOrder: 1,
            className: 'text-left'
        },
        {
            title: 'Source ID',
            field: 'source_id',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Name',
            sortDirection: 'asc',
            sortOrder: 0,
            className: 'text-left'
        },
        {
            title: 'Tools',
            field: 'tools',
            sortable: false,
            searchable: false,
            searchType: '',
            searchName: 'Tools',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-center'
        }
    ];

    public mounted () {
        this.initializeFieldValues()
    }

    private async initializeFieldValues () {
        if (this.$auth.loggedIn) {
            this.$store.dispatch('toggleLoadingOverlay', {}, { root: true })
            try {
                const data = await this.$annotationapi.CHEMICAL_FETCH(this.$store.getters['users/getToken'], this.$route.params.slug)
                if (data !== undefined) {
                    this.chemicalName = data.name
                    this.chemicalID = data.chemical_id
                    this.chemicalType = data.chemical_type
                    this.chemicalSource = data.source
                    this.chemicalSourceID = data.source_id
                    this.chemicalFormula = data.formula
                    this.chemicalMolecularWeight = data.molecular_weight
                    this.chemicalSmile = data.smile
                    this.chemicalInChi = data.inchi
                    this.chemicalInChiKey = data.inchikey
                    this.chemicalDescription = data.description
                    this.chemicalSynonyms = data.synonyms.split('|')
                    let hit: any
                    for (hit of this.chemicalSynonyms) {
                        this.displaySynonmRows.push({
                            name: hit
                        })
                    }
                    this.chemicalDBxrefs = data.dbxrefs
                    this.fieldsToRemoveSynonymEntry = ['name']
                    this.fieldsToRemoveDBxrefsEntry = ['source', 'source_id']
                }
            } finally {
                this.$store.dispatch('toggleLoadingOverlay', {}, { root: true })
            }
        } else {
            this.$store.dispatch('notify/displayNotification', notification('error', 'login_error_notloggedin'), { root: true })
        }
    }

    private updateChemicalSynonyms (synonyms: string[]) {
        this.chemicalSynonyms = synonyms
    }

    private updateChemicalDBxrefs (DBxrefs: string[]) {
        this.chemicalDBxrefs = DBxrefs
    }

    get chemicalSourceErrors () {
        const errors = []
        if (this.$v.chemicalSource.$dirty) {
            if (!this.$v.chemicalSource.required) {
                errors.push(generateValidationError('required', 'Chemical Source', null))
            } else if (!this.$v.chemicalSource.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Chemical Source', null))
            }
        }
        return errors
    }

    get chemicalSourceIDErrors () {
        const errors = []
        if (this.$v.chemicalSourceID.$dirty) {
            if (!this.$v.chemicalSourceID.required) {
                errors.push(generateValidationError('required', 'Chemical Source ID', null))
            } else if (!this.$v.chemicalSourceID.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Chemical Source ID', null))
            }
        }
        return errors
    }

    get chemicalTypeErrors () {
        const errors = []
        if (this.$v.chemicalType.$dirty) {
            if (!this.$v.chemicalType.required) {
                errors.push(generateValidationError('required', 'Chemical Type', null))
            } else if (!this.$v.chemicalType.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Chemical Type', null))
            }
        }
        return errors
    }

    get chemicalNameErrors () {
        const errors = []
        if (this.$v.chemicalName.$dirty) {
            if (!this.$v.chemicalName.required) {
                errors.push(generateValidationError('required', 'Chemical Name', null))
            } else if (!this.$v.chemicalName.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Chemical Name', null))
            }
        }
        return errors
    }

    get chemicalDescriptionErrors () {
        const errors = []
        if (this.$v.chemicalDescription.$dirty) {
            if (!this.$v.chemicalDescription.required) {
                errors.push(generateValidationError('required', 'Chemical Description', null))
            } else if (!this.$v.chemicalDescription.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Chemical Description', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitChemical () {
        this.$v.$touch()
        console.log(this.chemicalSynonyms)
        if (!this.$v.$invalid) {
            // need to write this
        }
    }

    private validations () {
        return {
            chemicalName: { required, printableAsciiOnly },
            chemicalType: { required, printableAsciiOnly },
            chemicalSource: { required, printableAsciiOnly },
            chemicalSourceID: { required, printableAsciiOnly },
            chemicalDescription: { required, printableAsciiOnly }
        }
    }
}

</script>
