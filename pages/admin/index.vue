<template>
    <v-container fluid class="index-page pa-2">
        ADMIN PAGE
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminTestPage extends Vue {
    get middleware () {
        return 'auth_admin'
    }
}
</script>

<style lang="scss" scoped>
</style>
