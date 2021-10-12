<template>
    <div id="the-publication-search" app>
        <v-text-field
            v-model.trim="publicationID"
            label="Dataset Search"
            :error-messages="publicationIDErrors"
            light
            required
            solo
            hide-details="auto"
            append-icon="mdi-magnify"
            title="Search for Datasets by Numeric Publication ID (example: pubmed)"
            @click:append="submitPublicationSearch"
            @keyup.enter="submitPublicationSearch"
            @input="$v.publicationID.$touch()"
            @blur="$v.publicationID.$touch()"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import Vuelidate from 'vuelidate'

Component.registerHooks(['validations'])
Vue.use(Vuelidate)

@Component
export default class ThePublicationSearch extends Vue {
    private publicationID: string = '';
    private publicationType: string = 'pubmed';
    private maxPublicationIDLength: number = 8;
    private publicationTypes = [
        { text: 'Pubmed', value: 'pubmed' },
        { text: 'Pre-Publication', value: 'prepub' }
    ];

    get publicationIDErrors () {
        const errors = []
        if (this.$v) {
            if (this.$v.publicationID.$dirty) {
                if (!this.$v.publicationID.required) {
                    errors.push(generateValidationError('required', 'Publication ID', null))
                } else if (!this.$v.publicationID.numeric) {
                    errors.push(generateValidationError('numeric', 'Publication ID', null))
                } else if (!this.$v.publicationID.maxLength) {
                    errors.push(generateValidationError('maxLength', 'Publication ID', String(this.maxPublicationIDLength)))
                }
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitPublicationSearch () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.$router.push('/dataset/load/' + this.publicationID + '?type=' + this.publicationType)
        }
    }

    validations () {
        return {
            publicationID: { required, numeric, maxLength: maxLength(this.maxPublicationIDLength) }
        }
     }
}
</script>

<style lang="scss" scoped>
</style>
