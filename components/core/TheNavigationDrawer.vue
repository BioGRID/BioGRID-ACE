<template>
    <div class="the-navigation-drawer">
        <v-navigation-drawer
            v-model="drawerState"
            :mini-variant="miniVariant"
            :clipped="clipped"
            :disable-resize-watcher="true"
            color="primary"
            width="200"
            fixed
            app
        >
            <v-list-item class="mt-1">
                <v-list-item-title v-if="miniVariant" class="title ml-n3 mr-n3 mt-1">
                    <nuxt-link to="/">
                        <v-img
                            :src="require('~/assets/images/biogridace_spade_small.png')"
                            contain
                            position="center center"
                        />
                    </nuxt-link>
                </v-list-item-title>
                <v-list-item-title v-else class="title ml-n2">
                    <nuxt-link to="/">
                        <v-img
                            :src="require('~/assets/images/biogridace_logo_small.png')"
                            contain
                            position="center center"
                        />
                    </nuxt-link>
                </v-list-item-title>
            </v-list-item>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheNavDrawer extends Vue {
    private drawerState: boolean = true;
    private clipped: boolean = false;
    private miniVariant: boolean = false;
    private title: string = process.env.SHORT_TITLE || 'BioGRID';

    private created () {
        this.$nuxt.$on('toggleDrawerVariant', this.toggleDrawerVariant)
    }

    private toggleDrawerVariant () {
        this.miniVariant = !this.miniVariant
    }
}
</script>
