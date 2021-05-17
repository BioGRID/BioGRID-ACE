<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex class="text-center">
                <v-card outlined width="800" height="350" class="mx-auto" raised>
                    <v-container>
                        <v-row>
                            <v-col sm="6" class="pa-0">
                                <v-card flat class="mx-auto ml-0">
                                    <v-img
                                        height="349px"
                                        class="pa-5"
                                        :src="require('~/assets/images/login_highlight.jpg')"
                                    />
                                </v-card>
                            </v-col>
                            <v-col sm="6">
                                <v-card flat class="text-left">
                                    <v-row>
                                        <v-col sm="12">
                                            <v-img
                                                :src="require('~/assets/images/biogridace_logo_large_light.png')"
                                                width="180px"
                                                contain
                                            />
                                            <p class="subtitle-2 mt-1">
                                                Welcome Back, please login to proceed...
                                            </p>
                                            <v-form>
                                                <v-text-field
                                                    v-model.trim="email"
                                                    label="Email"
                                                    :error-messages="emailErrors"
                                                    prepend-inner-icon="mdi-clipboard-account"
                                                    class="login-field"
                                                    name="email"
                                                    required
                                                    @input="$v.email.$touch()"
                                                    @blur="$v.email.$touch()"
                                                    @keyup.enter="login"
                                                />
                                                <v-text-field
                                                    v-model.trim="password"
                                                    label="Password"
                                                    :error-messages="passwordErrors"
                                                    type="password"
                                                    prepend-inner-icon="mdi-lock-question"
                                                    class="login-field mt-4"
                                                    name="password"
                                                    required
                                                    @input="$v.password.$touch()"
                                                    @blur="$v.password.$touch()"
                                                    @keyup.enter="login"
                                                />
                                                <v-btn
                                                    size="x-large"
                                                    color="primary"
                                                    class="mt-3"
                                                    name="submit"
                                                    :disabled="isInvalid"
                                                    @click="login"
                                                >
                                                    Login
                                                </v-btn>
                                            </v-form>
                                            <div
                                                v-if="loginError"
                                                type="error"
                                                dense
                                                class="mt-2 red--text caption"
                                            >
                                                {{ loginError }}
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { required, email } from 'vuelidate/lib/validators'

const users = namespace('users')

@Component
export default class Login extends Vue {
    private shortTitle: string = this.$config.shortTitle;
    private email: string = this.$config.loginDefault;
    private password: string = this.$config.passwordDefault;
    private loginError: string = '';
    @users.State private user!: any;

    get layout () {
        return 'fullpage'
    }

    public created () {
        if (this.user !== null) {
            this.logout()
        }
    }

    get emailErrors () {
        const errors: string[] = []
        if (this.$v.email.$dirty) {
            if (!this.$v.email.required) {
                errors.push('Email is required.')
            } else if (!this.$v.email.email) {
                errors.push('Must be a valid email address')
            }
        }
        return errors
    }

    get passwordErrors () {
        const errors: string[] = []
        if (this.$v.password.$dirty) {
            if (!this.$v.password.required) {
                errors.push('Password is required.')
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private async login () {
        this.$v.$touch()
        this.loginError = ''
        if (!this.isInvalid) {
            try {
                await this.$store.dispatch('users/login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/')
            } catch (error) {
                this.loginError = error
            }
        }
    }

    private async logout () {
        try {
            await this.$store.dispatch('users/logout')
        } catch (e) {
            console.log(e)
        }
    }

    private validations () {
        return {
            email: { required, email },
            password: { required }
        }
    }
}

</script>

<style lang="scss" scoped>

</style>
