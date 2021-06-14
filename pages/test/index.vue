<template>
    <v-container fluid class="index-page pa-2">
        <client-only>
        {{ user }}
        <br/>{{ token }}
        <br/>{{ role }}
        <br />{{ }}
        <v-text-field
            v-model="email"
            prepend-inner-icon="mdi-clipboard-account"
            class="emailfield"
        />
        <v-btn
            size="x-large"
            color="primary"
            class="mt-3"
            name="submit"
            @click="submit"
        >
            submit
        </v-btn>
        <v-btn
            size="x-large"
            color="tertiary"
            class="mt-3"
            name="refresh"
            @click="refresh"
        >
            refresh
        </v-btn>
        <v-btn
            size="x-large"
            color="secondary"
            class="mt-3"
            name="test"
            @click="test"
        >
            test
        </v-btn>
        <div>
            {{ organisms[9606] }}
        </div>
        <div>
            {{ ontologies[1] }}
        </div>
        <div>
            {{ attributeTypes['P'] }}
        </div>
        <div>
            {{ curationGroups[1] }}
        </div>
        <div>
            {{ processingTasks["1"] }}
        </div>
        <div>
            {{ users["65"] }}
        </div>
        <div>
            {{ permissions["MANAGE USERS"] }}
        </div>
        <div>
            {{ entityWorkflows[1] }}
        </div>
        <div>
            {{ entityFamilies[1] }}
        </div>
        <div>
            {{ permissionCheck() }}
        </div>
        </client-only>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { OntologyHash, OrganismHash, AttributeTypeHash, CurationGroupHash, ProcessingTaskHash, EntityWorkflowHash, EntityFamilyHash } from '@/utilities/types'

const users = namespace('users')
const annotation = namespace('annotation')
const curation = namespace('curation')

@Component
export default class TestPage extends Vue {
    private email: string = 'chris@starkfree.com'
    private fetchedUser: object = {}
    @users.State private user!: any
    @users.State private token!: any
    @users.State private role!: any
    @users.State private users!: any;
    @users.State private permissions!: any;
    @annotation.State private organisms!: OrganismHash;
    @annotation.State private ontologies!: OntologyHash;
    @curation.State private attributeTypes!: AttributeTypeHash;
    @curation.State private curationGroups!: CurationGroupHash;
    @curation.State private processingTasks!: ProcessingTaskHash;
    @curation.State private entityWorkflows!: EntityWorkflowHash;
    @curation.State private entityFamilies!: EntityFamilyHash;

    private async submit () {
        const resp = await this.$axios.get(process.env.NUXT_ENV_AUTH_API_URL + '/me', {
            headers: { Authorization: this.token }
        })
        this.fetchedUser = resp.data
    }

    private async refresh () {
        try {
            await this.$auth.refreshTokens()
        } catch (e) {
            this.$router.push('/login')
        }
    }

    private async test () {
        await this.$store.dispatch('users/fetchUsers')
    }

    private permissionCheck () {
        if (this.$permissions.isPermitted('admin')) {
            return 'CAN ACCESS IS TRUE'
        } else {
            return 'CAN ACCESS IS FALSE'
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
