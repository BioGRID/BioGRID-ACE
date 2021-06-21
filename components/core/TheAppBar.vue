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
                class="mr-3 navDrawerIcon"
                @click.stop="toggleNavigationDrawer"
            />
            <v-spacer />
            <v-menu
                left
                bottom
                dark
                nudge-bottom="40"
            >
                <template #activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon color="white">
                            mdi-page-next
                        </v-icon>
                    </v-btn>
                </template>

                <v-list dense>
                    <v-list-item
                        v-for="(link, i) in pageMenuLinks"
                        :key="i"
                        :to="link.to"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="link.text" />
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>
                                {{ link.icon }}
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu
                left
                bottom
                dark
                nudge-bottom="40"
            >
                <template #activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon color="white">
                            mdi-account-circle
                        </v-icon>
                    </v-btn>
                </template>

                <v-list dense>
                    <v-list-item
                        v-for="(link, i) in accessibleUserLinks"
                        :key="i"
                        :to="link.to"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="link.text" />
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>
                                {{ link.icon }}
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </header>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import { Linkout } from '@/utilities/types'

@Component
export default class TheAppBar extends Vue {
    @State private navItems!: object[];
    private clipped: boolean = false;
    private userMenuLinks: Linkout[] = [
        { to: '/admin/user/changemypassword', icon: 'mdi-lock-reset', title: 'Change Your Password', text: 'Change Your Password', accessLevel: 'observer' },
        { to: '/admin', icon: 'mdi-lock', title: 'View Admin Page', text: 'Admin Tools', accessLevel: 'admin' },
        { to: '/login', icon: 'mdi-logout', title: 'Logout', text: 'Logout', accessLevel: 'observer' }
    ]

    private pageMenuLinks: Linkout[] = [
        { to: '/', icon: 'mdi-view-dashboard', title: 'View Dashboard', text: 'Dashboard' },
        { to: '/test', icon: 'mdi-star', title: 'View Test Page', text: 'Test' }
    ]

    get accessibleUserLinks () {
        return this.userMenuLinks.filter(link => this.isPermitted(link.accessLevel))
    }

    private isPermitted (accessLevel: string | undefined): boolean {
        if (accessLevel === undefined) { return false }
        return this.$permissions.isPermitted(accessLevel)
    }

    private toggleNavigationDrawer () {
        this.$nuxt.$emit('toggleDrawerVariant')
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
