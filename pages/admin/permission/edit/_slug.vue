<template>
    <div id="permission-manager">
        <v-container fluid class="pt-0">
            <v-btn
                class="float-right mt-4"
                small
                color="primary"
                nuxt
                to="/admin/permission"
                dark
            >
                Back
            </v-btn>
            <h1>
                Permission Update
                <v-icon color="deep-purple lighten-1" large class="">
                    mdi-badge-account
                </v-icon>
            </h1>
            <div class="subtitle-1">
                Use the following form to edit an existing permission used by this application. Fill in the fields, and click the 'Update Permission' button.
            </div>
            <v-card
                class="mt-2 pa-0"
                color="grey darken-3"
            >
                <v-card-text>
                    <v-alert type="warning" dense class="mb-10">
                        Changing <strong>Permission Name</strong> on an existing permission is not recommended. Many external applications have features built around existing permission names, so changing the name can have unintended consequences. Only modify the name if you are confident these problems do not exist (example to fix a typo shortly after creating a new permission).
                    </v-alert>
                    <v-form>
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
                                    v-model.trim="permName"
                                    label="Permission Name"
                                    :error-messages="permNameErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.permName.$touch()"
                                    @blur="$v.permName.$touch()"
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
                                    v-model.trim="permDescription"
                                    label="Permission Description"
                                    :error-messages="permDescriptionErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.permDescription.$touch()"
                                    @blur="$v.permDescription.$touch()"
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
                                    v-model.trim="permCategory"
                                    label="Permission Category"
                                    :error-messages="permCategoryErrors"
                                    dark
                                    required
                                    dense
                                    @input="$v.permCategory.$touch()"
                                    @blur="$v.permCategory.$touch()"
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
                                    v-model.trim="permLevel"
                                    label="Permission Level"
                                    :items="permLevels"
                                    dark
                                    required
                                    dense
                                />
                            </v-col>
                        </v-row>
                        <v-btn
                            size="x-large"
                            color="success"
                            dark
                            :disabled="isInvalid"
                            @click="submitPermission"
                        >
                            Update Permission
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, namespace } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { printableAsciiOnly, lettersAndSpacesOnly } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import notification from '@/utilities/notifications'

const users = namespace('users')

@Component
export default class PermissionEdit extends Vue {
    @users.State private permissions!: any
    private permID: number = 0
    private permName: string = ''
    private permDescription: string = ''
    private permCategory: string = ''
    private permLevel: string = 'observer'
    private permLevels: object[] = [
        { text: 'Observer', value: 'observer' },
        { text: 'Standard', value: 'standard' },
        { text: 'Manager', value: 'manager' },
        { text: 'Power User', value: 'poweruser' },
        { text: 'Admin', value: 'admin' }
    ];

    public asyncData (context: any) {
        const slug = context.route.params.slug
        if (context.store.state.users.permissions[slug] === undefined) {
            return context.redirect('/error/notfound')
        }
        return { permName: String(slug) }
    }

    public created () {
        // this.permName = this.$route.params.name
        this.initializeFieldValues()
    }

    @Watch('permName')
    private onPermNameChanged () {
        this.permName = this.permName.toUpperCase()
    }

    @Watch('permCategory')
    private onPermCategoryChanged () {
        this.permCategory = this.permCategory.toUpperCase()
    }

    private initializeFieldValues () {
        const permInfo = this.permissions[this.permName]
        this.permID = permInfo.id
        this.permName = permInfo.name
        this.permDescription = permInfo.description
        this.permCategory = permInfo.category
        this.permLevel = permInfo.level
    }

    get permNameErrors () {
        const errors = []
        if (this.$v.permName.$dirty) {
            if (!this.$v.permName.required) {
                errors.push(generateValidationError('required', 'Permission name', null))
            } else if (!this.$v.permName.lettersAndSpacesOnly) {
                errors.push(generateValidationError('lettersAndSpacesOnly', 'Permission name', null))
            }
        }
        return errors
    }

    get permDescriptionErrors () {
        const errors = []
        if (this.$v.permDescription.$dirty) {
            if (!this.$v.permDescription.printableAsciiOnly) {
                errors.push(generateValidationError('printableAsciiOnly', 'Permission description', null))
            }
        }
        return errors
    }

    get permCategoryErrors () {
        const errors = []
        if (this.$v.permCategory.$dirty) {
            if (!this.$v.permCategory.required) {
                errors.push(generateValidationError('required', 'Permission category', null))
            } else if (!this.$v.permCategory.lettersAndSpacesOnly) {
                errors.push(generateValidationError('lettersAndSpacesOnly', 'Permission category', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitPermission () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.updatePermission({
                name: this.permName,
                description: this.permDescription,
                category: this.permCategory,
                level: this.permLevel
            })
        }
    }

    private async updatePermission (payload: object) {
        if (this.$auth.loggedIn) {
            this.$store.dispatch('toggleLoadingOverlay', {}, { root: true })
            try {
                const status = await this.$authapi.PERMISSION_UPDATE(this.$store.getters['users/getToken'], payload, this.permID)
                if (status) {
                    Vue.prototype.$socket.sendObj({
                        target: 0,
                        namespace: 'users',
                        mutation: '',
                        action: 'fetch_permissions',
                        value: ''
                    })
                }
                this.$store.dispatch('notify/displayNotification', notification('success', 'permission_update_success'), { root: true })
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
            permName: { required, lettersAndSpacesOnly },
            permDescription: { printableAsciiOnly },
            permCategory: { required, lettersAndSpacesOnly }
        }
    }
}

</script>
