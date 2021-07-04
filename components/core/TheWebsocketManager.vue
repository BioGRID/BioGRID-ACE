<template>
    <v-btn
        icon
        app
        dark
        :title="websocketIconStatus"
    >
        <v-icon
            :color="websocketIconColor"
        >
            {{ websocketIcon }}
        </v-icon>
    </v-btn>
</template>

<script lang="ts">
import { Component, Vue, State, namespace } from 'nuxt-property-decorator'

const users = namespace('users')

@Component
export default class TheWebsocketManager extends Vue {
    @State private socket!: any
    @users.State private user!: any
    private checkInterval: any = null
    private checkFrequency: number = 60000

    public mounted () {
        if (this.checkInterval === null) {
            this.checkSocket()
            // Start a loop that periodically checks that that socket is still connected
            this.checkInterval = setInterval(this.checkSocket, this.checkFrequency)
        }
    }

    public checkSocket () {
        console.info('checking interval')
        if (this.$auth.loggedIn && !this.socket.isConnected) {
            console.info('connecting to socket')
            Vue.prototype.$connect(this.$config.websocketURL + '?access_token=' + this.$store.getters['users/getToken'].replace('Bearer ', '') + '&id=' + this.user.id)
        } else {
            console.info('already connected to socket')
        }
    }

    get websocketIcon () {
        if (this.socket.isConnected) {
            return 'mdi-circle-slice-8'
        } else {
            return 'mdi-circle-double'
        }
    }

    get websocketIconColor () {
        if (this.socket.isConnected) {
            return 'green'
        } else {
            return 'red'
        }
    }

    get websocketIconStatus () {
        if (this.socket.isConnected) {
            return 'Websocket connection enabled'
        } else {
            return 'Websocket connection disabled'
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
