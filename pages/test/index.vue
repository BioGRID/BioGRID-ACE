<template>
    <v-container fluid class="index-page pa-2">
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
            {{ fetchedUser }}
        </div>
        <div>
            {{ permissionCheck() }}
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const users = namespace('users')

@Component
export default class TestPage extends Vue {
    private email: string = 'chris@starkfree.com'
    private fetchedUser: object = {}
    @users.State private user!: any
    @users.State private token!: any
    @users.State private role!: any

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
