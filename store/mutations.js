const mutations = {
    /* TOGGLE_LOADING_OVERLAY: (state) => {
        state.loadingOverlayVisible = !state.loadingOverlayVisible
    }, */
    DISABLE_LOADING_OVERLAY: (state) => {
        state.loadingOverlayVisible = false
    },
    ENABLE_LOADING_OVERLAY: (state) => {
        state.loadingOverlayVisible = true
    },
    ADD_MESSAGE: (state, message) => {
        state.messageList.push(message)
    },
    SOCKET_ONOPEN: (state, event) => {
        state.socket.isConnected = true
        console.info(state, event)
    },
    SOCKET_ONCLOSE: (state, event) => {
        state.socket.isConnected = false
        console.info(state, event)
    },
    SOCKET_ONERROR: (state, event) => {
        console.info('SOCKET_ERROR')
        console.error(state, event)
    },
    SOCKET_RECONNECT: (state, event) => {
        console.info(state, event)
    },
    SOCKET_RECONNECT_ERROR: (state, event) => {
        state.socket.reconnectError = true
        console.info(state, event)
    },
    SOCKET_ONMESSAGE: (state, message) => {
        console.info('SOCKET_MESSAGE_UNHANDLED')
        console.info(state, message)
    },
    UPDATE_ECHO_MESSAGE: (state, message) => {
        state.socket.lastEchoMessage = message
    }
}

export default mutations
