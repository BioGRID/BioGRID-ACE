<template>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { inArrayOfObjects } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'

@Component
export default class AddChemicalNameForm extends Vue {
    @Prop(Array) private panelDisplayRows!: any[]
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
}
</script>

<style lang="scss">
.add-chemical-dbxrefs-form {
    padding-top: 25px;
}

.dbxrefSource {
    margin-top: -14px;
}
</style>
