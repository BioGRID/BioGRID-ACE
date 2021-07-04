<template>
    <div id="admin-tools">
        <v-container fluid>
            <h1>Admin Tools</h1>
            <p>Choose from the following admin tools</p>
            <v-divider />
            <v-list three-line class="pt-0">
                <template v-for="(tool, i) in accessibleAdminTools">
                    <div :key="i">
                        <v-list-item
                            nuxt
                            :to="tool.to"
                            class="pt-0"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    class="float-right pa-3"
                                    large
                                    :color="tool.color"
                                >
                                    {{ tool.icon }}
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ tool.title }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ tool.desc }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider />
                    </div>
                </template>
            </v-list>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AdminTool } from '@/utilities/types'

@Component
export default class Admin extends Vue {
    private adminToolsList: AdminTool[] = [{
        to: '/admin/user',
        icon: 'mdi-account-star',
        color: 'green darken-3',
        title: 'User Manager',
        desc: 'Add or edit users and modify their permission levels for access within the application.',
        access_level: 'admin'
    },
    {
        to: '/admin/permission',
        icon: 'mdi-badge-account',
        color: 'deep-purple lighten-1',
        title: 'Permission Manager',
        desc: 'Add or edit global permission settings and user classes assigned to those permissions.',
        access_level: 'admin'
    },
    {
        to: '/admin/curationgroup',
        icon: 'mdi-account-group',
        color: 'cyan darken-3',
        title: 'Curation Group Manager',
        desc: 'Add or edit curation groups and associated default organisms and users with permission to curate.',
        access_level: 'manager'
    },
    {
        to: '/admin/socket/status',
        icon: 'mdi-lan-connect',
        color: 'orange darken-3',
        title: 'Socket Status',
        desc: 'Check to see the current status of the Websocket connection to the curation API. You can also test it here with an echo.',
        access_level: 'admin'
    },
    {
        to: '/admin/chemical/chemicalmanager',
        icon: 'mdi-chemical-weapon',
        color: 'pink darken-3',
        title: 'Chemical Manager',
        desc: 'Add, edit or check the current status of chemicals.',
        access_level: 'manager'
    }];

    get accessibleAdminTools () {
        return this.adminToolsList.filter(link => this.$permissions.isPermitted(link.access_level))
    }

    get middleware () {
        return 'auth_admin'
    }
}

</script>

<style lang="scss" scoped>
</style>
