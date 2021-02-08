<template>
    <header class="the-app-bar">
        <v-app-bar
            :clipped-left="clipped"
            color="primary"
            app
            elevation="0"
            class="black--text"
            :elevate-on-scroll="false"
            :hide-on-scroll="true"
            :fade-img-on-scroll="true"
        >
            <v-app-bar-nav-icon
                color="tertiary"
                class="mr-3"
                @click.stop="toggleNavDrawer"
            />
            <v-spacer />
            <template
                v-for="(item, i) in navItems"
            >
                <v-btn
                    :key="i"
                    text
                    dark
                    large
                    nuxt
                    :to="item.to"
                    :class="'hidden-sm-and-down ' + item.classVal"
                >
                    {{ item.title }}
                </v-btn>
            </template>
        </v-app-bar>
    </header>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'

@Component
export default class TheAppBar extends Vue {
    @State private navItems!: object[];
    private clipped: boolean = false;

    private toggleNavDrawer () {
        this.$nuxt.$emit('toggleDrawerState')
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep .v-toolbar__image .v-image__image--cover {
        background-size: auto !important;
    }

    .appBarTitle {
        width: 300px;
    }
</style>
