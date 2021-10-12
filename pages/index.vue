<template>
    <v-container fluid class="index-page pa-2">
        <v-alert
            v-if="user.password_reset === 1"
            type="error"
            dense
        >
            You must change your password.
            <v-btn
                small
                color="primary"
                dark
                nuxt
                to="/admin/user/changemypassword"
            >
                    Change Password
            </v-btn>
        </v-alert>
        <h1>
            Welcome Back <span class="highlight--text">{{ firstName }}</span>!
        </h1>
         <v-row no-gutters>
            <v-col
                cols="12"
                xl="12"
                lg="12"
                md="12"
                sm="12"
                xs="12"
            >
                <p>
                    You are now using version <strong><span class="highlight--text">{{ appVersion }}</span></strong> of the <strong>{{ siteNameLong }}</strong>. This is a private system used in curation and maintainance of the entire suite of <a class="plainLink" href="https://thebiogrid.org" target="_BLANK">BioGRID</a> Projects and Applications. If you are logged-in accidentally, please immediately <a class="plainLink" nuxt href="/login">logout</a>.
                </p>
            </v-col>
        </v-row>
        <v-divider class="mb-3" />
        <v-row>
            <v-col
                cols="12"
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
                class="text-center"
            >
                <StatsCard
                    icon="mdi-timer-sand"
                    title="In Progress"
                    value="12"
                    dark
                    color="green darken-2"
                    icon-color="green lighten-4"
                    small-value="Publications"
                />
            </v-col>
            <v-col
                cols="12"
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
                class="text-center"
            >
                <StatsCard
                    icon="mdi-timer"
                    title="On Hold"
                    value="18"
                    dark
                    color="light-blue darken-3"
                    icon-color="light-blue lighten-4"
                    small-value="Publications"
                />
            </v-col>
            <v-col
                cols="12"
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
                class="text-center"
            >
                <StatsCard
                    icon="mdi-run-fast"
                    title="Scheduled to Run"
                    value="9"
                    dark
                    color="deep-purple darken-3"
                    icon-color="deep-purple lighten-4"
                    small-value="Tasks"
                />
            </v-col>
            <v-col
                cols="12"
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
                class="text-center"
            >
                <StatsCard
                    icon="mdi-checkbox-marked-circle-outline"
                    title="Recently Completed"
                    value="27"
                    dark
                    color="yellow darken-4"
                    icon-color="yellow lighten-4"
                    small-value="Tasks"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import StatsCard from '@/components/cards/StatsCard.vue'

const users = namespace('users')

@Component({
    components: {
        StatsCard
    }
})
export default class DashboardPage extends Vue {
    @users.State private user!: any

    get middleware () {
        return 'auth_observer'
    }

    get appVersion () {
        return this.$config.appVersion
    }

    get siteNameLong () {
        return this.$config.titleLong
    }

    get siteNameShort () {
        return this.$config.titleShort
    }

    get firstName () {
        return this.user.first_name
    }
}
</script>

<style lang="scss" scoped>
</style>
