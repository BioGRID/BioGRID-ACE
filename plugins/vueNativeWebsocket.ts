import Vue from 'vue'
import store from '@/store/store'
import VueNativeSock from 'vue-native-websocket'

export const socketOptions = {
    connectManually: true,
    format: 'json',
    store,
    reconnection: true,
    reconnectionDelay: 3000
}

Vue.use(VueNativeSock, process.env.VUE_APP_ACE_WEBSOCKET, socketOptions)
