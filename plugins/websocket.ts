import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

export default (ctx: any) => {
    Vue.use(VueNativeSock, ctx.$config.websocketURL, {
        connectManually: true,
        format: 'json',
        store: ctx.store,
        reconnection: false,
        reconnectionDelay: 5000
    })
}
