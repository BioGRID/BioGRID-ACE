<template>
    <div id="user-manager">
        <v-container fluid class="pt-3">
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
            <h1>User Manager</h1>
            <div class="subtitle-1">
                Use the table below to view current users. To make changes to an existing user, including changing their status or user class, click on the edit user icon (
                    <v-icon color="info">
                        mdi-account-edit
                    </v-icon>
                ) in the tools column for the corrensponding user. <strong>Note</strong>: Users will need to logout and then log back in again for changes to be reflected in their access credentials.
            </div>
            <v-btn
                v-if="canAddUsers()"
                class="mt-4"
                small
                color="green darken-2"
                nuxt
                to="/admin/user/add"
                dark
                :ripple="true"
            >
                Add New User
                <v-icon class="ml-2">
                    mdi-account-plus
                </v-icon>
            </v-btn>
            <v-card>
                <ACEDataTable
                    class="mt-5"
                    title="List of Current Users"
                    table-class="pa-1"
                    :columns="userTableHeaders"
                    :rows="userList"
                    :rows-per-page="100"
                    :total-rows="userCount"
                    :pagination="true"
                    :show-search="true"
                >
                    <template slot-scope="{ row }">
                        <td class="text-center">
                            {{ row.id }}
                        </td>
                        <td class="text-left">
                            <strong>{{ row.name }}</strong>
                        </td>
                        <td class="text-left">
                            {{ row.email }}
                        </td>
                        <td class="text-left">
                            {{ row.first_name }}
                        </td>
                        <td class="text-left">
                            {{ row.last_name }}
                        </td>
                        <td class="nowrap text-center">
                            <v-sheet
                                dark
                                class="pa-1"
                                :color="userClassColor( row.class )"
                            >
                                {{ row.class }}
                            </v-sheet>
                        </td>
                        <td class="nowrap text-center">
                            <v-sheet
                                dark
                                class="pa-1"
                                :color="row.status === 'active' ? 'green darken-2' : 'error darken-4'"
                            >
                                <span class="pr-1">{{ row.status }}</span>
                                <v-icon small>
                                    {{ row.status === 'active' ? 'mdi-account-check' : 'mdi-account-remove' }}
                                </v-icon>
                            </v-sheet>
                        </td>
                        <td class="nowrap text-center">
                            <v-btn
                                x-small
                                dark
                                fab
                                nuxt
                                elevation="0"
                                color="info"
                                :title="'Edit user details for ' + row.name"
                                :to="'/admin/user/edit/' + row.id"
                            >
                                <v-icon>mdi-account-edit</v-icon>
                            </v-btn>
                            <v-btn
                                x-small
                                dark
                                fab
                                nuxt
                                elevation="0"
                                :title="'Change password for ' + row.name"
                                color="warning"
                                class="ml-1"
                                :to="'/admin/user/changepassword/' + row.id"
                            >
                                <v-icon>mdi-lock-reset</v-icon>
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
export default class UserManager extends Vue {
    @users.State private user!: any
    @users.State private users!: any
    @users.State private permissionLevels!: any
    private minPasswordLength: number = 10
    private userPermissionLevel: number = 0
    private userTableHeaders: object[] = [
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
            title: 'Username',
            field: 'name',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Username',
            sortDirection: 'asc',
            sortOrder: 1,
            className: 'text-left'
        },
        {
            title: 'Email',
            field: 'email',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Email',
            sortDirection: '',
            sortOrder: 0,
            className: 'text-left'
        },
        {
            title: 'First Name',
            field: 'first_name',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'First Name',
            sortDirection: '',
            sortOrder: 0,
            className: 'text-left'
        },
        {
            title: 'Last Name',
            field: 'last_name',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Last Name',
            sortDirection: '',
            sortOrder: 0,
            className: 'text-left'
        },
        {
            title: 'User Class',
            field: 'class',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'User Class',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-center',
            width: '10%'
        },
        {
            title: 'Status',
            field: 'status',
            sortable: true,
            searchable: true,
            searchType: 'Text',
            searchName: 'Status',
            sortDirection: '',
            sortOrder: 0,
            className: 'nowrap text-center'
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

    public created () {
        this.userPermissionLevel = this.$permissions.convertPermissionLevelToInteger(this.user.class)
    }

    get userList () {
        return Object.values(this.users).filter((item: any) => {
            const userClass = this.$permissions.convertPermissionLevelToInteger(item.class)
            if (this.userPermissionLevel >= userClass) {
                return true
            }
            return false
        })
    }

    get userCount () {
        return Object.keys(this.users).length
    }

    private userClassColor (userClass: string) {
        switch (userClass.toLowerCase()) {
            case 'observer' : return 'orange darken-4'
            case 'standard' : return 'green darken-2'
            case 'manager' : return 'blue darken-2'
            case 'poweruser' : return 'purple darken-4'
            case 'admin' : return 'red darken-4'
            case 'default' : return 'grey darken-2'
        }
    }

    private canAddUsers () {
        if (this.$permissions.isPermitted('ADD USER')) {
            return true
        }

        return false
    }

    private refreshUsers () {
        /* Vue.prototype.$socket.sendObj({
            target: 0,
            namespace: 'auth',
            mutation: '',
            action: 'fetch_users'
        }) */
    }
}

</script>

<style lang="scss" scoped>
    table {
        tr {
            td {
                padding: 5px;
                &.userActive {
                    background-color: var(--v-success-darken2);
                    color: #FFF;
                }
                &.userInactive {
                    background-color: var(--v-error-darken4);
                    color: #FFF;
                }
            }
        }
    }
</style>
