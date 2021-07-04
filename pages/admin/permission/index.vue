<template>
    <div id="permission-manager">
        <v-container fluid class="pt-0">
            <v-btn
                class="float-right mt-4"
                small
                color="primary"
                nuxt
                to="/admin"
                dark
            >
                Back
            </v-btn>
            <h1>
                Permission Manager
                <v-icon color="deep-purple lighten-1" large class="">
                    mdi-badge-account
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Use the following table to manage the permissions used within the application. Click on items in the tools column to adjust permission settings.
            </div>
            <v-btn
                class="mt-4"
                small
                color="green darken-2"
                to="/admin/permission/add"
                nuxt
                dark
                :ripple="true"
            >
                Add New Permission
                <v-icon class="ml-2">
                    mdi-account-badge
                </v-icon>
            </v-btn>
            <v-card>
                <ACEDataTable
                    class="mt-5"
                    title="Current Permissions"
                    table-class="pa-1"
                    :columns="permissionTableHeaders"
                    :rows="permissionList"
                    :rows-per-page="100"
                    :total-rows="permissionCount"
                    :pagination="true"
                    :show-search="true"
                >
                    <template slot-scope="{ row }">
                        <td class="text-center">
                            {{ row.id }}
                        </td>
                        <td class="text-left">
                            {{ row.name }}
                        </td>
                        <td class="text-left">
                            {{ row.description }}
                        </td>
                        <td class="text-center">
                            {{ row.category }}
                        </td>
                        <td class="nowrap text-center">
                            <v-sheet
                                dark
                                class="pa-1"
                                :color="permissionLevelColor( row.level )"
                            >
                                {{ row.level }}
                            </v-sheet>
                        </td>
                        <td class="nowrap text-center">
                            <v-btn
                                x-small
                                dark
                                fab
                                elevation="0"
                                nuxt
                                color="info"
                                :to="'/admin/permission/edit/' + row.name"
                            >
                                <v-icon>mdi-file-document-edit</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </ACEDataTable>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import ACEDataTable from '@/components/data/ACEDataTable.vue'

const users = namespace('users')

@Component({
    components: {
        ACEDataTable
    }
})
export default class PermissionManager extends Vue {
    @users.State private permissions!: any
    private permissionTableHeaders: object[] = [
        {
            title: 'ID',
            field: 'id',
            sortable: true,
            searchable: true,
            searchType: 'NumericRange',
            searchName: 'ID',
            sortDirection: '',
            sortOrder: 0,
            className: 'text-center'
        },
        {
            title: 'Name',
            field: 'name',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Name',
            sortDirection: 'asc',
            sortOrder: 2,
            className: 'text-left'
        },
        {
            title: 'Description',
            field: 'description',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Description',
            sortDirection: '',
            sortOrder: 0,
            className: 'text-left'
        },
        {
            title: 'Category',
            field: 'category',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Category',
            sortDirection: 'asc',
            sortOrder: 1,
            className: 'text-center'
        },
        {
            title: 'Permission Setting',
            field: 'level',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Permission Setting',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-left'
        },
        {
            title: 'Tools',
            field: 'tools',
            sortable: false,
            searchable: false,
            searchType: '',
            searchName: 'Tools',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-center'
        }
    ];

    get permissionList () {
        return Object.values(this.permissions)
    }

    get permissionCount () {
        return Object.keys(this.permissions).length
    }

    private permissionLevelColor (level: string) {
        switch (level.toLowerCase()) {
            case 'observer' : return 'orange darken-4'
            case 'standard' : return 'green darken-2'
            case 'manager' : return 'blue darken-2'
            case 'poweruser' : return 'purple darken-4'
            case 'admin' : return 'red darken-4'
            case 'default' : return 'grey darken-2'
        }
    }
}

</script>

<style lang="scss" scoped>
    table {
        tr {
            td {
                padding: 5px;
            }
        }
    }
</style>
