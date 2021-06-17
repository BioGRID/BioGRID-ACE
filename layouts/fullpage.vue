<template>
    <v-app>
        <v-main class="grey lighten-4 wavybg" app>
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
        </v-main>
        <TheNotifyBar />
        <TheLoadingOverlay />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheLoadingOverlay from '@/components/core/TheLoadingOverlay.vue'
import TheNotifyBar from '@/components/core/TheNotifyBar.vue'

@Component({
    components: {
        TheLoadingOverlay,
        TheNotifyBar
    }
})
export default class FullPage extends Vue {}
</script>

<style lang="scss" scoped>
.wavybg {
    background-image: url( '~assets/images/wavy_background.jpg' );
    background-repeat: no-repeat;
    background-position: 0 0;
}
</style>
