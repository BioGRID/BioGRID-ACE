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
            permanent
            app
        >
            <v-list-item class="mt-1 smallMgn">
                <v-list-item-title v-if="miniVariant" class="title ml-n3 mr-n3 mt-1">
                    <nuxt-link to="/">
                        <v-img
                            :src="require('~/assets/images/biogridace_spade_small.png')"
                            contain
                            position="center center"
                            min-height="50px"
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

            <v-divider light color="tertiary" />

            <v-list v-if="!miniVariant" dense>
                <v-list-item-title class="ml-3 secondary--text">
                    Pubmed Search
                </v-list-item-title>
                <v-list-item
                    class="ml-n2 mr-n2"
                    active-class="secondary black--text"
                >
                    <v-list-item-content>
                        <ThePublicationSearch />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ThePublicationSearch from '@/components/core/ThePublicationSearch.vue'

@Component({
    components: {
        ThePublicationSearch
    }
})
export default class TheNavDrawer extends Vue {
    private drawerState: boolean = true;
    private clipped: boolean = false;
    private miniVariant: boolean = false;
    private title: string = this.$config.titleShort;

    private created () {
        this.$nuxt.$on('toggleDrawerVariant', this.toggleDrawerVariant)
    }

    private toggleDrawerVariant () {
        this.miniVariant = !this.miniVariant
    }
}
</script>

<style lang="scss" scoped>
    .smallMgn {
        margin-bottom: 7px;
    }
    ::v-deep .theme--light.v-navigation-drawer .v-divider {
        border-color: #FFF !important
    }
</style>
