<template>
    <v-container fluid class="index-page pa-2">
        {{ user }}
        <br/>{{ token }}
        <br/>{{ role }}
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
        <div>
            {{ permissionCheck() }}
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { functions } from '@/plugins/firebase'

const users = namespace('users')

@Component
export default class TestPage extends Vue {
    private email: string = 'chris@starkfree.com'
    @users.State private user!: any
    @users.State private token!: any
    @users.State private role!: any

    private async submit () {
        console.log(this.email)
        const setUserRole = functions.httpsCallable('setUserRole')
        try {
            const result = await setUserRole({
                email: this.email,
                role: 'admin'
            })
            console.log(result)
        } catch (e) {
            console.log(e)
        }
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
