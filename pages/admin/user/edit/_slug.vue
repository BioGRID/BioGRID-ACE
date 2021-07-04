<template>
    <div id="user-editor">
        <v-container fluid class="pt-3">
            <v-btn
                class="float-right mt-4"
                small
                color="primary"
                to="/admin/user"
                dark
            >
                Back
            </v-btn>
            <h1>
                Edit User
                <v-icon color="info" large>
                    mdi-account-edit
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Use the following form to edit an existing user. Fill in the fields, and click the button.
            </div>
            <v-card
                class="mt-2 pa-3"
                color="grey darken-3"
            >
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                xs="12"
                            >
                                <v-select
                                    v-model="userID"
                                    label="Select a User to Edit"
                                    :items="userOptions"
                                    dark
                                    required
                                    dense
                                    @change="initializeFieldValues()"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userName"
                                    label="Username"
                                    :error-messages="userNameErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.userName.$touch()"
                                    @blur="$v.userName.$touch()"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userEmail"
                                    label="Email"
                                    :error-messages="userEmailErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.userEmail.$touch()"
                                    @blur="$v.userEmail.$touch()"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userFirstName"
                                    label="First Name"
                                    :error-messages="userFirstNameErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.userFirstName.$touch()"
                                    @blur="$v.userFirstName.$touch()"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userLastName"
                                    label="Last Name"
                                    :error-messages="userLastNameErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.userLastName.$touch()"
                                    @blur="$v.userLastName.$touch()"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-select
                                    v-model.trim="userClass"
                                    label="User Class"
                                    :items="permissionLevelOptions"
                                    dark
                                    required
                                    dense
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="6"
                                lg="6"
                                md="6"
                                sm="12"
                                xs="12"
                            >
                                <v-select
                                    v-model.trim="userStatus"
                                    label="User Status"
                                    :items="userStatusOptions"
                                    dark
                                    required
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-btn
                            size="x-large"
                            color="success"
                            :disabled="isInvalid"
                            dark
                            @click="submitUser"
                        >
                            Submit Changes
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, namespace } from 'nuxt-property-decorator'
import { required, email } from 'vuelidate/lib/validators'
import { printableAsciiOnly } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import notification from '@/utilities/notifications'

const users = namespace('users')

@Component
export default class UserEdit extends Vue {
    @users.State private user!: any;
    @users.State private users!: any;
    @users.State private permissionLevels!: any;
    private userID: number = 0;
    private userName: string = '';
    private userEmail: string = '';
    private userFirstName: string = '';
    private userLastName: string = '';
    private userClass: string = 'observer';
    private userStatus: string = 'active';
    private userPermissionLevel: number = 0;
    private userStatusOptions: object[] = [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' }
    ];

    public created () {
        this.userPermissionLevel = this.$permissions.convertPermissionLevelToInteger(this.user.class)
        this.initializeFieldValues()
    }

    public asyncData (context: any) {
        const slug = context.route.params.slug
        if (context.store.state.users.users[slug] === undefined) {
            return context.redirect('/error/notfound')
        }
        return { userID: Number(slug) }
    }

    @Watch('userName')
    private onUsernameChanged () {
        this.userName = this.userName.toLowerCase()
    }

    private initializeFieldValues () {
        const userInfo = this.users[this.userID]
        this.userID = userInfo.id
        this.userName = userInfo.name
        this.userEmail = userInfo.email
        this.userFirstName = userInfo.first_name
        this.userLastName = userInfo.last_name
        this.userClass = userInfo.class
        this.userStatus = userInfo.status
    }

    get userNameErrors () {
        const errors = []
        if (this.$v.userName.$dirty) {
            if (!this.$v.userName.required) {
                errors.push(generateValidationError('required', 'Username', null))
            } else if (!this.$v.userName.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Username', null))
            }
        }
        return errors
    }

    get userEmailErrors () {
        const errors = []
        if (this.$v.userEmail.$dirty) {
            if (!this.$v.userEmail.required) {
                errors.push(generateValidationError('required', 'Email', null))
            } else if (!this.$v.userEmail.email) {
                errors.push(generateValidationError('email', 'Email', null))
            }
        }
        return errors
    }

    get userFirstNameErrors () {
        const errors = []
        if (this.$v.userFirstName.$dirty) {
            if (!this.$v.userFirstName.required) {
                errors.push(generateValidationError('required', 'First Name', null))
            } else if (!this.$v.userFirstName.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'First Name', null))
            }
        }
        return errors
    }

    get userLastNameErrors () {
        const errors = []
        if (this.$v.userLastName.$dirty) {
            if (!this.$v.userLastName.required) {
                errors.push(generateValidationError('required', 'Last Name', null))
            } else if (!this.$v.userLastName.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Last Name', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.updateUserData({
                id: this.userID,
                name: this.userName,
                password: '',
                first_name: this.userFirstName,
                last_name: this.userLastName,
                email: this.userEmail,
                class: this.userClass,
                status: this.userStatus,
                password_reset: 0
            })
        }
    }

    get permissionLevelOptions () {
        return Object.values(this.permissionLevels).filter((item: any) => {
            const classLevel = this.$permissions.convertPermissionLevelToInteger(item.value)
            if (this.userPermissionLevel >= classLevel) {
                return true
            }
            return false
        })
    }

    get userOptions () {
        const userList: any[] = Object.values(this.users).filter((item: any) => {
            const classLevel = this.$permissions.convertPermissionLevelToInteger(item.class)
            if (this.userPermissionLevel >= classLevel) {
                return true
            }
            return false
        })

        const userOptions: object[] = []
        for (const user of userList) {
            userOptions.push({ text: user.id + ': ' + user.name, value: user.id })
        }

        return userOptions
    }

    private async updateUserData (payload: object) {
        if (this.$auth.loggedIn) {
            this.$store.dispatch('toggleLoadingOverlay', {}, { root: true })
            try {
                const status = await this.$authapi.USER_UPDATE(this.$store.getters['users/getToken'], payload, this.userID)
                if (status) {
                    Vue.prototype.$socket.sendObj({
                        target: 0,
                        namespace: 'users',
                        mutation: '',
                        action: 'fetch_users',
                        value: ''
                    })
                    Vue.prototype.$socket.sendObj({
                        target: this.userID,
                        namespace: 'users',
                        mutation: '',
                        action: 'fetch_me',
                        value: ''
                    })
                }
                this.$store.dispatch('notify/displayNotification', notification('success', 'user_update_success'), { root: true })
            } catch (error) {
                this.$store.dispatch('notify/displayNotification', notification('error', error.message), { root: true })
            } finally {
                this.$store.dispatch('toggleLoadingOverlay', {}, { root: true })
            }
        } else {
            this.$store.dispatch('notify/displayNotification', notification('error', 'login_error_notloggedin'), { root: true })
        }
    }

    private validations () {
        return {
            userName: { required, printableAsciiOnly },
            userEmail: { required, email },
            userFirstName: { required, printableAsciiOnly },
            userLastName: { required, printableAsciiOnly }
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
