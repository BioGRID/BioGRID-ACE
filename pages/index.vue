<template>
    <v-container fluid class="index-page pa-2">
        DASHBOARD
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DashboardPage extends Vue {
    get middleware () {
        return 'auth_observer'
    }
}
</script>

<style lang="scss" scoped>
</style>
