<template>
    <div id="user-editor">
        <v-container fluid class="pt-3">
            <v-btn
                class="float-right mt-4"
                nuxt
                small
                color="primary"
                to="/admin/user"
                dark
            >
                Back
            </v-btn>
            <h1>
                Change User Password
                <v-icon color="warning" large>
                    mdi-lock-reset
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Use the following form to change a user's password. You will need to remember the pasword entered, in order to give it to the user being modified, or they will be unable to login.
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
                                    label="Select a User"
                                    :items="userOptions"
                                    dark
                                    required
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userPassword"
                                    label="Password"
                                    :error-messages="userPasswordErrors"
                                    dark
                                    required
                                    type="password"
                                    dense
                                    @input="$v.userPassword.$touch()"
                                    @blur="$v.userPassword.$touch()"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                xl="12"
                                lg="12"
                                md="12"
                                sm="12"
                                xs="12"
                            >
                                <v-text-field
                                    v-model.trim="userPasswordRepeat"
                                    label="Password Repeat"
                                    :error-messages="userPasswordRepeatErrors"
                                    dark
                                    required
                                    type="password"
                                    dense
                                    @input="$v.userPasswordRepeat.$touch()"
                                    @blur="$v.userPasswordRepeat.$touch()"
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
                            Change Password
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { namespace } from 'vuex-class'
import { passwordComplexity } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'

const users = namespace('users')

@Component
export default class UserPassword extends Vue {
    @users.State private user!: any
    @users.State private users!: any
    @users.State private permissionLevels!: any
    @users.State private minPasswordLength!: number
    private userID: number = 0;
    private userPassword: string = ''
    private userPasswordRepeat: string = ''
    private userPermissionLevel: number = 0

    public created () {
        this.userPermissionLevel = this.$permissions.convertPermissionLevelToInteger(this.user.class)
    }

    public asyncData (context: any) {
        const slug = context.route.params.slug
        if (context.store.state.users.users[slug] === undefined) {
            return context.redirect('/error/notfound')
        }
        return { userID: Number(slug) }
    }

    get userPasswordErrors () {
        const errors = []
        if (this.$v.userPassword.$dirty) {
            if (!this.$v.userPassword.required) {
                errors.push(generateValidationError('required', 'Password', null))
            } else if (!this.$v.userPassword.minLength) {
                errors.push(generateValidationError('minlength', 'Password', this.minPasswordLength.toString()))
            } else if (!this.$v.userPassword.passwordComplexity) {
                errors.push(generateValidationError('passwordcomplexity', 'Password', null))
            }
        }
        return errors
    }

    get userPasswordRepeatErrors () {
        const errors = []
        if (this.$v.userPasswordRepeat.$dirty) {
            if (!this.$v.userPasswordRepeat.required) {
                errors.push(generateValidationError('required', 'Password Repeat', null))
            } else if (!this.$v.userPasswordRepeat.sameAs) {
                errors.push(generateValidationError('sameas', 'Password Repeat', 'Password'))
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
            const userInfo = this.users[this.userID]
            this.changePassword({
                id: this.userID,
                name: userInfo.name,
                password: this.userPassword,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                class: userInfo.class,
                status: userInfo.status,
                password_reset: 0
            })
        }
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

    get permissionLevelOptions () {
        return Object.values(this.permissionLevels).filter((item: any) => {
            const classLevel = this.$permissions.convertPermissionLevelToInteger(item.value)
            if (this.userPermissionLevel >= classLevel) {
                return true
            }
            return false
        })
    }

    private async changePassword (payload: object) {
        const status = await this.$authapi.USER_UPDATE(this.$store.getters['users/getToken'], payload, this.userID)
        if (status) {
            /* Vue.prototype.$socket.sendObj({
                target: 0,
                namespace: 'auth',
                mutation: '',
                action: 'fetch_users',
            })
            Vue.prototype.$socket.sendObj({
                target: this.userID,
                namespace: 'auth',
                mutation: '',
                action: 'force_logout',
            }) */
        }
    }

    private validations () {
        return {
            userPassword: { required, minLength: minLength(this.minPasswordLength), passwordComplexity },
            userPasswordRepeat: { required, sameAs: sameAs('userPassword') }
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
