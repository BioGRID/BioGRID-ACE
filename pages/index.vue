<template>
    <v-container fluid class="index-page pa-2">
        <h1>
            Welcome to the {{ siteName }} Dashboard
        </h1>
        <hr class="mt-2">
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DashboardPage extends Vue {
    get middleware () {
        return 'auth_observer'
    }

    get siteName () {
        return this.$config.titleShort
    }
}
</script>

<style lang="scss" scoped>
</style>
