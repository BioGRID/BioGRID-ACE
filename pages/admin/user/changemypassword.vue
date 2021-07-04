<template>
    <div id="user-editor">
        <v-container fluid>
            <h1>
                Change Your Password
                <v-icon color="warning" large>
                    mdi-lock-reset
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Fill in the following form to change your password. You will be logged out when completed successfully.
            </div>
            <v-card
                class="mt-2 pa-3"
                color="grey darken-3"
            >
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model.trim="newPassword"
                            label="New Password"
                            :error-messages="newPasswordErrors"
                            dark
                            required
                            class="mt-5"
                            type="password"
                            dense
                            @input="$v.newPassword.$touch()"
                            @blur="$v.newPassword.$touch()"
                        />
                        <v-text-field
                            v-model.trim="newPasswordRepeat"
                            label="Repeat New Password"
                            :error-messages="newPasswordRepeatErrors"
                            dark
                            required
                            class="mt-5"
                            type="password"
                            dense
                            @input="$v.newPasswordRepeat.$touch()"
                            @blur="$v.newPasswordRepeat.$touch()"
                        />
                        <v-btn
                            size="x-large"
                            color="success"
                            :disabled="isInvalid"
                            dark
                            class="mt-5"
                            @click="submitUser"
                        >
                            Change Password
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <div
                v-if="changeError"
                type="error"
                dense
                class="mt-2 red--text caption"
            >
                {{ changeError }}
            </div>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { passwordComplexity } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import notification from '@/utilities/notifications'

const users = namespace('users')

@Component
export default class ChangeMyPassword extends Vue {
    @users.State private user!: any;
    @users.State private minPasswordLength!: number;
    private newPassword: string = '';
    private newPasswordRepeat: string = '';
    private changeError: string = '';

    get newPasswordErrors () {
        const errors = []
        if (this.$v.newPassword.$dirty) {
            if (!this.$v.newPassword.required) {
                errors.push(generateValidationError('required', 'New Password', null))
            } else if (!this.$v.newPassword.minLength) {
                errors.push(generateValidationError('minlength', 'New Password', this.minPasswordLength.toString()))
            } else if (!this.$v.newPassword.passwordComplexity) {
                errors.push(generateValidationError('passwordcomplexity', 'New Password', null))
            }
        }
        return errors
    }

    get newPasswordRepeatErrors () {
        const errors = []
        if (this.$v.newPasswordRepeat.$dirty) {
            if (!this.$v.newPasswordRepeat.required) {
                errors.push(generateValidationError('required', 'New Password Repeat', null))
            } else if (!this.$v.newPasswordRepeat.sameAs) {
                errors.push(generateValidationError('sameas', 'New Password Repeat', 'New Password'))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitUser () {
        this.changeError = ''
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.changePassword()
        }
    }

    private async changePassword () {
        if (this.$auth.loggedIn) {
            try {
                await this.$store.dispatch('users/update_user', {
                    id: this.user.id,
                    name: this.user.name,
                    password: this.newPassword,
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    email: this.user.email,
                    class: this.user.class,
                    status: this.user.status,
                    password_reset: 0
                })
                this.$router.push('/login')
            } catch (error) {
                this.$store.dispatch('notify/displayNotification', notification('error', error.message), { root: true })
            }
        }
    }

    private validations () {
        return {
            newPassword: { required, minLength: minLength(this.minPasswordLength), passwordComplexity },
            newPasswordRepeat: { required, sameAs: sameAs('newPassword') }
        }
    }

    get middleware () {
        return 'auth_observer'
    }
}

</script>

<style lang="scss" scoped>
</style>
