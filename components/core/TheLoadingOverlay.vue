<template>
    <v-overlay id="ace-loading-overlay" :value="loadingOverlayVisible">
        <v-progress-circular
            indeterminate
            color="yellow accent-4"
            size="120"
            width="10"
        >
            Loading
        </v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'

@Component
export default class TheLoadingOverlay extends Vue {
    @State private loadingOverlayVisible!: boolean;
}
</script>
