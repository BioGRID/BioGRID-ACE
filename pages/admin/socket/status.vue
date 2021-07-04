<template>
    <div id="permission-manager">
        <v-container fluid class="pt-0">
            <v-btn
                class="float-right mt-4"
                small
                color="primary"
                to="/admin"
                dark
            >
                Back
            </v-btn>
            <h1>Socket Status</h1>
            <div class="subtitle-1">
                This tool presents a couple of handy tools for checking on the status of the main application websocket.
            </div>
            <v-alert class="mt-5" :type="socketStatus">
                {{ socketMessage }}
            </v-alert>
            <v-sheet class="pa-3">
                <h4>Test Socket with Echo</h4>
                <div class="subtitle-2">
                    Type some text into the field below and hit submit. We'll send that message to the server, and it should echo the same message right back to us, if things are working correctly.
                </div>
                <v-text-field
                    v-model.trim="echoMessage"
                    label="Echo Message"
                    class="mt-5"
                    :error-messages="echoMessageErrors"
                    light
                    required
                    dense
                    @input="$v.echoMessage.$touch()"
                    @blur="$v.echoMessage.$touch()"
                />
                <v-btn
                    size="x-large"
                    color="success"
                    class="mt-5"
                    :disabled="isInvalid"
                    @click="submitEchoMessage"
                >
                    Submit Echo
                </v-btn>
            </v-sheet>
            <v-alert class="mt-5" type="info">
                <strong>SERVER ECHO REPLY</strong>: {{ socket.lastEchoMessage }}
            </v-alert>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { lettersAndSpacesOnly } from '@/utilities/validators'
import { generateValidationError } from '@/utilities/validationerrors'
import { State, namespace } from 'vuex-class'

const users = namespace('users')

@Component
export default class SocketStatus extends Vue {
    @State private socket!: any
    @users.State private user!: any
    private echoMessage: string = ''

    get socketStatus () {
        if (this.socket.isConnected) {
            return 'success'
        } else {
            return 'error'
        }
    }

    get socketMessage () {
        if (this.socket.isConnected) {
            return 'Socket is Connected'
        } else if (this.socket.reconnectError) {
            return 'Socket is not connected. There is a reconnect error!'
        } else {
            return 'Socket is not Connected'
        }
    }

    get echoMessageErrors () {
        const errors = []
        if (this.$v.echoMessage.$dirty) {
            if (!this.$v.echoMessage.required) {
                errors.push(generateValidationError('required', 'Echo message', null))
            } else if (!this.$v.echoMessage.lettersAndSpacesOnly) {
                errors.push(generateValidationError('lettersAndSpacesOnly', 'Echo message', null))
            }
        }
        return errors
    }

    get isInvalid () {
        return this.$v.$invalid
    }

    private submitEchoMessage () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
            Vue.prototype.$socket.sendObj({
                target: this.user.id,
                namespace: '',
                mutation: '',
                action: 'echoMessage',
                value: this.echoMessage
            })
        }
    }

    private validations () {
        return {
            echoMessage: { required, lettersAndSpacesOnly }
        }
    }
}

</script>
