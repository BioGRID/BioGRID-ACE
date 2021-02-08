<template>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex class="text-center">
                <v-card outlined width="800" height="320" class="mx-auto" raised>
                    <v-container class="pa-0">
                        <v-row no-gutters>
                            <v-col sm="6" class="pr-0 pt-0 pb-0">
                                <v-card flat class="mx-auto ml-0">
                                    <v-img
                                        height="319px"
                                        class="pa-0"
                                        src="images/login_highlight.jpg"
                                    />
                                </v-card>
                            </v-col>
                            <v-col sm="6">
                                <v-card flat class="text-left ml-3 mt-3 mr-3" style="height: 295px">
                                    <v-row>
                                        <v-col sm="12">
                                            <v-img
                                                src="images/biogridace_logo_large_light.png"
                                                width="200px"
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
                                                    required
                                                    class="login-field"
                                                    @input="$v.password.$touch()"
                                                    @blur="$v.password.$touch()"
                                                    @keyup.enter="login"
                                                />
                                                <v-btn
                                                    size="x-large"
                                                    color="primary"
                                                    class="mt-4"
                                                    :disabled="isInvalid"
                                                    @click="login"
                                                >
                                                    Login
                                                </v-btn>
                                            </v-form>
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
import { Component, Vue } from 'vue-property-decorator'
// import { namespace } from 'vuex-class'
import { required, email } from 'vuelidate/lib/validators'

// const auth = namespace('auth')

@Component
export default class Login extends Vue {
    private shortTitle: string = process.env.NUXT_ENV_APP_TITLE_SHORT || 'BioGRID ACE';
    private email: string = process.env.NUXT_ENV_LOGIN_DEFAULT || '';
    private password: string = process.env.NUXT_ENV_PASSWORD_DEFAULT || '';
    // @auth.State private user!: any;

    private layout () {
        return 'fullpage'
    }

    /* public created () {
        if (this.user !== undefined) {
            this.$store.dispatch('auth/logout', {
                user: this.user,
                vm: this
            })
        }
    } */

    get emailErrors () {
        const errors = []
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
        const errors = []
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

    private login () {
        return true
    }
    /* private login () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.$store.dispatch('auth/login', {
                userDetails: {
                    name: this.name,
                    password: this.password
                },
                vm: this
            })
        }
    } */

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
